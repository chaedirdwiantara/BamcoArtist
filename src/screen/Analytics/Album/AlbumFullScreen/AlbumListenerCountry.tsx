import React from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {ListenersCountry} from '../../../../components';

const AlbumListenerCountry = () => {
  const {getAlbumListenerCountry} = useAnalyticsHook();
  const {t} = useTranslation();

  const {data, isLoading, isError} = useQuery(
    'analytic-albumListenerCountry',
    () =>
      getAlbumListenerCountry({
        //TODO: CHANGE DUMMY ALBUM ID
        albumID: 4,
        limit: 5,
      }),
  );

  return (
    <ListenersCountry
      compTitle={t('Home.Tab.Analytic.Album.MySong.ListenerCountry.Title')}
      withInteraction={false}
      labelCaption={''}
      setViewAll={() => {}}
      viewAll={false}
      dataCountry={data?.data}
    />
  );
};

export default AlbumListenerCountry;
