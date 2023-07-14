import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BlitzIcon} from '../../../../assets/icon';
import {Gap, LineAreaChart} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';

const FansGrowth = () => {
  const {getListDataFansAnalytic} = useAnalyticsHook();
  const {t} = useTranslation();

  const {
    data,
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

  const fansAnalyticData = data?.data;

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
      {fansAnalyticData ? (
        <LineAreaChart
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
          selectedMenu={setSelectedRange}
          description={fansAnalyticData.description}
          maxValue={fansAnalyticData.maxValue}
          chartData={fansAnalyticData.data}
          cardOneValue={fansAnalyticData.fansEarn}
          cardOneDesc={`${t('Home.Tab.Analytic.Fans.Growth.FansEarn')} ${t(
            selectedRange.label,
          )}`}
          cardOneAvgStreamCompare={fansAnalyticData.fansEarnCompare}
          cardOneAvgProgress={fansAnalyticData.fansEarnProgress}
          cardTwoValue={fansAnalyticData.beFan}
          cardTwoDesc={`${t('Home.Tab.Analytic.Fans.Growth.BeFan')} ${t(
            selectedRange.label,
          )}`}
          cardTwoAvgStreamCompare={fansAnalyticData.beFanCompare}
          cardTwoAvgProgress={fansAnalyticData.beFanProgress}
          type={t(selectedRange.label)}
        />
      ) : null}
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
