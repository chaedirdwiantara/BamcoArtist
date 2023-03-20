import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ListSong} from './components/Song';
import {ListAlbum} from './components/Album';
import {RootStackParams} from '../../navigations';

type ListMusicProps = NativeStackScreenProps<RootStackParams, 'ListMusic'>;

export const ListMusicScreen: React.FC<ListMusicProps> = ({
  route,
  navigation,
}: ListMusicProps) => {
  const {title, type} = route.params;

  const goToDetailAlbum = () => {
    navigation.navigate('Album', {id: 35});
  };

  if (type === 'song') {
    return <ListSong title={title} />;
  } else {
    return <ListAlbum title={title} goToDetailAlbum={goToDetailAlbum} />;
  }
};
