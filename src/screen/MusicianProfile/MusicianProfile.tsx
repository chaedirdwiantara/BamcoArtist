import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  EmptyState,
  Gap,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {MusicianListData} from '../../data/topMusician';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {ProfileHeader} from './ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import ProfileComponent from './ProfileComponent';
import Album from './Album';
import Photo from './Photo';
import {DataDetailMusician} from '../../interface/musician.interface';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface ProfileContentProps {
  profile: DataDetailMusician;
  goToEditProfile?: () => void;
  goToPlaylist: () => void;
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'PROFILE'},
    {filterName: 'POST'},
    {filterName: 'EXCLUSIVE'},
    {filterName: 'MUSIC'},
    {filterName: 'FANS'},
  ]);

  const noDataText = 'No information given.';
  const noAlbumText = 'No Album Available.';
  const noMerch = 'No Merch Available';

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        title=""
        leftIconAction={navigation.goBack}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        bgColor={scrolEffect ? color.Dark[800] : 'transparent'}
        containerStyles={styles.topNavStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <ProfileHeader
          avatarUri={profile.imageProfileUrl}
          backgroundUri={profile.banner}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          isFollowed={profile.isFollowed}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            containerStyles={{paddingHorizontal: widthResponsive(18)}}
            onPress={() => onPressGoTo('Following')}
          />
          <ExclusiveDailyContent />
          <Gap height={10} />
          <View style={styles.containerContent}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{paddingHorizontal: widthResponsive(24)}}
            />
            {filter[selectedIndex].filterName === 'PROFILE' ? (
              <View style={{width: '100%'}}>
                <Gap height={24} />
                <ProfileComponent
                  title={'About'}
                  content={profile.about ? profile.about : noDataText}
                  gap={16}
                />
                <Gap height={24} />
                <ProfileComponent
                  title={'Social Media'}
                  gap={16}
                  socmedSection
                  socmed={profile.socialMedia}
                />
                <Gap height={24} />
                <ProfileComponent
                  title={'Origin'}
                  content={
                    profile.originCity && profile.originCountry
                      ? `${profile.originCity}, ${profile.originCountry}`
                      : noDataText
                  }
                />
                <Gap height={24} />
                <ProfileComponent
                  title={'Years Active'}
                  content={
                    profile.yearsActiveFrom && profile.yearsActiveTo
                      ? `${profile.yearsActiveFrom} - ${profile.yearsActiveTo}`
                      : noDataText
                  }
                />
                <Gap height={24} />
                <ProfileComponent
                  title={'Members'}
                  memberSection
                  members={profile.members}
                />
                <Gap height={24} />
                <ProfileComponent title={'Website'} content={profile.website} />
                <Gap height={24} />
                <Photo title={'Photos'} data={profile.photos} />
                <Gap height={24} />
                <Album
                  title={'Album'}
                  data={profile.albums}
                  errorText={noAlbumText}
                />
                <Gap height={24} />
                <Album
                  title={'Merch'}
                  data={profile.merchs}
                  errorText={noMerch}
                />
              </View>
            ) : filter[selectedIndex].filterName === 'POST' ? (
              MusicianListData.length > 0 ? (
                <View></View>
              ) : (
                <EmptyState text="This musician don't have any post" />
              )
            ) : MusicianListData.length > 0 ? (
              <View></View>
            ) : (
              <EmptyState text="This musician don't have any post" />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    width: '100%',
    marginTop: heightResponsive(-50),
    marginBottom: heightResponsive(24),
    alignItems: 'center',
  },
  containerContent: {
    width: '100%',
  },
  topNavStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    borderBottomWidth: 0,
    paddingBottom: heightPercentage(10),
  },
});
