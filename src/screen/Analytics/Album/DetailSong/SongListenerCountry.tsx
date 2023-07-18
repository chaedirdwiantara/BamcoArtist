import React, {FC} from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {ListenersCountry} from '../../../../components';

interface LisstenerCountryProps {
  songId: string;
}

const SongListenerCountry: FC<LisstenerCountryProps> = (
  props: LisstenerCountryProps,
) => {
  const {songId} = props;
  const {getSongListenerCountry} = useAnalyticsHook();
  const {t} = useTranslation();

  const {data, isLoading, isError} = useQuery(
    'analytic-songListenerCountry',
    () =>
      getSongListenerCountry({
        songID: songId,
      }),
  );

  return (
    <ListenersCountry
      compTitle={t('Home.Tab.Analytic.Album.DetailSong.ListenerCountry.Title')}
      withInteraction={false}
      labelCaption={''}
      setViewAll={() => {}}
      viewAll={false}
      dataCountry={data?.data}
    />
  );
};

export default SongListenerCountry;
