import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';

import {
  width,
  normalize,
  widthPercentage,
  heightPercentage,
  widthResponsive,
} from '../../../utils';
import {font} from '../../../theme';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {SettingIcon} from '../../../assets/icon';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {TopSongListData} from '../../../data/topSong';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {Playlist} from '../../../interface/playlist.interface';
import ListPlaylist from '../../../screen/ListCard/ListPlaylist';
import {
  AlbumData,
  DataDetailMusician,
} from '../../../interface/musician.interface';
import DataMusician from '../../../screen/MusicianProfile/DataMusician';
import PostListPublic from '../../../screen/ListCard/PostListPublic';
import PostListExclusive from '../../../screen/ListCard/PostListExclusive';
import {dropDownDataCategory, dropDownDataSort} from '../../../data/dropdown';
import {ProfileFansResponseType} from '../../../interface/profile.interface';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number) => void;
  dataPlaylist?: Playlist[];
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
  uuid?: string;
  dataAlbum?: AlbumData[];
  dataDetailMusician?: DataDetailMusician;
  selfProfile?: ProfileFansResponseType;
  ownProfile?: boolean;
  totalCountlikedSong?: number;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
  uuid,
  dataAlbum,
  dataDetailMusician,
  selfProfile,
  totalCountlikedSong,
  ownProfile = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'PLAYLIST'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'BADGE'},
  ]);

  const [filter2] = useState([
    {filterName: 'PROFILE'},
    {filterName: 'POST'},
    {filterName: 'EXCLUSIVE'},
    {filterName: 'MUSIC'},
    {filterName: 'FANS'},
  ]);

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  return (
    <View style={{flex: 1}}>
      {scrollEffect && (
        <View style={styles.containerStickyHeader}>
          <Text style={[styles.name, styles.topIos]}>{profile.fullname}</Text>
          <TouchableOpacity onPress={() => onPressGoTo('Setting')}>
            <SettingIcon style={styles.topIos} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <ProfileHeader
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
          scrollEffect={scrollEffect}
          noEdit={!ownProfile}
          backIcon={!ownProfile}
        />
        <UserInfoCard
          profile={profile}
          type={ownProfile ? '' : 'self'}
          containerStyles={styles.infoCard}
          totalFollowing={profile.totalFollowing}
          onPress={() => onPressGoTo('Following')}
          selfProfile={selfProfile?.data}
          totalCountlikedSong={totalCountlikedSong}
        />
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={ownProfile ? filter2 : filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {!ownProfile && filter[selectedIndex].filterName === 'PLAYLIST' ? (
            TopSongListData.length > 0 ? (
              <View>
                <ListPlaylist
                  data={dataPlaylist}
                  onPress={goToPlaylist}
                  scrollable={false}
                />
              </View>
            ) : (
              <CreateNewCard
                num="01"
                text="Default Playlist"
                onPress={() => onPressGoTo('CreateNewPlaylist')}
              />
            )
          ) : !ownProfile &&
            filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            // Dihold karena point belum fix

            // MusicianListData.length > 0 ? (
            //   <TopMusician
            //     scrollable={false}
            //     type={'profile'}
            //     dataMusician={[]}
            //   />
            // ) :
            <EmptyState
              text="You don't have contribution to any musician"
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : // Dihold karena badge belum fix

          // MusicianListData.length > 0 ? (
          //   <MenuText.LeftIconWithSubtitle
          //     text="No Room for Speed"
          //     subtitle="Be the first jam contributor on 100 artist"
          //     onPress={() => null}
          //     icon={<ProcessingIcon />}
          //   />
          // ) :
          null}
          {ownProfile &&
          dataDetailMusician &&
          dataAlbum &&
          filter2[selectedIndex].filterName === 'PROFILE' ? (
            <View style={{marginHorizontal: widthResponsive(-23)}}>
              <DataMusician
                profile={dataDetailMusician}
                dataAlbum={dataAlbum}
              />
            </View>
          ) : filter2[selectedIndex].filterName === 'POST' ? (
            <View
              style={{
                width: '100%',
              }}>
              <PostListPublic
                uuidMusician={uuid}
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
              />
            </View>
          ) : filter2[selectedIndex].filterName === 'EXCLUSIVE' ? (
            <View
              style={{
                width: '100%',
              }}>
              <PostListExclusive
                uuidMusician={uuid}
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
              />
            </View>
          ) : filter2[selectedIndex].filterName === 'MUSIC' ? (
            <View>
              {ownProfile && (
                <CreateNewCard
                  num="00"
                  text="Create New Playlist"
                  onPress={() => onPressGoTo('CreateNewPlaylist')}
                />
              )}
              <ListPlaylist
                data={dataPlaylist === null ? [] : dataPlaylist}
                onPress={goToPlaylist}
                scrollable={false}
              />
            </View>
          ) : (
            <EmptyState
              text="No data available"
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.Dark[50],
  },
  infoCard: {
    position: 'absolute',
    top: heightPercentage(310),
    left: widthPercentage(20),
  },
  containerContent: {
    flex: 1,
    marginTop: heightPercentage(70),
    paddingHorizontal: widthPercentage(20),
    marginBottom: heightPercentage(20),
    width: '100%',
  },
  flashlistStyle: {
    width: '100%',
    height: '100%',
  },
  containerStickyHeader: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(20),
    backgroundColor: Color.Dark[800],
    height: heightPercentage(85),
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: normalize(16),
    lineHeight: heightPercentage(20),
    color: Color.Neutral[10],
  },
  topIos: {
    top: heightPercentage(15),
  },
});
