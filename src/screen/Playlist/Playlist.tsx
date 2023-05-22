import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {PlaylistContent} from '../../components';
import {DefaultPlaylist} from './DefaultPlaylist';
import {SongList} from '../../interface/song.interface';
import {useBackHandler} from '../../utils/useBackHandler';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {MainTabParams, RootStackParams} from '../../navigations';
import {profileStorage, storage} from '../../hooks/use-storage.hook';

type PlaylistProps = NativeStackScreenProps<RootStackParams, 'Playlist'>;

export const PlaylistScreen: React.FC<PlaylistProps> = ({
  navigation,
  route,
}: PlaylistProps) => {
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {
    dataDetailPlaylist,
    dataSongsPlaylist,
    getDetailPlaylist,
    getListSongsPlaylist,
  } = usePlaylistHook();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
    setPauseSong,
    setPlaySong,
  } = usePlayerHook();

  const isFocused = useIsFocused();
  const [fetchListSong, setFetchListSong] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getDetailPlaylist({id: route.params.id});
      storage.set('withoutBottomTab', true);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getListSongsPlaylist({id: route.params.id});
    }, [fetchListSong]),
  );

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isPlaying]);

  const goBackProfile = (showToast: boolean) => {
    if (route.params.from === 'other') {
      navigation.goBack();
    } else {
      storage.set('withoutBottomTab', false);
      setTimeout(() => {
        navigation2.navigate('Profile', {deletePlaylist: showToast});
      }, 500);
    }
  };

  useBackHandler(() => {
    goBackProfile(false);
    return true;
  });

  const goToEditPlaylist = () => {
    if (dataDetailPlaylist !== undefined) {
      navigation.navigate('EditPlaylist', dataDetailPlaylist);
    }
  };

  const goToAddSong = () => {
    if (dataDetailPlaylist !== undefined) {
      navigation.navigate('AddSong', dataDetailPlaylist);
    }
  };

  const goToAlbum = (id: number) => {
    navigation.navigate('Album', {id});
  };

  const goToDetailSong = (songId: number) => {
    navigation.navigate('ShowCredit', {songId});
  };

  const goToProfile = (uuid: string, type: string) => {
    if (uuid === profileStorage()?.uuid) {
      navigation2.navigate('Profile', {});
    } else {
      if (type === 'fans') {
        navigation.push('OtherUserProfile', {id: uuid});
      } else {
        navigation.push('MusicianProfile', {id: uuid});
      }
    }
  };

  const goToAddToPlaylist = (songId: number) => {
    navigation.navigate('AddToPlaylist', {
      id: [songId],
      type: 'song',
    });
  };

  const onPressSong = (val: SongList | null) => {
    addPlaylist({
      dataSong: dataSongsPlaylist !== undefined ? dataSongsPlaylist : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const handlePlayPaused = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const listSongPlaylist =
    dataSongsPlaylist !== undefined ? dataSongsPlaylist : [];
  const isDefault = dataDetailPlaylist?.isDefaultPlaylist;

  return (
    <View style={styles.root}>
      {dataDetailPlaylist && !isDefault && (
        <PlaylistContent
          goToEditPlaylist={goToEditPlaylist}
          goBackProfile={val =>
            route.params.from === 'other'
              ? navigation.goBack()
              : goBackProfile(val)
          }
          goToAddSong={goToAddSong}
          dataDetail={dataDetailPlaylist}
          listSongs={listSongPlaylist}
          onPressSong={onPressSong}
          playerVisible={playerVisible}
          isPlaying={isPlaying}
          handlePlayPaused={handlePlayPaused}
          playlistId={route.params.id}
          setFetchListSong={() => setFetchListSong(!fetchListSong)}
          goToAlbum={goToAlbum}
          goToDetailSong={goToDetailSong}
          goToAddToPlaylist={goToAddToPlaylist}
          otherPlaylist={route.params?.from === 'other'}
          goToProfile={goToProfile}
        />
      )}

      {isDefault && (
        <DefaultPlaylist
          listSong={listSongPlaylist}
          onPressSong={onPressSong}
          playerVisible={playerVisible}
          onPressGoBack={() => goBackProfile(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
