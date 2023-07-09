import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChartPieIcon} from '../../../../assets/icon';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import GenderPercent from './GenderPercentage';
import {PieChart} from 'react-native-gifted-charts';

const FansGender = () => {
  const {t} = useTranslation();
  const {getFansGenderAnalytic} = useAnalyticsHook();
  const {
    data: genderData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-fansGender', () =>
    getFansGenderAnalytic({
      filterBy: 'gender',
    }),
  );

  const pieData = [
    {value: genderData?.data.data[0].percentage ?? 0, color: color.Pink[500]},
    {value: genderData?.data.data[1].percentage ?? 0, color: color.Pink[700]},
    {value: genderData?.data.data[2].percentage ?? 0, color: color.Pink[600]},
  ];

  const pieEmpty = [{value: 100, color: color.Dark[10]}];

  const PieChild = () => {
    return (
      <View style={styles.pieContainer}>
        <Text style={styles.pieTextOne}>From</Text>
        <Text style={styles.pieTextTwo}>{genderData?.data.totalFans}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <ChartPieIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Fans.FansGender.Title')}
        </Text>
      </View>
      <View style={styles.chartBigContainer}>
        <PieChart
          donut
          innerRadius={80}
          data={genderData?.data.totalFans !== 0 ? pieData : pieEmpty}
          backgroundColor={color.Dark[700]}
          centerLabelComponent={() => {
            return <PieChild />;
          }}
        />
      </View>
      {/* <Gap height={16} /> */}
      <GenderPercent
        bgColor={
          genderData?.data.totalFans !== 0 ? color.Pink[500] : color.Dark[10]
        }
        caption={`${pieData[0].value}% Male`}
      />
      <Gap height={12} />
      <GenderPercent
        bgColor={
          genderData?.data.totalFans !== 0 ? color.Pink[700] : color.Dark[10]
        }
        caption={`${pieData[1].value}% Female`}
      />
      <Gap height={12} />
      <GenderPercent
        bgColor={
          genderData?.data.totalFans !== 0 ? color.Pink[600] : color.Dark[10]
        }
        caption={`${pieData[2].value}% Undisclose`}
      />
    </View>
  );
};

export default FansGender;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
    backgroundColor: color.Dark[700],
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
  chartBigContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: widthResponsive(20),
    paddingLeft: widthResponsive(20),
  },
  pieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieTextOne: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '500',
    color: color.Neutral[10],
    lineHeight: mvs(23),
  },
  pieTextTwo: {
    fontFamily: font.InterRegular,
    fontSize: mvs(30),
    fontWeight: '600',
    color: color.Neutral[10],
    lineHeight: mvs(45),
  },
});
