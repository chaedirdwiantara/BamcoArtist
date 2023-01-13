import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  Gap,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {ProfileHeader} from './ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import {DataDetailMusician} from '../../interface/musician.interface';
import PostListPublic from '../ListCard/PostListPublic';
import {dropDownDataCategory, dropDownDataSort} from '../../data/dropdown';
import PostListExclusive from '../ListCard/PostListExclusive';
import DataMusician from './DataMusician';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface MusicianDetailProps {
  profile: DataDetailMusician;
  uuid: string;
}

export const MusicianDetail: React.FC<MusicianDetailProps> = ({
  profile,
  uuid,
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
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            containerStyles={{paddingHorizontal: widthResponsive(18)}}
            onPress={() => {}}
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
              <DataMusician profile={profile} />
            ) : filter[selectedIndex].filterName === 'POST' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(24),
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
                  paddingHorizontal: widthResponsive(24),
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
    marginTop: heightResponsive(-20),
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
