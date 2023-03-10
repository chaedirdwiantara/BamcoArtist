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
} from '../../utils';
import {font} from '../../theme';
import {
  TabFilter,
  ProfileHeader,
  EmptyState,
  UserInfoCard,
  CreateNewCard,
} from '../../components';
import Color from '../../theme/Color';
import {SettingIcon} from '../../assets/icon';
import {TopSongListData} from '../../data/topSong';
import {Playlist} from '../../interface/playlist.interface';
import ListPlaylist from '../../screen/ListCard/ListPlaylist';
import {
  AlbumData,
  DataDetailMusician,
} from '../../interface/musician.interface';
import {ProfileFansResponseType} from '../../interface/profile.interface';
import {useTranslation} from 'react-i18next';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type profile = {
  fullname: string;
  username: string;
  bio: string;
  backgroundUri: string;
  avatarUri: string;
  totalFollowing: number;
};

interface ProfileContentProps {
  profile: profile;
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
  playerVisible?: boolean;
  otherUserProfile?: boolean;
}

export const OtherUserProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
  selfProfile,
  totalCountlikedSong,
  ownProfile = false,
}) => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Profile.Tab.Playlist'},
    {filterName: 'Profile.Tab.TopMusician'},
    {filterName: 'Profile.Tab.Badge'},
  ]);

  const filterData = (item: string, index: number) => {
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
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
            translation={true}
          />
          {filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
            dataPlaylist !== undefined && dataPlaylist?.length > 0 ? (
              <View>
                <ListPlaylist
                  data={dataPlaylist === null ? [] : dataPlaylist}
                  onPress={goToPlaylist}
                  scrollable={false}
                />
              </View>
            ) : (
              <EmptyState
                text={t('Profile.Label.NoPlaylist') || ''}
                containerStyle={{marginTop: heightPercentage(30)}}
              />
            )
          ) : filter[selectedIndex].filterName === 'Profile.Tab.TopMusician' ? (
            <EmptyState
              text={t('Profile.Label.NoMusicianOther') || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : (
            <EmptyState
              text={t('Profile.Label.NoBadgeOther') || ''}
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
