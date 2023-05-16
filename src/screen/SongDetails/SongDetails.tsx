import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {SongDetailsContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type SongDetailProps = NativeStackScreenProps<RootStackParams, 'SongDetails'>;

export const SongDetailsScreen: React.FC<SongDetailProps> = ({
  route,
}: SongDetailProps) => {
  const {songId} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  const {dataDetailSong, getDetailSong} = useSongHook();
  const [showModalNotAvail, setShowModalNotAvail] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getDetailSong({id: songId});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToShowCredit = () => {
    navigation.navigate('ShowCredit', {songId});
  };

  const goToMusicianProfile = (uuid: string) => {
    if (uuid) {
      if (uuid === profileStorage()?.uuid) {
        navigation2.navigate('Profile', {});
      } else {
        navigation.push('MusicianProfile', {id: uuid});
      }
    } else {
      setShowModalNotAvail(true);
    }
  };

  const goToAlbum = (id: number) => {
    navigation.push('Album', {id});
  };

  const goToAddToPlaylist = () => {
    navigation.navigate('AddToPlaylist', {
      id: [songId],
      type: 'song',
      fromMainTab: false,
    });
  };

  return (
    <View style={styles.root}>
      {dataDetailSong && (
        <SongDetailsContent
          onPressGoBack={onPressGoBack}
          goToShowCredit={goToShowCredit}
          dataDetail={dataDetailSong}
          goToMusicianProfile={goToMusicianProfile}
          showModalNotAvail={showModalNotAvail}
          closeModalNotAvail={() => setShowModalNotAvail(false)}
          goToAlbum={goToAlbum}
          goToAddToPlaylist={goToAddToPlaylist}
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
