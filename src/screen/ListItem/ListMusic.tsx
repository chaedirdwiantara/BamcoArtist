import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ListSong} from './components/Song';
import {ListAlbum} from './components/Album';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {useBackHandler} from '../../utils/useBackHandler';

type ListMusicProps = NativeStackScreenProps<RootStackParams, 'ListMusic'>;

export const ListMusicScreen: React.FC<ListMusicProps> = ({
  route,
  navigation,
}: ListMusicProps) => {
  const {title, type, fromMainTab, id, filterBy} = route.params;

  const goToDetailAlbum = (idAlbum: number) => {
    navigation.navigate('Album', {id: idAlbum, type: 'coming_soon'});
  };

  const onPressHidePlayer = () => {
    storage.set('withoutBottomTab', !fromMainTab);
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
