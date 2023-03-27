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
  // TODO: Need to be wired with API song by mood / genre & unreleased album
  const {title, type, fromMainTab} = route.params;

  const goToDetailAlbum = () => {
    navigation.navigate('Album', {id: 35});
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
        title={title}
        fromMainTab={fromMainTab}
        onPressHidePlayer={onPressHidePlayer}
      />
    );
  } else {
    return <ListAlbum title={title} goToDetailAlbum={goToDetailAlbum} />;
  }
};
