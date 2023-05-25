import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {AlbumContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';
import {usePlayerStore} from '../../store/player.store';

type AlbumProps = NativeStackScreenProps<RootStackParams, 'Album'>;

export const AlbumScreen: React.FC<AlbumProps> = ({
  navigation,
  route,
}: AlbumProps) => {
  const {
    albumLoading,
    dataSong,
    dataDetailAlbum,
    getListDataSong,
    getDetailAlbum,
  } = useSongHook();

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useFocusEffect(
    useCallback(() => {
      getListDataSong({albumID: route.params.id});
      getDetailAlbum({id: route.params.id.toString()});
    }, [route.params.id]),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataDetailAlbum && !albumLoading && (
        <AlbumContent
          detailAlbum={dataDetailAlbum}
          dataSong={dataSong}
          onPressGoBack={onPressGoBack}
          comingSoon={route.params.type === 'coming_soon'}
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
