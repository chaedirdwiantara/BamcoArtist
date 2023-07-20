import React from 'react';
import {TopFans} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';

const YourTopFans = () => {
  const {t} = useTranslation();

  const {getListTopFans} = useAnalyticsHook();
  const {
    data: topFansData,
    isLoading,
    isError,
  } = useQuery('fans-topFans', () =>
    getListTopFans({
      page: 1,
      perPage: 5,
    }),
  );

  return (
    <TopFans
      title={t('Home.Tab.Analytic.Fans.TopFans.Title')}
      topFansData={topFansData?.data}
      activeLink
      emptyState={t('Home.Tab.Analytic.Fans.TopFans.EmptyState')}
    />
  );
};

export default YourTopFans;
