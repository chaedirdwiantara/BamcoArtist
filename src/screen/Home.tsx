import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  BottomSheetGuest,
} from '../components';
import Color from '../theme/Color';
import {dataSlider} from '../data/home';
import TopSong from './ListCard/TopSong';
import {SearchIcon} from '../assets/icon';
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import {RootStackParams} from '../navigations';
import TopMusician from './ListCard/TopMusician';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {storage} from '../hooks/use-storage.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {ParamsProps} from '../interface/base.interface';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {useTranslation} from 'react-i18next';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataBanner, getListDataBanner} = useBannerHook();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {addFcmToken} = useFcmHook();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
  } = usePlayerHook();
  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {dataTopSong, getListDataTopSong} = useSongHook();

  const isLogin = storage.getBoolean('isLogin');
  const isFocused = useIsFocused();

  useEffect(() => {
    getListDataBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getListDataMusician();
      getListDataTopSong();
    }, []),
  );

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isPlaying]);

  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);

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

  const registerFcm = (token: string) => {
    addFcmToken(token);
  };

  const handleOnGetToken = (token: string) => {
    addFcmToken(token);
  };

  const goToScreen = (screen: 'MusicPlayer' | 'TopupCoin') => {
    navigation.navigate(screen);
  };

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: t('Home.Tab.TopMusician.Title')},
    {filterName: t('Home.Tab.TopSong.Title')},
    {filterName: t('Home.Tab.TopPost.Title')},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
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
        <IconNotif label={isLogin ? 14 : 0} />
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

  const onPressNotif = () => {
    isLogin ? navigation.navigate('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopupCoin') : setModalGuestVisible(true);
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={dataProfile?.data?.fullname ?? ''}
        profileUri={dataProfile?.data?.imageProfileUrls[1]?.image || ''}
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={20}
        itemStrokeColor={Color.Pink[100]}
        points={isLogin ? 100000 : 0}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={onPressCoin}
        guest={!isLogin}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <TouchableOpacity onPress={handleSearchButton}>
          <SearchBar
            containerStyle={{paddingHorizontal: widthResponsive(24)}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>
        <Carousel
          data={isLogin && dataBanner?.length > 0 ? dataBanner : dataSlider}
          onPressBanner={handleWebview}
        />
        <View
          style={[
            styles.containerContent,
            {
              marginBottom: playerVisible
                ? heightPercentage(90)
                : heightPercentage(25),
            },
          ]}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName ===
          t('Home.Tab.TopMusician.Title') ? (
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
          ) : filter[selectedIndex].filterName ===
            t('Home.Tab.TopSong.Title') ? (
            <TopSong
              dataSong={dataTopSong}
              onPress={onPressTopSong}
              type={'home'}
            />
          ) : (
            <PostList
              dataRightDropdown={dropDownDataCategory}
              dataLeftDropdown={dropDownDataFilter}
              data={PostlistData}
            />
          )}
        </View>
      </ScrollView>

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
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
    marginTop: heightPercentage(10),
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
