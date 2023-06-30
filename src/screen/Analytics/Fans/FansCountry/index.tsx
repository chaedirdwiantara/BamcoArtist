import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EqualizerIcon} from '../../../../assets/icon';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';

const FansCountry = () => {
  const {t} = useTranslation();
  const {getFansCountryAnalytic} = useAnalyticsHook();
  const {
    data: fansCountryData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-fansCountry', () =>
    getFansCountryAnalytic({
      page: 1,
      perPage: 5,
    }),
  );
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <EqualizerIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Fans.FansCountry.Title')}
        </Text>
      </View>
      <Gap height={16} />
    </View>
  );
};

export default FansCountry;

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
