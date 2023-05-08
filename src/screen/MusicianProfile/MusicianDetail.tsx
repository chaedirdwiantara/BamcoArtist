import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  EmptyState,
  Gap,
  SsuStatusBar,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {ProfileHeader} from './ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color, font} from '../../theme';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import {
  AlbumData,
  DataDetailMusician,
} from '../../interface/musician.interface';
import {dropDownDataCategory, dropDownDataSort} from '../../data/dropdown';
import DataMusician from './DataMusician';
import {Playlist} from '../../interface/playlist.interface';
import ListPlaylist from '../ListCard/ListPlaylist';
import ImageModal from '../Detail/ImageModal';
import {useTranslation} from 'react-i18next';
import {DataExclusiveResponse} from '../../interface/setting.interface';
import PostListProfile from '../ListCard/PostListProfile';
import MainTab from '../../components/molecule/ProfileContent/MainTab/MainTab';
import {ArrowLeftIcon} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface MusicianDetailProps {
  profile: DataDetailMusician;
  uuid: string;
  dataAlbum: AlbumData[];
  dataPlaylist: Playlist[];
  followOnPress: () => void;
  unfollowOnPress: () => void;
  donateOnPress: () => void;
  followersCount: number;
  goToPlaylist: (id: number) => void;
  exclusiveContent?: DataExclusiveResponse;
}

export const MusicianDetail: React.FC<MusicianDetailProps> = ({
  profile,
  uuid,
  dataAlbum,
  dataPlaylist,
  followOnPress,
  unfollowOnPress,
  donateOnPress,
  followersCount,
  goToPlaylist,
  exclusiveContent,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Musician.Tab.Main'},
    {filterName: 'Musician.Tab.Musician'},
    {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Fans'},
    {filterName: 'Musician.Tab.Profile'},
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const goToFollowers = () => {
    navigation.navigate('Followers', {uuid});
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const leftIconHeader = () => {
    return (
      <View style={styles.containerLeftIcon}>
        <TouchableOpacity onPress={onPressGoBack}>
          <ArrowLeftIcon
            stroke={color.Neutral[10]}
            style={{marginLeft: widthPercentage(24)}}
          />
        </TouchableOpacity>
        <Gap width={widthPercentage(20)} />
        <Text style={styles.name}>{profile.fullname}</Text>
      </View>
    );
  };

  const musicianProfile = {
    fullname: profile.fullname,
    username: '@' + profile.username,
    bio: profile.bio || '',
    backgroundUri:
      profile?.banners.length !== 0 ? profile.banners[3]?.image : '',
    avatarUri:
      profile?.imageProfileUrls.length !== 0
        ? profile?.imageProfileUrls[1]?.image
        : '',
    totalFollowers: profile.followers,
    totalFans: profile.fans,
    totalRelease: profile.countAlbumReleased,
    totalPlaylist: profile.countPlaylist,
    rank: profile.rank,
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        title=""
        leftIcon={scrolEffect && leftIconHeader()}
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
          avatarUri={
            profile.imageProfileUrls.length !== 0
              ? profile.imageProfileUrls[1].image
              : ''
          }
          backgroundUri={
            profile.banners.length !== 0 ? profile.banners[1].image : ''
          }
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          isFollowed={profile.isFollowed}
          followOnPress={followOnPress}
          unfollowOnPress={unfollowOnPress}
          donateOnPress={donateOnPress}
          onPressImage={showImage}
        />
        <View style={styles.infoCard}>
          <UserInfoCard
            onPress={goToFollowers}
            profile={musicianProfile}
            followersCount={followersCount}
          />
          {exclusiveContent && <ExclusiveDailyContent {...exclusiveContent} />}

          <Gap height={10} />
          <View style={styles.containerContent}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{paddingHorizontal: widthResponsive(24)}}
              translation={true}
            />
            {filter[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
              <DataMusician profile={profile} dataAlbum={dataAlbum} />
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Musician' ? (
              <View
                style={{
                  paddingHorizontal: widthResponsive(24),
                  width: '100%',
                }}>
                <PostListProfile
                  uuidMusician={uuid}
                  dataRightDropdown={dropDownDataCategory}
                  dataLeftDropdown={dropDownDataSort}
                  {...exclusiveContent}
                />
              </View>
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Music' ? (
              dataPlaylist.length > 0 ? (
                <View style={{paddingHorizontal: widthResponsive(30)}}>
                  <ListPlaylist
                    data={dataPlaylist}
                    onPress={goToPlaylist}
                    scrollable={false}
                  />
                </View>
              ) : (
                <EmptyState
                  text={t('Profile.Label.NoPlaylist') || ''}
                  containerStyle={{
                    alignSelf: 'center',
                    marginTop: heightPercentage(30),
                  }}
                />
              )
            ) : filter[selectedIndex].filterName === 'Musician.Tab.Main' ? (
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <MainTab uuid={uuid} />
              </View>
            ) : null}
          </View>
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
    paddingBottom: heightPercentage(15),
  },
  containerLeftIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(16),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
    paddingLeft: widthPercentage(10),
  },
});
