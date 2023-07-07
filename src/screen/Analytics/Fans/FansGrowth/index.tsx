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
      {fansAnalyticData?.data && (
        <LineAreaChart
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
          selectedMenu={setSelectedRange}
          fansData={fansAnalyticData.data}
          growthDescOne={`${t('Home.Tab.Analytic.Fans.Growth.FansEarn')} ${t(
            selectedRange.label,
          )}`}
          growthDescTwo={t('Home.Tab.Analytic.Fans.Growth.BeFan')}
        />
      )}
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
