import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {AlbumContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';

type AlbumProps = NativeStackScreenProps<RootStackParams, 'Album'>;

export const AlbumScreen: React.FC<AlbumProps> = ({
  navigation,
  route,
}: AlbumProps) => {
  const {id, type} = route.params;
  const {
    isLoadingSong,
    albumLoading,
    dataSong,
    dataDetailAlbum,
    getListDataSong,
    getDetailAlbum,
    dataSongComingSoon,
    getListSongComingSoon,
  } = useSongHook();

  useFocusEffect(
    useCallback(() => {
      if (type === 'coming_soon') {
        getListSongComingSoon({id});
      } else {
        getListDataSong({albumID: id});
      }
      getDetailAlbum({id: id.toString()});
    }, [id]),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataDetailAlbum && !albumLoading && (
        <AlbumContent
          detailAlbum={dataDetailAlbum}
          dataSong={dataSong}
          dataSongComingSoon={dataSongComingSoon}
          onPressGoBack={onPressGoBack}
          comingSoon={type === 'coming_soon'}
          isLoading={isLoadingSong}
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
