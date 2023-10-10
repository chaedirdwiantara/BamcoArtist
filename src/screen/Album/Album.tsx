import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {AlbumContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';
import {usePlayerStore} from '../../store/player.store';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

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
      if (type === 'coming_soon') {
        getListSongComingSoon({id});
      } else {
        getListDataSong({albumID: id});
      }
      getDetailAlbum({id: id.toString()});
    }, [id]),
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
          dataSongComingSoon={dataSongComingSoon}
          onPressGoBack={onPressGoBack}
          comingSoon={type === 'coming_soon'}
          isLoading={isLoadingSong}
        />
      )}

      <ModalLoading visible={albumLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
