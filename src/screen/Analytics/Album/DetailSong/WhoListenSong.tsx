import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {Chart} from '../../../../interface/analythic.interface';
import {MusicPinkIcon} from '../../../../assets/icon';
import {Gap, LineAreaChart} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';

const WhoListenSong = () => {
  const {getWhoListenSong} = useAnalyticsHook();
  const {t} = useTranslation();

  const {
    data: whoListenData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-whoListenSong', () =>
    getWhoListenSong({
      interval:
        t(selectedRange.label) === 'Monthly'
          ? 'monthly'
          : t(selectedRange.label) === 'Weekly'
          ? 'weekly'
          : t(selectedRange.label) === 'Daily'
          ? 'daily'
          : '',
      //TODO: UNCOMMENT AFTER WE GET SONG ID
      //songID:idSong
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

  const fansData: Chart = {
    maxValue: 100,
    beFan: '75%',
    beFanCompare: '4%',
    beFanProgress: 'improve',
    fansEarn: '25%',
    fansEarnCompare: '2%',
    fansEarnProgress: 'regression',
    description: 'Last 4 months',
    data: [
      {
        value: 0,
        hideDataPoint: true,
        label: 'Jan',
      },
      {
        value: 23,
        hideDataPoint: true,
        label: 'Feb',
      },
      {
        value: 75,
        hideDataPoint: true,
        label: 'Mar',
      },
      {
        value: 65,
        hideDataPoint: true,
        label: 'Apr',
      },
      {
        value: 40,
        hideDataPoint: true,
        label: 'Mei',
      },
      {
        value: 96,
        hideDataPoint: true,
        label: 'Jun',
      },
    ],
  };
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <MusicPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.DetailSong.WhoListen.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      <LineAreaChart
        labelCaption={t(selectedRange.label)}
        dataFilter={dropDownFansGrowth}
        selectedMenu={setSelectedRange}
        fansData={fansData}
        growthDescOne={`${t(
          'Home.Tab.Analytic.Album.Listeners.Growth.FanStream',
        )} ${t(selectedRange.label)}`}
        growthDescTwo={`${t(
          'Home.Tab.Analytic.Album.Listeners.Growth.AvgListener',
        )} ${t(selectedRange.label)}`}
        type={t(selectedRange.label)}
        noOfLines={2}
      />
    </View>
  );
};

export default WhoListenSong;

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
