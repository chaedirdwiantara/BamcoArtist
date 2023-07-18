import React, {FC} from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {ListenersCountry} from '../../../../components';

interface AlbumListenerCountryProps {
  albumId: number;
}

const AlbumListenerCountry: FC<AlbumListenerCountryProps> = (
  props: AlbumListenerCountryProps,
) => {
  const {albumId} = props;
  const {getAlbumListenerCountry} = useAnalyticsHook();
  const {t} = useTranslation();

  const {data, isLoading, isError} = useQuery(
    'analytic-albumListenerCountry',
    () =>
      getAlbumListenerCountry({
        albumID: albumId,
        // limit: 5,
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
