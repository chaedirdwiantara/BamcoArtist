import {View} from 'react-native';
import React from 'react';
import ActiveListener from './ActiveListener';
import {Gap, ListenerLikes} from '../../../components';
import PopularAlbum from './PopularAlbum';
import TopSongs from './TopSongs';
import ListenerCountry from './ListenerCountry';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';

const AlbumAnalytic = () => {
  const {getListenerLike} = useAnalyticsHook();
  const {isLoading, isError, refetch} = useQuery('analytic-listenerLikes', () =>
    getListenerLike({
      //TODO: ADD GENRE ID TOOK FROM PROFILE STORAGE
      genreID: 4,
    }),
  );

  return (
    <View>
      <PopularAlbum />
      <Gap height={20} />
      <TopSongs />
      <Gap height={20} />
      <ActiveListener />
      <Gap height={20} />
      <ListenerCountry />
      <Gap height={20} />
      <ListenerLikes />
    </View>
  );
};

export default AlbumAnalytic;
