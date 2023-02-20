import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {MainTabParams, RootStackParams} from '../../navigations';
import {AddToPlaylistContent} from '../../components';
import {profileStorage} from '../../hooks/use-storage.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {addSongToPlaylist} from '../../api/playlist.api';

export const AddToPlaylistScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  const uuid = profileStorage()?.uuid;
  const {dataPlaylist, getPlaylist} = usePlaylistHook();

  useFocusEffect(
    useCallback(() => {
      if (uuid) {
        getPlaylist({uuid});
      }
    }, [uuid]),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToCreatePlaylist = () => {
    navigation.navigate('CreateNewPlaylist');
  };

  const onPressPlaylist = async (id: number) => {
    try {
      await addSongToPlaylist({playlistReferenceId: id});
      navigation2.navigate('Home', {showToast: true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <AddToPlaylistContent
        dataPlaylist={dataPlaylist}
        onPressGoBack={onPressGoBack}
        goToCreatePlaylist={goToCreatePlaylist}
        pressAddToPlaylist={onPressPlaylist}
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
