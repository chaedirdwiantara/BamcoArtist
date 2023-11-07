import {View} from 'react-native';
import React from 'react';
import ActiveListener from './ActiveListener';
import {Gap, ListenerLikes, StepCopilot} from '../../../components';
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
      <StepCopilot
        children={<PopularAlbum />}
        order={20}
        name={t('Coachmark.PopularAlbum')}
        text={t('Coachmark.SubtitlePopularAlbum')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<TopSongs />}
        order={21}
        name={t('Coachmark.TopSong')}
        text={t('Coachmark.SubtitleTopSong')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<ActiveListener />}
        order={22}
        name={t('Coachmark.ActiveListener')}
        text={t('Coachmark.SubtitleActiveListener')}
      />
      <Gap height={20} />
      <StepCopilot
        children={<ListenerCountry />}
        order={23}
        name={t('Coachmark.ListenerCountry')}
        text={t('Coachmark.SubtitleListenerCountry')}
      />
      <Gap height={20} />
      <StepCopilot
        children={
          <ListenerLikes
            title={t('Home.Tab.Analytic.Album.ListenerLikes.Title')}
          />
        }
        order={24}
        name={t('Coachmark.ListenerAlsoLike')}
        text={t('Coachmark.SubtitleListenerAlsoLike')}
      />
    </View>
  );
};

export default AlbumAnalytic;
