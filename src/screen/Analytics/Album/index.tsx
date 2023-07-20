import {View} from 'react-native';
import React from 'react';
import ActiveListener from './ActiveListener';
import {Gap, ListenerLikes} from '../../../components';
import PopularAlbum from './PopularAlbum';
import TopSongs from './TopSongs';
import ListenerCountry from './ListenerCountry';
import {useAnalyticsHook} from '../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';
import {myIdGenreStore} from '../../../store/myIdGenre.store';
import {useTranslation} from 'react-i18next';

const AlbumAnalytic = () => {
  const {t} = useTranslation();
  const {getListenerLike} = useAnalyticsHook();
  const {idGenre} = myIdGenreStore();

  const {isLoading, isError} = useQuery('analytic-listenerLikes', () =>
    idGenre.length > 0
      ? getListenerLike({
          genreID: idGenre,
        })
      : undefined,
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
      <ListenerLikes title={t('Home.Tab.Analytic.Album.ListenerLikes.Title')} />
    </View>
  );
};

export default AlbumAnalytic;
