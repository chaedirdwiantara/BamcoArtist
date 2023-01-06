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

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number) => void;
  dataPlaylist: Playlist[];
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'PLAYLIST'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'BADGE'},
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
        />
        <UserInfoCard
          type="self"
          containerStyles={styles.infoCard}
          totalFollowing={profile.totalFollowing}
          onPress={() => onPressGoTo('Following')}
        />
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'PLAYLIST' ? (
            TopSongListData.length > 0 ? (
              <View>
                <CreateNewCard
                  num="00"
                  text="Create New Playlist"
                  onPress={() => onPressGoTo('CreateNewPlaylist')}
                />
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
          ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
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
          ) : (
            // Dihold karena badge belum fix

            // MusicianListData.length > 0 ? (
            //   <MenuText.LeftIconWithSubtitle
            //     text="No Room for Speed"
            //     subtitle="Be the first jam contributor on 100 artist"
            //     onPress={() => null}
            //     icon={<ProcessingIcon />}
            //   />
            // ) :
            <EmptyState
              text="You don't have any badge"
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
