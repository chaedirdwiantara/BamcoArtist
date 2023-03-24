import React, {useEffect, useState} from 'react';
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
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation, useIsFocused} from '@react-navigation/native';

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
} from '../components';
import {font} from '../theme';
import Color from '../theme/Color';
import TopSong from './ListCard/TopSong';
import NewSong from './ListCard/NewSong';
import {defaultBanner} from '../data/home';
import {ListDiveIn} from '../data/diveInList';
import TopMusician from './ListCard/TopMusician';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {storage} from '../hooks/use-storage.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {useCreditHook} from '../hooks/use-credit.hook';
import {useSearchHook} from '../hooks/use-search.hook';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {ParamsProps} from '../interface/base.interface';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useSettingHook} from '../hooks/use-setting.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import FavoriteMusician from './ListCard/FavoriteMusician';
import {usePlaylistHook} from '../hooks/use-playlist.hook';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import {MainTabParams, RootStackParams} from '../navigations';
import {PreferenceList} from '../interface/setting.interface';
import RecomendedMusician from './ListCard/RecomendedMusician';
import {useNotificationHook} from '../hooks/use-notification.hook';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import ListPlaylistHome from '../components/molecule/ListCard/ListPlaylistHome';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;

  const {dataBanner, getListDataBanner} = useBannerHook();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {addFcmToken} = useFcmHook();
  const {isPlaying, showPlayer, hidePlayer, addPlaylist} = usePlayerHook();
  const {
    dataMusician,
    dataFavoriteMusician,
    getListDataMusician,
    getListDataFavoriteMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {dataTopSong, dataNewSong, getListDataTopSong, getListDataNewSong} =
    useSongHook();
  const {counter, getCountNotification} = useNotificationHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {listGenre, listMood, getListMoodGenre} = useSettingHook();
  const {getSearchAlbums} = useSearchHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();

  const isLogin = storage.getBoolean('isLogin');
  const isFocused = useIsFocused();
  const [selectedIndexMusician, setSelectedIndexMusician] = useState(-0);
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const JSONProfile = storage.getString('profile');
  let uuid: string = '';
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    uuid = profileObject.uuid;
  }

  // dummy coming soon
  const {data: dataSearchAlbums, refetch} = useQuery(['/search-albums'], () =>
    getSearchAlbums({keyword: ''}),
  );

  useEffect(() => {
    getListDataBanner();
    getProfileUser();
    getListDataMusician();
    getListDataTopSong();
    getCountNotification();
    getCreditCount();
    getListMoodGenre();
    refetch();
    getListDataFavoriteMusician();
    getListDataNewSong();
    getPlaylist();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isPlaying]);

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
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
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
    setSelectedIndexMusician(index);
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

  const onPressMoodGenre = (title: string, data: PreferenceList[]) => {
    isLogin
      ? navigation.navigate('ListImage', {title, data})
      : setModalGuestVisible(true);
  };

  const goToListMusic = (name: string, type: string) => {
    navigation.navigate('ListMusic', {title: name, id: 1, type});
  };

  const goToDetailAlbum = () => {
    navigation.navigate('Album', {id: 35});
  };

  const goToMusicianPost = (name: string) => {
    isLogin || name === 'Trending'
      ? navigation.navigate('ListPost', {title: name, id: 1})
      : setModalGuestVisible(true);
  };

  if (dataProfile?.data === undefined) {
    return <View style={styles.root} />;
  }

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={dataProfile?.data?.fullname ?? ''}
        profileUri={dataProfile?.data?.imageProfileUrls[1]?.image || ''}
        leftIconAction={() => null}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={20}
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

        {/* Mood */}
        <ListMoodGenre
          title="Mood"
          data={listMood}
          containerStyle={styles.containerList}
          onPress={() => onPressMoodGenre('Moods', listMood)}
          onPressImage={name => goToListMusic(name, 'song')}
        />
        {/* End Of Mood */}
        {/* Genre */}
        <ListMoodGenre
          title="Genre"
          data={listGenre}
          containerStyle={styles.containerList}
          imageStyle={{
            width: widthPercentage(90),
            height: heightPercentage(80),
          }}
          onPress={() => onPressMoodGenre('Genre', listGenre)}
          onPressImage={name => goToListMusic(name, 'song')}
        />
        {/* End Of Genre */}
        {/* Dive In */}
        {/* TODO: need to be wired with API Dive In */}
        <View
          style={{
            marginTop: heightPercentage(20),
            marginBottom: heightPercentage(10),
            paddingLeft: widthResponsive(24),
          }}>
          <Text style={styles.diveInText}>Dive In</Text>
          <Text style={styles.diveInDesc}>Based on your preferences</Text>
        </View>

        <ListImageDesc
          title=""
          hideArrow={true}
          data={ListDiveIn}
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
            />
          ) : (
            <NewSong
              dataSong={dataNewSong}
              onPress={onPressNewSong}
              type={'home'}
              loveIcon={isLogin}
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
            />
          ) : filterMusician[selectedIndexMusician].filterName ===
            'Home.Tab.Recomended.Title' ? (
            <RecomendedMusician
              dataMusician={dataMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
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
            />
          )}
        </View>
        {/* End of Tab Musician */}
        {/* Playlist */}
        <ListPlaylistHome
          title={'Playlist'}
          data={dataPlaylist}
          onPress={() => navigation.navigate('ListPlaylist')}
        />
        {/* End of Playlist */}
        {/* Coming Soon */}
        {/* TODO: Need to be wired with API unreleased album */}
        <ListImageDesc
          title="Coming Soon"
          data={dataSearchAlbums?.data}
          containerStyle={styles.containerList}
          onPress={() => goToListMusic('Album', 'album')}
          onPressImage={goToDetailAlbum}
        />
      </ScrollView>
      {/* End Of Coming Soon */}
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

      <ModalPlayMusic onPressModal={() => goToScreen('MusicPlayer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
    marginBottom: heightPercentage(22),
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
