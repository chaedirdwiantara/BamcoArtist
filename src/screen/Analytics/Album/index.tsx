import {View} from 'react-native';
import React from 'react';
import ActiveListener from './ActiveListener';
import {Gap} from '../../../components';
import PopularAlbum from './PopularAlbum';
import TopSongs from './TopSongs';
import ListenerCountry from './ListenerCountry';
import ListenerLikes from './ListenerLikes';

const AlbumAnalytic = () => {
  return (
    <View>
      <ActiveListener />
      <Gap height={20} />
      <PopularAlbum />
      <Gap height={20} />
      <TopSongs />
      <Gap height={20} />
      <ListenerCountry />
      <Gap height={20} />
      <ListenerLikes />
    </View>
  );
};

export default AlbumAnalytic;
