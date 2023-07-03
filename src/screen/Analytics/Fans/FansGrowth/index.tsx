import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BlitzIcon} from '../../../../assets/icon';
import {Gap, LineAreaChart} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {storage} from '../../../../hooks/use-storage.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Chart} from '../../../../interface/analythic.interface';

const FansGrowth = () => {
  const {getListDataFansAnalytic} = useAnalyticsHook();
  const {t} = useTranslation();

  const {
    data: fansAnalyticData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-analytic', () =>
    getListDataFansAnalytic({
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
        <BlitzIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Fans.Main.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      <LineAreaChart
        labelCaption={t(selectedRange.label)}
        dataFilter={dropDownFansGrowth}
        selectedMenu={setSelectedRange}
        fansData={fansData}
        growthDescOne={t('Home.Tab.Analytic.Fans.Growth.BeFan')}
        growthDescTwo={t('Home.Tab.Analytic.Fans.Growth.FansEarn')}
      />
    </View>
  );
};

export default FansGrowth;

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
