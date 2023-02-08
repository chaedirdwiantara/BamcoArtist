import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {EditPlaylistContent} from '../../components';
import {useBackHandler} from '../../utils/useBackHandler';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {removeSongFromPlaylist} from '../../api/playlist.api';

type EditPlaylistProps = NativeStackScreenProps<
  RootStackParams,
  'EditPlaylist'
>;

export const EditPlaylist: React.FC<EditPlaylistProps> = ({
  navigation,
  route,
}: EditPlaylistProps) => {
  const {dataSongsPlaylist, getListSongsPlaylist} = usePlaylistHook();
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');

  useEffect(() => {
    getListSongsPlaylist({id: route.params.id});
  }, [toastVisible]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onPressRemoveSong = async (songId: number, songName: string) => {
    try {
      const payload = {
        playlistId: route.params.id,
        songId,
      };
      await removeSongFromPlaylist(payload);
      setToastVisible(true);
      setToastText(songName + ' have been removed!');
    } catch (error) {
      console.log(error);
    }
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  useBackHandler(() => {
    onPressGoBack();
    return true;
  });

  const goToPlaylist = (param: any) => {
    navigation.navigate('Playlist', {...param});
  };

  return (
    <View style={styles.root}>
      <EditPlaylistContent
        playlist={route.params}
        listSongs={dataSongsPlaylist}
        onPressGoBack={onPressGoBack}
        goToPlaylist={goToPlaylist}
        toastVisible={toastVisible}
        setToastVisible={setToastVisible}
        onPressRemoveSong={onPressRemoveSong}
        toastText={toastText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
