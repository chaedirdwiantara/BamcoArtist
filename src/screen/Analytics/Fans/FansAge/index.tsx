import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {Gap} from '../../../../components';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {ChartIcon} from '../../../../assets/icon';
import Diagram from './Diagram';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';

const FansAge = () => {
  const {t} = useTranslation();
  const {getFansAgeAnalytic} = useAnalyticsHook();
  const {
    data: ageData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-fansAge', () =>
    getFansAgeAnalytic({
      filterBy: 'age',
    }),
  );
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <ChartIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Fans.FansAge.Title')}
        </Text>
      </View>
      <Gap height={16} />
      {ageData?.data ? (
        ageData?.data.map((item, index) => (
          <Diagram value={item.percentage} caption={item.label} key={index} />
        ))
      ) : (
        <>
          <Diagram value={0} caption="<18" />
          <Diagram value={0} caption="18-22" />
          <Diagram value={0} caption="23-27" />
          <Diagram value={0} caption="28-34" />
        </>
      )}
    </View>
  );
};

export default FansAge;

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
