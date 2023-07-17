import {StyleSheet, View} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../../../utils';
import {color} from '../../../../theme';
import {TopFans, TopNavigation} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useQuery} from 'react-query';

const YourTopFansScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {getListTopFans} = useAnalyticsHook();
  const {
    data: topFansData,
    isLoading: queryDataLoading,
    isError,
  } = useQuery('fans-topFansFullScreen', () => getListTopFans());
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={`${t('Home.Tab.Analytic.Fans.TopFans.FullScreen')}`}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
        containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: color.Dark[400],
        }}
      />
      <View style={styles.bodyContainer}>
        <TopFans
          title={t('Home.Tab.Analytic.Fans.TopFans.FullScreen')}
          topFansData={topFansData?.data}
          emptyState={t('Home.Tab.Analytic.Fans.TopFans.EmptyState')}
        />
      </View>
    </View>
  );
};

export default YourTopFansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    margin: widthResponsive(20),
  },
});
