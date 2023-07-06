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
  FlatList,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useQuery} from 'react-query';
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
  ListImageDesc,
  CreatePostShortcut,
  ModalConfirm,
} from '../components';
import {font} from '../theme';
import Color from '../theme/Color';
import TopSong from './ListCard/TopSong';
import NewSong from './ListCard/NewSong';
import {listOverviewCard} from '../data/home';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {useHomeHook} from '../hooks/use-home.hook';
import {dataPlaceHolder} from '../data/placeHolder';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {useSearchHook} from '../hooks/use-search.hook';
import {useCreditHook} from '../hooks/use-credit.hook';
import {usePlayerHook} from '../hooks/use-player.hook';
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
import EmptyStateHome from '../components/molecule/EmptyState/EmptyStateHome';
import ListPlaylistHome from '../components/molecule/ListCard/ListPlaylistHome';
import {ModalConfirmChoice} from '../components/molecule/Modal/ModalConfirmChoice';
import OverviewCard from '../components/molecule/ListCard/OverviewCard';
import {useVideoStore} from '../store/video.store';
import Fans from './Analytics/Fans';
import Income from './Analytics/Income';
import AlbumAnalytic from './Analytics/Album';
import PostAnalytic from './Analytics/Post';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

interface ModalPostState {
  isExclusivePostModal: boolean;
  isSetExclusiveSetting: boolean;
}

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {i18n, t} = useTranslation();
  const currentLanguage = i18n.language;
  const {dataAlbumComingSoon, getListDiveIn, getListComingSoon} = useHomeHook();
  const {dataProfile, profileProgress, getProfileUser, getProfileProgress} =
    useProfileHook();
  const {addFcmToken} = useFcmHook();
  const {showPlayer, hidePlayer, addPlaylist} = usePlayerHook();
  const {
    isLoadingSong,
    dataTopSong,
    dataNewSong,
    getListDataTopSong,
    getListDataNewSong,
  } = useSongHook();
  const {counter, getCountNotification} = useNotificationHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {
    getListMoodPublic,
    getListGenrePublic,
    dataExclusiveContent,
    getExclusiveContent,
  } = useSettingHook();
  const {getSearchPlaylists} = useSearchHook();

  const {uriVideo, setUriVideo} = useVideoStore();

  const isLogin = storage.getBoolean('isLogin');
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);
  const [selectedIndexAnalytic, setSelectedIndexAnalytic] = useState(-0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModalPost, setShowModalPost] = useState<ModalPostState>({
    isExclusivePostModal: false,
    isSetExclusiveSetting: false,
  });
  const [postChoice, setPostChoice] = useState<
    'choiceA' | 'choiceB' | undefined
  >();

  const JSONProfile = storage.getString('profile');
  let uuid: string = '';
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    uuid = profileObject.uuid;
  }

  const {data: dataPlaylist, refetch: refetchPlaylist} = useQuery(
    ['/search-playlist'],
    () => getSearchPlaylists({keyword: ''}),
  );

  const [randomPlaceHolder, setRandomPlaceHolder] = useState(
    dataPlaceHolder[Math.floor(Math.random() * dataPlaceHolder.length)],
  );

  useFocusEffect(
    useCallback(() => {
      setRandomPlaceHolder(
        dataPlaceHolder[Math.floor(Math.random() * dataPlaceHolder.length)],
      );
      getProfileProgress();
    }, []),
  );

  useEffect(() => {
    getProfileUser();
    getCountNotification();
    getCreditCount();
    getListMoodPublic();
    getListGenrePublic();
    getListDiveIn();
    refetchPlaylist();
    getListComingSoon();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  // Triggering when click love on the same song in top & new song tab
  useFocusEffect(
    useCallback(() => {
      if (selectedIndexSong === 0) {
        getListDataTopSong();
      } else {
        getListDataNewSong();
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, [refreshing, selectedIndexSong]),
  );

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
    if (dataProfile?.data.language !== currentLanguage) {
      i18n.changeLanguage(dataProfile?.data.language);
    }
  }, [dataProfile]);

  const registerFcm = (token: string) => {
    addFcmToken(token);
  };

  const handleOnGetToken = (token: string) => {
    addFcmToken(token);
  };

  const [filterSong] = useState([
    {filterName: 'Home.Tab.TopSong.Title'},
    {filterName: 'Home.Tab.NewSong.Title'},
  ]);

  const [filterAnalytic] = useState([
    {filterName: 'Home.Tab.Analytic.Fans.Title'},
    {filterName: 'Home.Tab.Analytic.Post.Title'},
    {filterName: 'Home.Tab.Analytic.Album.Title'},
    {filterName: 'Home.Tab.Analytic.Income.Title'},
    {filterName: 'Home.Tab.Analytic.Explore.Title'},
  ]);

  const filterDataSong = (item: any, index: any) => {
    setSelectedIndexSong(index);
  };

  const filterDataAnalytic = (item: any, index: any) => {
    setSelectedIndexAnalytic(index);
  };

  const handleSearchButton = () => {
    navigation.navigate('SearchScreen');
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
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

  const onPressTopSong = (val: SongList) => {
    addPlaylist({dataSong: dataTopSong, playSongId: val.id, isPlay: true});
    showPlayer();
  };

  const onPressNewSong = (val: SongList) => {
    addPlaylist({dataSong: dataNewSong, playSongId: val.id, isPlay: true});
    showPlayer();
  };

  const goToScreen = (screen: 'MusicPlayer' | 'TopupCoin' | 'Notification') => {
    navigation.navigate(screen);
  };

  const onPressNotif = () => {
    isLogin ? goToScreen('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopupCoin') : setModalGuestVisible(true);
  };

  const goToListMusic = (
    name: string,
    type: string,
    id?: number,
    filterBy?: string,
  ) => {
    navigation.navigate('ListMusic', {
      id,
      type,
      filterBy,
      title: name,
      fromMainTab: true,
    });
  };

  const goToDetailAlbum = (name: string, id: number) => {
    navigation.navigate('Album', {id, type: 'coming_soon'});
  };

  const handleCreatePost = () => {
    setShowModalPost({
      isExclusivePostModal: true,
      isSetExclusiveSetting: false,
    });
    getExclusiveContent({uuid});
  };

  const handleCreatePostBackdrop = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
    });
  };

  const handleChoiceOnPress = (value: 'choiceA' | 'choiceB') => {
    setPostChoice(value);
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
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
    });
  };

  const handleConfirmModal = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
    });
    navigation.navigate('ExclusiveContentSetting', {type: 'navToCreatePost'});
  };

  const handleMiniPlayerOnPress = () => {
    hidePlayer();
    goToScreen('MusicPlayer');
  };

  const goToProfileProgress = () => {
    navigation.navigate('ProfileProgress');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={profileStorage()?.fullname ?? ''}
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
        {profileProgress?.stepProgress !== '100%' ? (
          <ProgressCard
            percentage={profileProgress?.stepProgress}
            onPress={goToProfileProgress}
            containerStyle={{marginTop: mvs(10)}}
          />
        ) : null}
        <Text style={styles.titleOverview}>{t('Home.OverviewCard.Title')}</Text>
        <FlatList
          data={listOverviewCard}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => (
            <OverviewCard
              key={item.id}
              amount={item.amount}
              path={item.path}
              title={t(item.title)}
              type={item.id === 1 || item.id === 2 ? 'black' : 'white'}
            />
          )}
        />
        <Text style={[styles.titleOverview, {paddingVertical: mvs(15)}]}>
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

        <Gap height={heightPercentage(20)} />

        {/* Tab Analytic */}
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
          ) : null}
        </View>
        {/* End of Tab Analytic */}
        {/* Tab Song */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={filterSong}
            onPress={filterDataSong}
            selectedIndex={selectedIndexSong}
            translation={true}
          />
          {filterSong[selectedIndexSong].filterName ===
          'Home.Tab.TopSong.Title' ? (
            <TopSong
              dataSong={dataTopSong}
              onPress={onPressTopSong}
              type={'home'}
              loveIcon={isLogin}
              fromMainTab={true}
              isLoading={isLoadingSong}
            />
          ) : (
            <NewSong
              dataSong={dataNewSong}
              onPress={onPressNewSong}
              type={'home'}
              loveIcon={isLogin}
              isLoading={isLoadingSong}
            />
          )}
        </View>
        {/* End of Tab Song */}
        {/* Playlist */}
        <ListPlaylistHome
          title={t('Home.Playlist.Title')}
          data={dataPlaylist?.data}
          onPress={() => navigation.navigate('ListPlaylist')}
        />
        {/* End of Playlist */}
        <Gap height={heightPercentage(10)} />
        {/* Coming Soon */}
        {dataAlbumComingSoon.length > 0 ? (
          <ListImageDesc
            title={t('Home.ComingSoon.Title')}
            data={dataAlbumComingSoon}
            containerStyle={styles.containerList}
            onPress={() => goToListMusic('Coming Soon', 'album')}
            onPressImage={(name, id) => goToDetailAlbum(name, id)}
          />
        ) : (
          <EmptyStateHome
            title={t('Home.ComingSoon.Title')}
            onPress={() => goToListMusic('Coming Soon', 'album')}
          />
        )}
        <Gap height={heightPercentage(40)} />
        {/* End Of Coming Soon */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
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
    width: width * 0.9,
    alignSelf: 'center',
    color: Color.Neutral[10],
    fontSize: mvs(18),
    fontFamily: font.InterMedium,
    fontWeight: '600',
    paddingVertical: mvs(10),
  },
});
