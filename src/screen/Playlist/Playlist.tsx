import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {PlaylistContent} from '../../components';
import {useBackHandler} from '../../utils/useBackHandler';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

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

  useFocusEffect(
    useCallback(() => {
      getDetailPlaylist({id: route.params.id});
      getListSongsPlaylist({id: route.params.id});
    }, []),
  );

  const goBackProfile = (showToast: boolean) => {
    navigation2.navigate('Profile', {deletePlaylist: showToast});
  };

  useBackHandler(() => {
    goBackProfile(false);
    return true;
  });

  const onPressGoBack = () => {
    navigation.goBack();
  };

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
