import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ListSong} from './components/Song';
import {ListAlbum} from './components/Album';
import {RootStackParams} from '../../navigations';
import {useBackHandler} from '../../utils/useBackHandler';
import {useFocusEffect} from '@react-navigation/native';
import {usePlayerStore} from '../../store/player.store';

type ListMusicProps = NativeStackScreenProps<RootStackParams, 'ListMusic'>;

export const ListMusicScreen: React.FC<ListMusicProps> = ({
  route,
  navigation,
}: ListMusicProps) => {
  const {title, type, fromMainTab, id, filterBy} = route.params;

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const goToDetailAlbum = (idAlbum: number) => {
    navigation.navigate('Album', {id: idAlbum, type: 'coming_soon'});
  };

  const onPressHidePlayer = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  useBackHandler(() => {
    onPressHidePlayer();
    return true;
  });

  if (type === 'song') {
    return (
      <ListSong
        id={id}
        title={title}
        filterBy={filterBy}
        fromMainTab={fromMainTab}
        onPressHidePlayer={onPressHidePlayer}
      />
    );
  } else {
    return <ListAlbum title={title} goToDetailAlbum={goToDetailAlbum} />;
  }
};
