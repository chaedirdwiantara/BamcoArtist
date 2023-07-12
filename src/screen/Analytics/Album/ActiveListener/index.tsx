import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, LineAreaChart} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {Chart} from '../../../../interface/analythic.interface';
import {MusicPinkIcon} from '../../../../assets/icon';

const ActiveListener = () => {
  const {getAlbumActiveListener} = useAnalyticsHook();
  const {t} = useTranslation();

  const {
    data,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-activeListener', () =>
    getAlbumActiveListener({
      interval:
        t(selectedRange.label) === 'Monthly'
          ? 'monthly'
          : t(selectedRange.label) === 'Weekly'
          ? 'weekly'
          : t(selectedRange.label) === 'Daily'
          ? 'daily'
          : '',
    }),
  );

  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Fans.Filter.Range.Monthly',
    value: '1',
  });

  useEffect(() => {
    if (selectedRange) {
      refetch();
    }
  }, [selectedRange]);

  const albumTabData = data?.data;
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <MusicPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.Listeners.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      {albumTabData ? (
        <LineAreaChart
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
          selectedMenu={setSelectedRange}
          description={albumTabData.description}
          maxValue={albumTabData.maxValue}
          chartData={albumTabData.diagramData}
          cardOneValue={albumTabData.fansAvgStream}
          cardOneDesc={`${t(
            'Home.Tab.Analytic.Album.Listeners.Growth.AvgListener',
          )} ${t(selectedRange.label)}`}
          cardOneAvgStreamCompare={albumTabData.fansAvgStreamCompared}
          cardOneAvgProgress={albumTabData.fansAvgStreamPogress}
          cardTwoValue={albumTabData.fansStream}
          cardTwoDesc={`${t(
            'Home.Tab.Analytic.Album.Listeners.Growth.FanStream',
          )} ${t(selectedRange.label)}`}
          cardTwoAvgStreamCompare={albumTabData.fansStreamCompared}
          cardTwoAvgProgress={albumTabData.fansStreamPogress}
          type={t(selectedRange.label)}
          noOfLines={2}
        />
      ) : null}
    </View>
  );
};

export default ActiveListener;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
});
