import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {EmptyStateAnalytic, Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {PlayPinkIcon} from '../../../../assets/icon';
import MusiciansListCard from '../../../../components/molecule/ListCard/MusiciansListCard';
import {MusicianListData} from '../../../../data/topMusician';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';

const YourTopFans = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {getListTopFans} = useAnalyticsHook();
  const {
    data: topFansData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('fans-topFans', () =>
    getListTopFans({
      page: 1,
      perPage: 5,
    }),
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <PlayPinkIcon />
          <Gap width={12} />
          <Text style={styles.value}>
            {t('Home.Tab.Analytic.Fans.TopFans.Title')}
          </Text>
        </View>
        {topFansData?.data && topFansData?.data.length > 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('YourTopFansScreen')}>
            <Text style={styles.link}>
              {t('Home.Tab.Analytic.Fans.TopFans.Link')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Gap height={23} />
      {topFansData?.data && topFansData?.data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={topFansData?.data}
          renderItem={({item, index}) => (
            <MusiciansListCard
              musicianNum={(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              onPressMore={() => {}}
              activeMore={false}
              onPressImage={() =>
                navigation.navigate('OtherUserProfile', {id: item.uuid})
              }
              musicianName={item.fullname}
              imgUri={item.image[0].image}
              point={item.totalPoint.toString()}
              containerStyles={{marginBottom: widthResponsive(12)}}
            />
          )}
        />
      ) : (
        <EmptyStateAnalytic
          caption={t('Home.Tab.Analytic.Fans.TopFans.EmptyState')}
        />
      )}
    </View>
  );
};

export default YourTopFans;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontFamily: font.InterRegular,
    fontSize: mvs(18),
    fontWeight: '600',
    color: color.Neutral[20],
    lineHeight: mvs(28),
  },
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
});
