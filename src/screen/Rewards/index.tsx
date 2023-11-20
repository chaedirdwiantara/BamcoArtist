import {
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {color} from '../../theme';
import {heightResponsive, widthResponsive} from '../../utils';
import {ProfileHeader, TabFilter, TopNavigation} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useTranslation} from 'react-i18next';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import TabOneReward from './tabOne';
import TabTwoRewards from './tabTwo';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const {dataProfile, dataCountProfile, getProfileUser, getTotalCountProfile} =
    useProfileHook();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, []),
  );

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const tabFilterOnPress = (params: string, index: number) => {
    setSelectedIndex(index);
  };

  const banners =
    dataProfile?.data !== undefined && dataProfile?.data.banners?.length > 0
      ? dataProfile?.data.banners[2].image
      : '';

  const avatar =
    dataProfile?.data !== undefined &&
    dataProfile?.data.imageProfileUrls?.length > 0
      ? dataProfile?.data.imageProfileUrls[2].image
      : '';

  const profile = {
    ...dataProfile?.data,
    fullname: dataProfile?.data.fullname,
    username: dataProfile?.data.username,
    bio: dataProfile?.data.bio || t('Profile.Label.Description'),
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
    totalFollowers: dataProfile?.data.followers,
    totalFans: dataProfile?.data.fans,
    totalRelease: dataCountProfile?.countAlbumReleased,
    totalPlaylist: dataCountProfile?.countPlaylist,
    rank: dataProfile?.data.rank || 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopNavigation.Type2Animated
          title={t('Rewards.Title')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          containerStyle={{
            position: 'absolute',
            paddingTop:
              Platform.OS === 'ios' ? 0 : heightResponsive(barHeight + 15),
            zIndex: 4,
            backgroundColor: color.Dark[800],
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}>
          {dataProfile?.data && (
            <ProfileHeader
              // type={!ownProfile ? 'user detail' : 'profile'}
              avatarUri={profile.avatarUri}
              backgroundUri={profile.backgroundUri}
              fullname={profile.fullname}
              username={profile.username}
              bio={profile.bio ?? ''}
              onPress={() => {}}
              iconPress={() => {}}
              scrollEffect={scrollEffect}
              noEdit={true}
              onPressImage={() => {}}
            />
          )}

          <View style={styles.filterContainer}>
            <TabFilter.Type1
              filterData={filter}
              onPress={tabFilterOnPress}
              selectedIndex={selectedIndex}
              translation={true}
              flatlistContainerStyle={{
                justifyContent: 'space-between',
              }}
              TouchableStyle={{width: widthPercentageToDP(45)}}
            />

            <View style={styles.containerContent}>
              {filter[selectedIndex].filterName === 'Rewards.Reward' ? (
                <View>
                  <TabOneReward />
                </View>
              ) : (
                <View>
                  <TabTwoRewards />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    zIndex: 2,
  },
  containerContent: {
    flex: 1,
    marginTop: widthResponsive(20),
    width: '100%',
  },
  filterContainer: {
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
});
