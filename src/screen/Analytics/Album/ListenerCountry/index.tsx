import React, {useEffect, useState} from 'react';
import {ListenersCountry} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {DataDropDownType, dropDownAlbumRange} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';

const ListenerCountry = () => {
  const {getListenerCountry} = useAnalyticsHook();
  const {t} = useTranslation();

  const [viewAll, setViewAll] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
    value: '1',
  });

  const {data, isLoading, isError, refetch} = useQuery(
    'analytic-listenerCountry',
    () =>
      getListenerCountry({
        interval:
          t(selectedRange.label) === 'Monthly'
            ? 'monthly'
            : t(selectedRange.label) === 'Weekly'
            ? 'weekly'
            : t(selectedRange.label) === 'Daily'
            ? 'daily'
            : t(selectedRange.label) === 'All Time'
            ? 'all_time'
            : '',
        limit: viewAll === false ? 5 : undefined,
      }),
  );
  useEffect(() => {
    if (selectedRange) {
      refetch();
    }
  }, [selectedRange]);

  useEffect(() => {
    refetch();
  }, [viewAll]);
  return (
    <ListenersCountry
      compTitle={t('Home.Tab.Analytic.Album.Listener.Title')}
      withInteraction={true}
      labelCaption={t(selectedRange.label)}
      dataFilter={dropDownAlbumRange}
      selectedMenu={setSelectedRange}
      setViewAll={setViewAll}
      viewAll={viewAll}
      dataCountry={data?.data}
    />
  );
};

export default ListenerCountry;
