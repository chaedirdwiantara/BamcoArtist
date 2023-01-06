import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {PlaylistContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';

type PlaylistProps = NativeStackScreenProps<RootStackParams, 'Playlist'>;

export const PlaylistScreen: React.FC<PlaylistProps> = ({
  navigation,
  route,
}: PlaylistProps) => {
  const {
    dataDetailPlaylist,
    dataSongsPlaylist,
    getDetailPlaylist,
    getListSongsPlaylist,
  } = usePlaylistHook();

  useFocusEffect(
    useCallback(() => {
      getDetailPlaylist({id: route.params.id});
      getListSongsPlaylist({id: route.params.id});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToEditPlaylist = () => {
    navigation.navigate('EditPlaylist', dataDetailPlaylist);
  };

  const goBackProfile = () => {
    navigation.navigate('Profile');
  };

  const goToAddSong = () => {
    navigation.navigate('AddSong');
  };

  return (
    <View style={styles.root}>
      {dataDetailPlaylist && (
        <PlaylistContent
          onPressGoBack={onPressGoBack}
          goToEditPlaylist={goToEditPlaylist}
          goBackProfile={goBackProfile}
          goToAddSong={goToAddSong}
          dataDetail={dataDetailPlaylist}
          listSongs={dataSongsPlaylist}
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
