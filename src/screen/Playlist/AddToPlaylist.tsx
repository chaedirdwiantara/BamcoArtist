import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {addSong} from '../../api/playlist.api';
import {AddToPlaylistContent} from '../../components';
import {profileStorage} from '../../hooks/use-storage.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type AddToPlaylistProps = NativeStackScreenProps<
  RootStackParams,
  'AddToPlaylist'
>;

export const AddToPlaylistScreen: React.FC<AddToPlaylistProps> = ({
  navigation,
  route,
}: AddToPlaylistProps) => {
  const {params} = route;
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  const uuid = profileStorage()?.uuid;
  const {dataPlaylist, getPlaylist} = usePlaylistHook();

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastError, setToastError] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

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
    navigation.navigate('CreateNewPlaylist', {
      id: params.id,
      type: 'song',
    });
  };

  const onPressPlaylist = async (id: number) => {
    try {
      const payload = {
        playlistId: id,
        songId: params.id[0],
      };
      if (params?.type === 'song') {
        await addSong(payload);
      }
      navigation2.navigate('Home', {showToast: true});
    } catch (error) {
      setToastVisible(true);
      setToastError(true);
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
        toastVisible={toastVisible}
        setToastVisible={setToastVisible}
        toastError={toastError}
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
