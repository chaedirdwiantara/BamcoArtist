import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EqualizerIcon} from '../../../../assets/icon';
import {EmptyStateAnalytic, Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import CountryCard from '../../../../components/molecule/CountryCard/CountryCard';

const FansCountry = () => {
  const {t} = useTranslation();
  const {getFansCountryAnalytic} = useAnalyticsHook();
  const {
    data: countryData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-fansCountry', () =>
    getFansCountryAnalytic({
      filterBy: 'country',
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
      <Gap height={22} />
      {countryData?.data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={countryData?.data}
          renderItem={({item, index}) => (
            <View
              style={{
                marginTop: index !== 0 ? widthResponsive(17) : 0,
              }}>
              <CountryCard
                countryId={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                flagUri={item.country.image}
                name={item.country.name}
                value={item.total}
              />
            </View>
          )}
        />
      ) : (
        <EmptyStateAnalytic
          caption={t('Home.Tab.Analytic.Fans.FansCountry.EmptyState')}
        />
      )}
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
