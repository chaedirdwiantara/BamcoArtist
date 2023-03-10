import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AddSongContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSongHook} from '../../hooks/use-song.hook';
import {useBackHandler} from '../../utils/useBackHandler';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {AddSongPropsType} from '../../interface/playlist.interface';

type AddSongProps = NativeStackScreenProps<RootStackParams, 'AddSong'>;

export const AddSongScreen: React.FC<AddSongProps> = ({
  navigation,
  route,
}: AddSongProps) => {
  const [search, setSearch] = useState<string>('');
  const [trigger, setTrigger] = useState<boolean>(false);
  const {dataSong, metaSong, getListDataSong} = useSongHook();
  const {setAddSongToPlaylist} = usePlaylistHook();
  const [meta, setMeta] = useState<{page: number; perPage: number}>({
    page: 1,
    perPage: 15,
  });

  useEffect(() => {
    getListDataSong({
      playlistID: route.params.id,
      keyword: search,
      page: meta.page,
      perPage: meta.perPage,
    });
  }, [trigger, search]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  useBackHandler(() => {
    onPressGoBack();
    return true;
  });

  const onPressAddSong = (props?: AddSongPropsType) => {
    setAddSongToPlaylist(props);
    setTrigger(!trigger);
  };

  const nextPage = () => {
    getListDataSong({
      playlistID: route.params.id,
      keyword: search,
      page: meta.page,
      perPage: meta.perPage + 15,
    });
    setMeta({
      ...meta,
      perPage: meta.perPage + 15,
    });
  };

  return (
    <View style={styles.root}>
      <AddSongContent
        search={search}
        setSearch={setSearch}
        playlist={route.params}
        listSongs={dataSong.filter(val => !val.isAddedToThisPlaylist)}
        onPressGoBack={onPressGoBack}
        setAddSongToPlaylist={onPressAddSong}
        meta={metaSong || {page: 1, perPage: 15, total: 0}}
        nextPage={nextPage}
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
