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
import {useTranslation} from 'react-i18next';

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
import {
  AlbumData,
  DataDetailMusician,
} from '../../../interface/musician.interface';
import {SettingIcon} from '../../../assets/icon';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {Playlist} from '../../../interface/playlist.interface';
import ListPlaylist from '../../../screen/ListCard/ListPlaylist';
import PostListPublic from '../../../screen/ListCard/PostListPublic';
import DataMusician from '../../../screen/MusicianProfile/DataMusician';
import PostListExclusive from '../../../screen/ListCard/PostListExclusive';
import {ProfileFansResponseType} from '../../../interface/profile.interface';
import PostListMyPost from '../../../screen/ListCard/PostListMyPost';
import {dropDownDataCategory, dropDownDataSort} from '../../../data/dropdown';
import ImageModal from '../../../screen/Detail/ImageModal';
import ExclusiveDailyContent from '../../../screen/MusicianProfile/ExclusiveDailyContent';
import {Gap} from '../../atom';
import {DataExclusiveResponse} from '../../../interface/setting.interface';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number, name: string) => void;
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
  goToFollowers: () => void;
  exclusiveContent?: DataExclusiveResponse;
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
  goToFollowers,
  exclusiveContent,
}) => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Profile.Tab.Playlist'},
    {filterName: 'Profile.Tab.TopMusician'},
    {filterName: 'Profile.Tab.Badge'},
  ]);

  const [filter2] = useState([
    {filterName: 'Musician.Tab.Profile'},
    {filterName: 'Musician.Tab.Post'},
    {filterName: 'Musician.Tab.Exclusive'},
    {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Fans'},
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

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
          onPressImage={showImage}
        />
        <UserInfoCard
          profile={profile}
          type={ownProfile ? '' : 'self'}
          containerStyles={styles.infoCard}
          totalFollowing={profile.totalFollowing}
          onPress={goToFollowers}
          selfProfile={selfProfile?.data}
          totalCountlikedSong={totalCountlikedSong}
          followersCount={profile.totalFollowers}
        />
        {exclusiveContent ? (
          <>
            <Gap height={heightPercentage(50)} />
            <ExclusiveDailyContent {...exclusiveContent} edit={true} />
            <Gap height={heightPercentage(20)} />
          </>
        ) : (
          <Gap height={heightPercentage(70)} />
        )}

        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={ownProfile ? filter2 : filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
            translation={true}
          />
          {!ownProfile &&
          dataPlaylist !== null &&
          filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
            <View>
              <ListPlaylist
                data={dataPlaylist}
                onPress={goToPlaylist}
                scrollable={false}
              />
            </View>
          ) : !ownProfile &&
            filter[selectedIndex].filterName ===
              t('Profile.Tab.TopMusician') ? (
            <EmptyState
              text={t('Profile.Label.NoMusician') || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : null}
          {ownProfile &&
          dataDetailMusician &&
          dataAlbum &&
          filter2[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
            <View style={{marginHorizontal: widthResponsive(-23)}}>
              <DataMusician
                profile={dataDetailMusician}
                dataAlbum={dataAlbum}
              />
            </View>
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Post' ? (
            <View
              style={{
                width: '100%',
              }}>
              {ownProfile ? (
                <PostListMyPost
                  uuidMusician={uuid}
                  dataRightDropdown={dropDownDataCategory}
                  dataLeftDropdown={dropDownDataSort}
                />
              ) : (
                <PostListPublic
                  uuidMusician={uuid}
                  dataRightDropdown={dropDownDataCategory}
                  dataLeftDropdown={dropDownDataSort}
                />
              )}
            </View>
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Exclusive' ? (
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
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Music' ? (
            <View>
              {ownProfile && (
                <CreateNewCard
                  num="00"
                  text={t('Profile.Button.CreatePlaylist')}
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
              text={t('EmptyState.NoData') || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          )}
        </View>
      </ScrollView>

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={0}
        dataImage={zoomImage}
        type={'zoomProfile'}
      />
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
    // marginTop: heightPercentage(70),
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
