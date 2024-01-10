import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  TabFilter,
  Gap,
  ListImageDesc,
  EmptyStateHome,
  StepCopilot,
} from '../../../components';
import ListPlaylistHome from '../../../components/molecule/ListCard/ListPlaylistHome';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import NewSong from '../../ListCard/NewSong';
import TopSong from '../../ListCard/TopSong';
import {mvs} from 'react-native-size-matters';
import {font} from '../../../theme';
import Color from '../../../theme/Color';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQuery} from 'react-query';
import {useHomeHook} from '../../../hooks/use-home.hook';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {useSearchHook} from '../../../hooks/use-search.hook';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {useSongHook} from '../../../hooks/use-song.hook';
import {storage} from '../../../hooks/use-storage.hook';
import {SongList} from '../../../interface/song.interface';
import {RootStackParams} from '../../../navigations';
import {useEventHook} from '../../../hooks/use-event.hook';
import EventList from '../../ListCard/EventList';

interface ExploreProps {
  refreshing: boolean;
}

const Explore = (props: ExploreProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {refreshing} = props;

  const {dataAlbumComingSoon, getListComingSoon} = useHomeHook();
  const {showPlayer, showMiniPlayerOnly, addPlaylistNewVer, addPlaylist} =
    usePlayerHook();
  const {
    isLoadingSong,
    dataTopSong,
    dataNewSong,
    getListDataTopSong,
    getListDataNewSong,
  } = useSongHook();
  const {listMood, getListMoodPublic, listGenre, getListGenrePublic} =
    useSettingHook();
  const {getSearchPlaylists} = useSearchHook();

  const isLogin = storage.getBoolean('isLogin');
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);

  const {data: dataPlaylist, refetch: refetchPlaylist} = useQuery(
    ['/search-playlist'],
    () => getSearchPlaylists({keyword: ''}),
  );

  useEffect(() => {
    listMood.length === 0 && getListMoodPublic();
    listGenre.length === 0 && getListGenrePublic();
    refetchPlaylist();
    getListComingSoon();
  }, [refreshing]);

  // Triggering when click love on the same song in top & new song tab
  useFocusEffect(
    useCallback(() => {
      if (selectedIndexSong === 0) {
        getListDataTopSong();
      } else {
        getListDataNewSong();
      }
    }, [refreshing, selectedIndexSong]),
  );

  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
  }, [toastVisible]);

  const [filterSong] = useState([
    {filterName: 'Home.Tab.TopSong.Title'},
    {filterName: 'Home.Tab.NewSong.Title'},
  ]);

  const filterDataSong = (item: any, index: any) => {
    setSelectedIndexSong(index);
  };

  const onPressTopSong = (val: SongList) => {
    addPlaylist({dataSong: dataTopSong, playSongId: val.id, isPlay: true});
    showPlayer();
    // TODO: DISCUSS ABOUT IT LATER
    // addPlaylistNewVer({dataSong: val, isPlay: true});
    // showMiniPlayerOnly();
  };

  const onPressNewSong = (val: SongList) => {
    addPlaylist({dataSong: dataNewSong, playSongId: val.id, isPlay: true});
    showPlayer();
    // TODO: DISCUSS ABOUT IT LATER
    // addPlaylistNewVer({dataSong: val, isPlay: true});
    // showMiniPlayerOnly();
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

  return (
    <>
      {/* Coming Soon */}
      {dataAlbumComingSoon.length > 0 ? (
        <StepCopilot
          children={
            <ListImageDesc
              title={t('Home.ComingSoon.Title')}
              data={dataAlbumComingSoon}
              containerStyle={styles.containerList}
              onPress={() => goToListMusic('Coming Soon', 'album')}
              onPressImage={(name, id) => goToDetailAlbum(name, id)}
            />
          }
          order={26}
          name={t('Coachmark.ComingSoon')}
          text={t('Coachmark.SubtitleComingSoon')}
        />
      ) : null}
      <Gap height={heightPercentage(20)} />
      {/* End of Coming Soon */}
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
      <Gap height={heightPercentage(20)} />

      {/* Playlist */}
      {/* {dataPlaylist?.data && dataPlaylist?.data.length > 0 ? (
        <StepCopilot
          children={
            <ListPlaylistHome
              title={t('Home.Playlist.Title')}
              data={dataPlaylist?.data}
              onPress={() => navigation.navigate('ListPlaylist')}
            />
          }
          order={29}
          name={t('Coachmark.Playlist')}
          text={t('Coachmark.SubtitlePlaylist')}
        />
      ) : null} */}
      {/* End of Playlist */}

      <Gap height={heightPercentage(40)} />
    </>
  );
};

export default Explore;

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
