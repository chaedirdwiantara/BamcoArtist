import {View} from 'react-native';
import React from 'react';
import ActiveListener from './ActiveListener';
import {Gap} from '../../../components';
import PopularAlbum from './PopularAlbum';
import TopSongs from './TopSongs';
import ListenerCountry from './ListenerCountry';
import ListenerLikes from './ListenerLikes';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';

const AlbumAnalytic = () => {
  const {getListenerLike} = useAnalyticsHook();

  const {data, isLoading, isError, refetch} = useQuery(
    'analytic-listenerLikes',
    () =>
      getListenerLike({
        //TODO: ADD GENRE ID TOOK FROM PROFILE STORAGE
        genreID: 4,
        perPage: 1,
      }),
  );

  const LikesData = data?.data;

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
