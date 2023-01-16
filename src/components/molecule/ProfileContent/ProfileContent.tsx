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
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {Playlist} from '../../../interface/playlist.interface';
import DataMusician from '../../../screen/MusicianProfile/DataMusician';
import PostListPublic from '../../../screen/ListCard/PostListPublic';
import {dropDownDataCategory, dropDownDataSort} from '../../../data/dropdown';
import PostListExclusive from '../../../screen/ListCard/PostListExclusive';

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
  uuid: string;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
  uuid,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
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
        />
        <UserInfoCard
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
          {filter[selectedIndex].filterName === 'PROFILE' ? (
            <View
              style={{
                marginHorizontal: widthResponsive(-24),
                width: '100%',
              }}>
              <DataMusician profile={profile} />
            </View>
          ) : filter[selectedIndex].filterName === 'POST' ? (
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
          ) : filter[selectedIndex].filterName === 'EXCLUSIVE' ? (
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
          ) : null}
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
    paddingHorizontal: widthResponsive(24),
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
