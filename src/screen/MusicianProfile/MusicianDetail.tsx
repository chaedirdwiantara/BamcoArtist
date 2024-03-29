import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  EmptyState,
  Gap,
  ModalConfirm,
  PopUp,
  SsuStatusBar,
  SuccessToast,
  TabFilter,
  TopNavigation,
  UserInfoCard,
} from '../../components';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {ProfileHeader} from './ProfileHeader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color, font} from '../../theme';
import ExclusiveDailyContent from './ExclusiveDailyContent';
import {
  AlbumData,
  AppearsOnDataType,
  DataDetailMusician,
} from '../../interface/musician.interface';
import DataMusician from './DataMusician';
import {Playlist} from '../../interface/playlist.interface';
import ListPlaylist from '../ListCard/ListPlaylist';
import ImageModal from '../Detail/ImageModal';
import {useTranslation} from 'react-i18next';
import {DataExclusiveResponse} from '../../interface/setting.interface';
import PostListProfile from '../ListCard/PostListProfile';
import {FansScreen} from '../../components/molecule/ListFans';
import {storage} from '../../hooks/use-storage.hook';
import {mvs} from 'react-native-size-matters';
import {ArrowLeftIcon} from '../../assets/icon';
import {usePlayerStore} from '../../store/player.store';
import ListAlbum from './ListAlbum';
import MerchList from '../ListCard/MerchList';
import ConcertList from '../ListCard/ConcertList';
import EventMusician from '../../components/molecule/EventMusician';
import {useBlockHook} from '../../hooks/use-block.hook';
import BlockProfileUI from '../../components/molecule/BlockOnProfile';
import {
  DataDropDownType,
  dataProfileDropdown,
  dataProfileDropdownBlocked,
} from '../../data/dropdown';
import {useBadgeHook} from '../../hooks/use-badge.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
interface MusicianDetailProps {
  profile: DataDetailMusician;
  uuid: string;
  dataAlbum: AlbumData[];
  dataAppearsOn: AppearsOnDataType[];
  dataPlaylist: Playlist[];
  followOnPress: () => void;
  unfollowOnPress: () => void;
  donateOnPress: () => void;
  followersCount: number;
  goToPlaylist: (id: number) => void;
  exclusiveContent?: DataExclusiveResponse;
  subsEC?: boolean;
  refresh: boolean;
  setRefresh: () => void;
  setRefreshing?: () => void;
  isLoading?: boolean;
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
  subsEC,
  dataAppearsOn,
  refresh,
  setRefresh,
  setRefreshing,
  isLoading,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    blockLoading,
    blockError,
    blockResponse,
    unblockResponse,
    setBlockResponse,
    setUnblockResponse,
    setBlockUser,
    setUnblockUser,
  } = useBlockHook();

  // BADGE
  const {useCheckBadge} = useBadgeHook();
  // artist type = 2
  const {data: dataBadge} = useCheckBadge({
    userType: 2,
    point: profile.point?.pointLifetime,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    // {filterName: 'Musician.Tab.Main'}, TODO: Disable for NOW
    {filterName: 'Musician.Tab.Fans'},
    {filterName: 'Musician.Tab.Musician'},
    // {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Event'},
    {filterName: 'Musician.Tab.Profile'},
    {filterName: 'Musician.Tab.Merchandise'},
    {filterName: 'Musician.Tab.Ticket'},
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);
  const [showStatePopUp, setShowStatePopUp] = useState<boolean>();
  const [modalUnblock, setModalUnblock] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [toastUnblock, settoastUnblock] = useState<boolean>(false);
  const [toastBlock, setToastBlock] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [allowPagination, setAllowPagination] = useState<boolean>(true);

  const showPopUp: boolean | undefined = storage.getBoolean('showPopUp');

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useEffect(() => {
    if (showStatePopUp === false) {
      const currentValue = storage.getBoolean('showPopUp');
      if (currentValue !== false) {
        storage.set('showPopUp', false);
      }
    }
  }, [showStatePopUp]);

  useMemo(() => {
    setShowStatePopUp(currentState => {
      if (currentState !== showPopUp) {
        return showPopUp;
      }
      return currentState;
    });
  }, [showPopUp]);

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

    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (offsetY + height >= contentHeight && allowPagination) {
      setAllowPagination(false);
      setEndReached(true);
    }
  };

  useEffect(() => {
    setAllowPagination(true);
  }, [selectedIndex]);

  const goToFollowers = () => {
    navigation.navigate('Followers', {uuid});
  };

  const closeOnPress = () => {
    setShowStatePopUp(false);
  };

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const onPressShareQR = () => {
    navigation.navigate('MyQRCode', {uuid, type: 'otherMusician'});
  };

  //! BLOCK/UNBLOCK AREA
  useEffect(() => {
    if (blockResponse === 'Success') {
      setRefreshing!();
      setToastBlock(true);
      setBlockResponse(undefined);
    }
  }, [blockResponse]);

  useEffect(() => {
    if (unblockResponse === 'Success') {
      setRefreshing!();
      settoastUnblock(true);
      setUnblockResponse(undefined);
    }
  }, [unblockResponse]);

  const handleUnblock = () => {
    setModalUnblock(true);
  };

  const unblockModalOnPress = () => {
    setUnblockUser({uuid: profile.uuid});
    setModalUnblock(false);
  };

  const handleToastUnblock = () => {
    settoastUnblock(false);
  };

  const handleToastBlock = () => {
    setToastBlock(false);
  };

  const blockModalOnPress = () => {
    setBlockUser({uuid: profile.uuid});
    setModalBlock(false);
  };
  //! END OF BLOCK/UNBLOCK AREA

  const resultDataDropdown = (selectedMenu: DataDropDownType) => {
    const value = t(selectedMenu.value);

    switch (value) {
      case '1':
        onPressShareQR();
        break;
      case '2':
        console.log('SHARE CHOOSEN');
        break;
      case '3':
        setModalBlock(true);
        break;
      case '4':
        setModalUnblock(true);
        break;
      default:
        break;
    }
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
        <Text style={styles.name}>{elipsisText(profile.fullname, 25)}</Text>
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

  const showContentMusic =
    dataPlaylist?.length > 0 ||
    dataAlbum.length > 0 ||
    dataAppearsOn.length > 0;

  const cardInfoPosition =
    Platform.OS === 'ios' && refresh
      ? heightResponsive(10)
      : heightResponsive(-20);

  return (
    <View style={styles.container}>
      <SsuStatusBar type={'black'} />
      <TopNavigation.Type1
        type="user detail"
        title=""
        leftIcon={scrolEffect && leftIconHeader()}
        leftIconAction={handleBackAction}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        bgColor={scrolEffect ? color.Dark[800] : 'transparent'}
        containerStyles={styles.topNavStyle}
        dropdownData={
          profile.isBlock ? dataProfileDropdownBlocked : dataProfileDropdown
        }
        resultDataDropdown={resultDataDropdown}
        beingBlocked={profile.blockIs}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={setRefresh}
            tintColor={'transparent'}
          />
        }
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
          blocked={profile.isBlock || profile.blockIs}
          dataBadge={dataBadge?.data}
          refresh={refresh}
        />
        <View style={[styles.infoCard, {marginTop: cardInfoPosition}]}>
          <UserInfoCard
            onPress={goToFollowers}
            profile={musicianProfile}
            followersCount={followersCount}
          />

          {profile.isBlock ? (
            <BlockProfileUI
              title={`@${profile.fullname} ${t(
                'Block.BlockUI.isBlockedProfTitle',
              )}`}
              caption={`${t('Block.BlockUI.isBlockedProfCaption')} @${
                profile.fullname
              }`}
              buttonOnPress={handleUnblock}
              containerStyle={styles.blockProfile}
            />
          ) : profile.blockIs ? (
            <BlockProfileUI
              title={`${t('Block.BlockUI.blockIsProfTitle')}`}
              caption={`${t('Block.BlockUI.blockIsProfCaption')} @${
                profile.fullname
              }`}
              containerStyle={styles.blockProfile}
            />
          ) : (
            <>
              {showStatePopUp !== false && (
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: widthResponsive(20),
                  }}>
                  <Gap height={12} />
                  <PopUp
                    title={t('Musician.ShowAppreciate')}
                    subTitle={t('Musician.SendTip')}
                    closeOnPress={closeOnPress}
                  />
                </View>
              )}

              {exclusiveContent && (
                <ExclusiveDailyContent {...exclusiveContent} subs={subsEC} />
              )}

              <Gap height={10} />
              <View style={styles.containerContent}>
                <TabFilter.Type1
                  filterData={filter}
                  onPress={filterData}
                  selectedIndex={selectedIndex}
                  flatlistContainerStyle={{
                    paddingHorizontal: widthResponsive(24),
                    width: 'auto',
                  }}
                  translation={true}
                />
                {filter[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
                  <DataMusician profile={profile} dataAlbum={dataAlbum} />
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Musician' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(24),
                      width: '100%',
                    }}>
                    {exclusiveContent ? (
                      <PostListProfile
                        uuidMusician={uuid}
                        endReached={endReached}
                        setEndReached={setEndReached}
                        setAllowPagination={setAllowPagination}
                        {...exclusiveContent}
                      />
                    ) : (
                      <PostListProfile
                        uuidMusician={uuid}
                        pricingPlans={[]}
                        endReached={endReached}
                        setEndReached={setEndReached}
                        setAllowPagination={setAllowPagination}
                      />
                    )}
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Music' ? (
                  isLoading ? null : showContentMusic ? (
                    <View style={{paddingHorizontal: widthResponsive(20)}}>
                      <ListPlaylist
                        data={dataPlaylist}
                        onPress={goToPlaylist}
                        scrollable={false}
                      />
                      <Gap height={mvs(20)} />
                      {/* List Album Horizontal */}
                      {dataAlbum && dataAlbum?.length > 0 && (
                        <ListAlbum
                          data={dataAlbum}
                          title={t('Musician.Label.Album')}
                          containerStyles={{marginBottom: mvs(30)}}
                        />
                      )}
                      {/* List Appears On */}
                      {dataAppearsOn && dataAppearsOn?.length > 0 && (
                        <ListAlbum
                          data={dataAppearsOn}
                          title={t('Musician.Label.AppearsOn')}
                          containerStyles={{marginBottom: mvs(30)}}
                        />
                      )}
                    </View>
                  ) : (
                    <EmptyState
                      text={t('Profile.Label.NoPlaylist') || ''}
                      containerStyle={{
                        alignSelf: 'center',
                        marginVertical: heightPercentage(30),
                      }}
                    />
                  )
                ) : filter[selectedIndex].filterName === 'Musician.Tab.Fans' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                      marginBottom: mvs(20),
                    }}>
                    <FansScreen uuid={uuid} />
                  </View>
                ) : // TODO: DISABLE FOR NOW
                // : filter[selectedIndex].filterName === 'Musician.Tab.Main' ? (
                //   <View style={{paddingHorizontal: widthResponsive(20)}}>
                //    <MainTab
                //       uuid={uuid}
                //       coverImage={exclusiveContent?.coverImage ?? ''}
                //       title={exclusiveContent?.title ?? ''}
                //       description={exclusiveContent?.description ?? ''}
                //     />
                //   </View>
                // )
                filter[selectedIndex].filterName ===
                  'Musician.Tab.Merchandise' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <MerchList musicianId={uuid} />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Ticket' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <ConcertList musicianId={uuid} />
                  </View>
                ) : filter[selectedIndex].filterName ===
                  'Musician.Tab.Event' ? (
                  <View
                    style={{
                      paddingHorizontal: widthResponsive(20),
                    }}>
                    <EventMusician musicianId={uuid} />
                  </View>
                ) : null}
              </View>
            </>
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

      {/* //? Block user modal */}
      {modalBlock && (
        <ModalConfirm
          modalVisible={modalBlock}
          title={`${t('Block.Modal.Title')} @${profile.fullname} ?`}
          subtitle={`${t('Block.Modal.Subtitle')} @${profile.fullname}`}
          yesText={`${t('Block.Modal.RightButton')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalBlock(false)}
          onPressOk={blockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When block succeed */}
      <SuccessToast
        toastVisible={toastBlock}
        onBackPressed={handleToastBlock}
        caption={`${t('General.BlockSucceed')} @${profile.fullname}`}
      />

      {/* //? Unblock user modal */}
      {modalUnblock && (
        <ModalConfirm
          modalVisible={modalUnblock}
          title={`${t('Block.BlockUI.unBlockTitle')} @${profile.fullname} ?`}
          subtitle={`${t('Block.BlockUI.unBlockCaptionA')} @${
            profile.fullname
          } ${t('Block.BlockUI.unBlockCaptionB')} @${profile.fullname}`}
          yesText={`${t('Block.BlockUI.unblockButtonYes')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalUnblock(false)}
          onPressOk={unblockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When unblock succeed */}
      <SuccessToast
        toastVisible={toastUnblock}
        onBackPressed={handleToastUnblock}
        caption={`@${profile.fullname} ${t('Block.BlockUI.unblockSuccess')}`}
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
    width: width * 0.8,
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(16),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
    paddingLeft: widthPercentage(10),
  },
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
  blockProfile: {
    paddingHorizontal: widthResponsive(16),
  },
});
