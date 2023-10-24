import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  TopNavigation,
  TabFilter,
  IconNotif,
  SsuStatusBar,
  BottomSheetGuest,
  SsuToast,
  Gap,
  CreatePostShortcut,
  ModalConfirm,
  SearchBar,
  Carousel,
} from '../components';
import {color, font} from '../theme';
import Color from '../theme/Color';
import {defaultBanner, listOverviewCard} from '../data/home';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {dataPlaceHolder} from '../data/placeHolder';
import * as FCMService from '../service/notification';
import {useCreditHook} from '../hooks/use-credit.hook';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useSettingHook} from '../hooks/use-setting.hook';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import {MainTabParams, RootStackParams} from '../navigations';
import {profileStorage, storage} from '../hooks/use-storage.hook';
import {useNotificationHook} from '../hooks/use-notification.hook';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {ProgressCard} from '../components/molecule/ListCard/ProgressCard';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {
  heightPercentage,
  width,
  widthPercentage,
  widthResponsive,
} from '../utils';
import {ModalConfirmChoice} from '../components/molecule/Modal/ModalConfirmChoice';
import OverviewCard from '../components/molecule/ListCard/OverviewCard';
import {useVideoStore} from '../store/video.store';
import Fans from './Analytics/Fans';
import Income from './Analytics/Income';
import AlbumAnalytic from './Analytics/Album';
import PostAnalytic from './Analytics/Post';
import Explore from './Analytics/Explore';
import {
  DataTotalCountPropsType,
  TotalPostAndFansResponseType,
} from '../interface/profile.interface';
import {TotalIncome} from '../interface/analythic.interface';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../hooks/use-analytics.hook';
import {UploadMusicSection} from '../components/molecule/UploadMusic';
import {randomString} from '../utils/randomString';
import ShowMoreAnalytics from '../components/molecule/ShowMoreAnalytics';
import EventList from './ListCard/EventList';
import {useEventHook} from '../hooks/use-event.hook';
import {useHomeHook} from '../hooks/use-home.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

interface ModalPostState {
  isExclusivePostModal: boolean;
  isSetExclusiveSetting: boolean;
  isBanned: boolean;
}

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {i18n, t} = useTranslation();
  const currentLanguage = i18n.language;
  const {isLoadingBanner, dataBanner, getListDataBanner} = useBannerHook();
  const {
    dataProfile,
    profileProgress,
    getProfileUser,
    getProfileProgress,
    getTotalSongAndAlbum,
    getTotalPostAndFans,
  } = useProfileHook();
  const {addFcmToken} = useFcmHook();
  const {hidePlayer} = usePlayerHook();
  const {counter, getCountNotification} = useNotificationHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const {getIncome} = useAnalyticsHook();
  const {useEventHome} = useEventHook();
  const {setLastActive} = useHomeHook();
  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
  } = useEventHome();

  const {uriVideo, setUriVideo} = useVideoStore();

  const isLogin = storage.getBoolean('isLogin');
  const [selectedIndexAnalytic, setSelectedIndexAnalytic] = useState(-0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModalPost, setShowModalPost] = useState<ModalPostState>({
    isExclusivePostModal: false,
    isSetExclusiveSetting: false,
    isBanned: false,
  });
  const [postChoice, setPostChoice] = useState<
    'choiceA' | 'choiceB' | undefined
  >();

  const [dataSongAlbum, setDataSongAlbum] = useState<DataTotalCountPropsType>();
  const [dataFansPost, setDataFansPost] =
    useState<TotalPostAndFansResponseType>();
  const [dataIncome, setDataIncome] = useState<TotalIncome>();
  const [showAnalytic, setShowAnalytic] = useState<boolean>(false);

  const {data: songAndAlbumData, refetch: refetchTotalSongAlbum} = useQuery(
    'overview-totalSongAlbum',
    () => getTotalSongAndAlbum({uuid}),
  );
  const {data: fansAndPostData, refetch: refetchTotalFansPost} = useQuery(
    'overview-totalFansPost',
    () => getTotalPostAndFans(),
  );
  const {data: incomeData, refetch: refetchIncome} = useQuery(
    'overview-income',
    () => getIncome('monthly'),
  );

  const JSONProfile = storage.getString('profile');
  let uuid: string = '';
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    uuid = profileObject.uuid;
  }

  const [randomPlaceHolder, setRandomPlaceHolder] = useState(
    dataPlaceHolder[Math.floor(Math.random() * dataPlaceHolder.length)],
  );

  useFocusEffect(
    useCallback(() => {
      setRandomPlaceHolder(
        dataPlaceHolder[Math.floor(Math.random() * dataPlaceHolder.length)],
      );

      // Triggering when go back from other screen
      getProfileProgress();
      getProfileUser();
      setLastActive();
    }, []),
  );

  useEffect(() => {
    getCountNotification();
    getCreditCount();
    refetchTotalSongAlbum();
    refetchTotalFansPost();
    refetchIncome();
    refetchEvent();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  useEffect(() => {
    setDataFansPost(fansAndPostData?.data);
  }, [fansAndPostData]);

  useEffect(() => {
    setDataSongAlbum(songAndAlbumData?.data);
  }, [songAndAlbumData]);

  useEffect(() => {
    setDataIncome(incomeData);
  }, [incomeData]);

  // Doesn't trigger the banner when pull refresh
  useEffect(() => {
    getListDataBanner();
    const uniqueId = storage.getString('uniqueId');
    if (uniqueId === undefined) {
      storage.set('uniqueId', Date.now() + randomString(10)); //unix timestamp + random string (10)
    }
  }, []);

  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (showToast !== undefined) {
      setToastVisible(showToast);
      setToastText('Song have been added to playlist!');
    }
  }, [route.params]);

  useEffect(() => {
    const isRecoverSuccess = storage.getBoolean('recoverSuccess');
    setToastVisible(isRecoverSuccess || false);
    setToastText('Welcome back to Beamco!');
    storage.set('recoverSuccess', false);
  }, []);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
  }, [toastVisible]);

  useEffect(() => {
    FCMService.getTokenFCM({onGetToken: handleOnGetToken});
    FCMService.createNotificationListener({
      onRegister: token => registerFcm(token),
      onNotification: data => {
        onNotification(data);
      },
      onOpenNotification: data => console.log(data),
    });

    const onNotification = (data: FirebaseMessagingTypes.RemoteMessage) => {
      FCMService.showNotification({
        title: data.data?.title,
        message: data.data?.body,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataProfile && dataProfile?.data?.language !== currentLanguage) {
      i18n.changeLanguage(dataProfile?.data?.language);
    }
  }, [dataProfile]);

  const registerFcm = (token: string) => {
    addFcmToken(token);
  };

  const handleOnGetToken = (token: string) => {
    addFcmToken(token);
  };

  const [filterAnalytic] = useState([
    {filterName: 'Home.Tab.Analytic.Fans.Title'},
    {filterName: 'Home.Tab.Analytic.Income.Title'},
    {filterName: 'Home.Tab.Analytic.Post.Title'},
    {filterName: 'Home.Tab.Analytic.Album.Title'},
    {filterName: 'Home.Tab.Analytic.Explore.Title'},
  ]);

  const filterDataAnalytic = (item: any, index: any) => {
    setSelectedIndexAnalytic(index);
  };

  const handleSearchButton = () => {
    navigation.navigate('SearchScreen');
  };

  const rightIconComp = () => {
    return (
      <View style={styles.containerIcon}>
        {scrollEffect && (
          <TouchableOpacity onPress={handleSearchButton}>
            <SearchIcon
              stroke={Color.Dark[100]}
              style={{marginRight: widthPercentage(10)}}
            />
          </TouchableOpacity>
        )}
        <IconNotif label={isLogin ? counter : 0} />
      </View>
    );
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 20;
    setScrollEffect(scrolled);
  };

  const goToScreen = (
    screen: 'MusicPlayer' | 'TopUpCredit' | 'Notification',
  ) => {
    navigation.navigate(screen);
  };

  const onPressNotif = () => {
    isLogin ? goToScreen('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopUpCredit') : setModalGuestVisible(true);
  };

  const handleCreatePost = () => {
    if (dataProfile?.data.isBanned) {
      setShowModalPost({
        isExclusivePostModal: false,
        isSetExclusiveSetting: false,
        isBanned: true,
      });
    } else {
      setShowModalPost({
        isExclusivePostModal: true,
        isSetExclusiveSetting: false,
        isBanned: false,
      });
      getExclusiveContent({uuid});
    }
  };

  const handleCreatePostBackdrop = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleChoiceOnPress = (value: 'choiceA' | 'choiceB') => {
    setPostChoice(value);
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleOnModalHide = () => {
    if (postChoice === 'choiceA') {
      uriVideo && setUriVideo(null);
      setPostChoice(undefined);
      navigation.navigate('CreatePost', {audience: 'Feed.Public'});
    } else if (postChoice === 'choiceB') {
      if (dataExclusiveContent === null) {
        setPostChoice(undefined);
        setShowModalPost({
          isExclusivePostModal: false,
          isSetExclusiveSetting: true,
          isBanned: false,
        });
      } else {
        uriVideo && setUriVideo(null);
        setPostChoice(undefined);
        navigation.navigate('CreatePost', {audience: 'Feed.Exclusive'});
      }
    }
  };

  const handleMaybeLater = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleConfirmModal = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
    navigation.navigate('ExclusiveContentSetting', {type: 'navToCreatePost'});
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  const handleMiniPlayerOnPress = () => {
    hidePlayer();
    goToScreen('MusicPlayer');
  };

  const goToProfileProgress = () => {
    navigation.navigate('ProfileProgress');
  };

  const handleShowMoreAnalytics = () => {
    setShowAnalytic(true);
  };

  if (isLoadingBanner) {
    return <View style={styles.root} />;
  }

  const handleCloseBanModal = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleOkBanModal = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={dataProfile?.data?.fullname ?? ''}
        profileUri={dataProfile?.data?.imageProfileUrls[1]?.image || ''}
        leftIconAction={() => null}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={14}
        itemStrokeColor={Color.Pink[100]}
        points={isLogin ? creditCount : 0}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={onPressCoin}
        guest={!isLogin}
      />

      {Platform.OS === 'ios' && refreshing && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            tintColor={'transparent'}
          />
        }
        onScroll={handleScroll}>
        <TouchableOpacity onPress={handleSearchButton}>
          <SearchBar
            containerStyle={{width: width * 0.9, alignSelf: 'center'}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>
        {profileProgress?.stepProgress !== '100%' ? (
          <ProgressCard
            percentage={profileProgress?.stepProgress}
            onPress={goToProfileProgress}
            containerStyle={{marginTop: mvs(20)}}
          />
        ) : null}
        <Carousel
          data={dataBanner?.length > 0 ? dataBanner : defaultBanner}
          onPressBanner={handleWebview}
        />
        <Text
          style={[
            styles.titleOverview,
            {paddingVertical: mvs(20), paddingHorizontal: widthResponsive(22)},
          ]}>
          {t('Home.CreateNewPost')}
        </Text>
        {/* Create Post Shortcuts */}
        {dataProfile?.data && (
          <CreatePostShortcut
            avatarUri={dataProfile?.data?.imageProfileUrls[1]?.image}
            placeholder={`${randomPlaceHolder}...`}
            compOnPress={handleCreatePost}
          />
        )}

        {dataSongAlbum?.countAlbumReleased === 0 && (
          <View style={styles.containerUpload}>
            <UploadMusicSection />
          </View>
        )}

        {/* Event List */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={[{filterName: 'Event.Live'}]}
            onPress={() => null}
            selectedIndex={0}
            translation={true}
          />
          <EventList dataEvent={dataEvent?.data} isLoading={isLoadingEvent} />
        </View>
        {/* End of Tab Event List */}

        <View style={styles.overviewContainer}>
          <Text style={styles.titleOverview}>
            {t('Home.OverviewCard.Title')}
          </Text>
          <TouchableOpacity
            onPress={() => setShowAnalytic(false)}
            disabled={!showAnalytic}>
            <Text
              style={[
                styles.hideAnalytics,
                {color: showAnalytic ? color.Success[400] : 'transparent'},
              ]}>
              {t('Home.OverviewCard.HideAnalytics')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOverview}>
          {listOverviewCard.map((item, index) => {
            const newData = [
              dataIncome?.totalIncome,
              dataFansPost?.totalFans,
              dataFansPost?.totalPublicPost,
              dataFansPost?.totalExclusivePost,
              dataSongAlbum?.countAlbumReleased,
              dataSongAlbum?.countSong,
            ];
            return (
              <OverviewCard
                key={item.id}
                amount={newData[index] || 0}
                path={item.path}
                title={t(item.title)}
                type={item.id === 2 || item.id === 3 ? 'black' : 'white'}
              />
            );
          })}
        </View>

        {!showAnalytic && (
          <ShowMoreAnalytics onPress={handleShowMoreAnalytics} />
        )}

        {/* Tab Analytic */}
        {showAnalytic && (
          <View style={[styles.containerContent]}>
            <TabFilter.Type3
              filterData={filterAnalytic}
              onPress={filterDataAnalytic}
              selectedIndex={selectedIndexAnalytic}
              translation={true}
            />
            {filterAnalytic[selectedIndexAnalytic].filterName ===
            'Home.Tab.Analytic.Income.Title' ? (
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <Gap height={widthResponsive(15)} />
                <Income />
              </View>
            ) : filterAnalytic[selectedIndexAnalytic].filterName ===
              'Home.Tab.Analytic.Fans.Title' ? (
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <Gap height={widthResponsive(15)} />
                <Fans />
              </View>
            ) : filterAnalytic[selectedIndexAnalytic].filterName ===
              'Home.Tab.Analytic.Post.Title' ? (
              <PostAnalytic uuid={uuid} />
            ) : filterAnalytic[selectedIndexAnalytic].filterName ===
              'Home.Tab.Analytic.Album.Title' ? (
              <View style={{paddingHorizontal: widthResponsive(20)}}>
                <Gap height={widthResponsive(15)} />
                <AlbumAnalytic />
              </View>
            ) : (
              <Explore refreshing={refreshing} />
            )}
          </View>
        )}
        {/* End of Tab Analytic */}
      </ScrollView>

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {toastText}
            </Text>
          </View>
        }
      />

      <ModalPlayMusic onPressModal={handleMiniPlayerOnPress} />

      <ModalConfirmChoice
        modalVisible={showModalPost.isExclusivePostModal}
        backdropOnPress={handleCreatePostBackdrop}
        choiceA={'Post as Public Content'}
        choiceB={'Post as Exclusive Content'}
        choiceOnPress={handleChoiceOnPress}
        onModalHide={handleOnModalHide}
      />

      <ModalConfirm
        modalVisible={showModalPost.isSetExclusiveSetting}
        title={t('Modal.ExclusiveContentConfirm.Title') || ''}
        subtitle={t('Modal.ExclusiveContentConfirm.Body') || ''}
        yesText={t('Modal.ExclusiveContentConfirm.ButtonOk') || ''}
        noText={t('Modal.ExclusiveContentConfirm.ButtonCancel') || ''}
        onPressClose={handleMaybeLater}
        onPressOk={handleConfirmModal}
      />

      {/* //? Banned user modal */}
      <ModalConfirm
        modalVisible={showModalPost.isBanned}
        title={`${t('Setting.PreventInteraction.Title')}`}
        subtitle={`${t('Setting.PreventInteraction.Subtitle')}`}
        yesText={`${t('Btn.Send')}`}
        noText={`${t('Btn.Cancel')}`}
        onPressClose={handleCloseBanModal}
        onPressOk={handleOkBanModal}
        textNavigate={`${t('Setting.PreventInteraction.TextNavigate')}`}
        textOnPress={handleOkBanModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
    marginTop: widthResponsive(25),
    marginBottom: heightPercentage(26),
    width: '100%',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(10),
  },
  diveInText: {
    color: Color.Neutral[10],
    fontFamily: font.InterSemiBold,
    fontSize: mvs(15),
  },
  diveInDesc: {
    color: Color.Dark[50],
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
  },
  containerList: {
    marginTop: heightPercentage(10),
  },
  titleOverview: {
    color: Color.Neutral[10],
    fontSize: mvs(18),
    fontFamily: font.InterMedium,
    fontWeight: '600',
  },
  hideAnalytics: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
  },
  containerOverview: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerUpload: {
    marginTop: widthResponsive(22),
    alignSelf: 'center',
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(22),
    alignItems: 'center',
    marginBottom: widthResponsive(20),
  },
});
