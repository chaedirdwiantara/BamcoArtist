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
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  BottomSheetGuest,
  SsuToast,
  Gap,
  ListMoodGenre,
  ListImageDesc,
  CreatePostShortcut,
  ModalConfirm,
} from '../components';
import {font} from '../theme';
import Color from '../theme/Color';
import TopSong from './ListCard/TopSong';
import NewSong from './ListCard/NewSong';
import {defaultBanner} from '../data/home';
import TopMusician from './ListCard/TopMusician';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {useHomeHook} from '../hooks/use-home.hook';
import {dataPlaceHolder} from '../data/placeHolder';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {useSearchHook} from '../hooks/use-search.hook';
import {useCreditHook} from '../hooks/use-credit.hook';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {ParamsProps} from '../interface/base.interface';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useSettingHook} from '../hooks/use-setting.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import FavoriteMusician from './ListCard/FavoriteMusician';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import {MainTabParams, RootStackParams} from '../navigations';
import RecomendedMusician from './ListCard/RecomendedMusician';
import {profileStorage, storage} from '../hooks/use-storage.hook';
import {useNotificationHook} from '../hooks/use-notification.hook';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import EmptyStateHome from '../components/molecule/EmptyState/EmptyStateHome';
import ListPlaylistHome from '../components/molecule/ListCard/ListPlaylistHome';
import {ModalConfirmChoice} from '../components/molecule/Modal/ModalConfirmChoice';
import {useVideoStore} from '../store/video.store';

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
  const {dataDiveIn, dataAlbumComingSoon, getListDiveIn, getListComingSoon} =
    useHomeHook();
  const {dataBanner, getListDataBanner, isLoadingBanner} = useBannerHook();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {addFcmToken} = useFcmHook();
  const {isPlaying, showPlayer, hidePlayer, addPlaylist} = usePlayerHook();
  const {
    isLoadingMusician,
    dataMusician,
    dataFavoriteMusician,
    dataRecommendedMusician,
    getListDataMusician,
    getListDataFavoriteMusician,
    getListDataRecommendedMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
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
    listGenre,
    listMood,
    getListMoodPublic,
    getListGenrePublic,
    dataExclusiveContent,
    getExclusiveContent,
  } = useSettingHook();
  const {getSearchPlaylists} = useSearchHook();

  const {uriVideo, setUriVideo} = useVideoStore();

  const isLogin = storage.getBoolean('isLogin');
  const isFocused = useIsFocused();
  const [selectedIndexMusician, setSelectedIndexMusician] = useState(-0);
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);
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
    }, []),
  );

  useEffect(() => {
    getListDataBanner();
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

  // Triggering isFollowing musician when go back from other screen
  useFocusEffect(
    useCallback(() => {
      if (selectedIndexMusician === 0) {
        getListDataMusician();
      } else if (selectedIndexMusician === 1) {
        getListDataRecommendedMusician();
      } else {
        getListDataFavoriteMusician();
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, [refreshing, selectedIndexMusician]),
  );

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

  const [filterMusician] = useState([
    {filterName: 'Home.Tab.TopMusician.Title'},
    {filterName: 'Home.Tab.Recomended.Title'},
    {filterName: 'Home.Tab.Favorite.Title'},
  ]);

  const [filterMusicianGuest] = useState([
    {filterName: 'Home.Tab.TopMusician.Title'},
    {filterName: 'Home.Tab.Recomended.Title'},
  ]);

  const [filterSong] = useState([
    {filterName: 'Home.Tab.TopSong.Title'},
    {filterName: 'Home.Tab.NewSong.Title'},
  ]);

  const filterDataMusician = (item: any, index: any) => {
    if (!isLogin && index === 1) {
      setModalGuestVisible(true);
    } else {
      setSelectedIndexMusician(index);
    }
  };

  const filterDataSong = (item: any, index: any) => {
    setSelectedIndexSong(index);
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

  const onPressMoodGenre = (title: string, filterBy: string) => {
    navigation.navigate('ListImage', {title, filterBy});
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

  const goToMusicianPost = (name: string) => {
    isLogin || name === 'Trending'
      ? navigation.navigate('ListPost', {title: name})
      : setModalGuestVisible(true);
  };

  if (isLoadingBanner || isLoadingMusician) {
    return <View style={styles.root} />;
  }

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
        <TouchableOpacity onPress={handleSearchButton}>
          <SearchBar
            containerStyle={{paddingHorizontal: widthResponsive(24)}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>
        <Carousel
          data={dataBanner?.length > 0 ? dataBanner : defaultBanner}
          onPressBanner={handleWebview}
        />

        {/* Create Post Shortcuts */}
        <CreatePostShortcut
          avatarUri={dataProfile?.data?.imageProfileUrls[1]?.image}
          placeholder={`${randomPlaceHolder}...`}
          compOnPress={handleCreatePost}
        />

        {/* Mood */}
        <ListMoodGenre
          title={t('Home.ListMood.Title')}
          data={listMood}
          containerStyle={styles.containerList}
          onPress={() => onPressMoodGenre('Moods', 'mood')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'mood')}
        />
        {/* End Of Mood */}
        {/* Genre */}
        <ListMoodGenre
          title={t('Home.ListGenre.Title')}
          data={listGenre}
          containerStyle={styles.containerList}
          imageStyle={{
            width: widthPercentage(90),
            height: heightPercentage(80),
          }}
          onPress={() => onPressMoodGenre('Genre', 'genre')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'genre')}
        />
        {/* End Of Genre */}
        {/* Dive In */}
        <View
          style={{
            marginTop: heightPercentage(20),
            marginBottom: heightPercentage(10),
            paddingLeft: widthResponsive(24),
          }}>
          <Text style={styles.diveInText}>{t('Home.DiveIn.Title')}</Text>
          <Text style={styles.diveInDesc}>{t('Home.DiveIn.Subtitle')}</Text>
        </View>

        <ListImageDesc
          title=""
          hideArrow={true}
          data={dataDiveIn}
          containerStyle={{
            marginTop: heightPercentage(10),
            marginBottom: heightPercentage(20),
          }}
          imageStyle={{
            width: widthPercentage(115),
            height: widthPercentage(115),
          }}
          onPress={() => null}
          onPressImage={goToMusicianPost}
        />
        {/* End Of Dive In */}
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
        {/* Tab Musician */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={!isLogin ? filterMusicianGuest : filterMusician}
            onPress={filterDataMusician}
            selectedIndex={selectedIndexMusician}
            translation={true}
          />
          {filterMusician[selectedIndexMusician].filterName ===
          'Home.Tab.TopMusician.Title' ? (
            <TopMusician
              dataMusician={dataMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician}
            />
          ) : filterMusician[selectedIndexMusician].filterName ===
            'Home.Tab.Recomended.Title' ? (
            <RecomendedMusician
              dataMusician={dataRecommendedMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician}
            />
          ) : (
            <FavoriteMusician
              dataMusician={dataFavoriteMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician}
            />
          )}
        </View>
        {/* End of Tab Musician */}
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
});
