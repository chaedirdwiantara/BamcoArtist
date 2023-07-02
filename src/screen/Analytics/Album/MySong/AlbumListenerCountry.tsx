import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {storage} from '../../../../hooks/use-storage.hook';
import {useQuery} from 'react-query';
import {EqualizerIcon} from '../../../../assets/icon';
import {Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {MerchListItem} from '../../../../data/merchList';
import CountryCard from '../../../../components/molecule/CountryCard/CountryCard';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';

const AlbumListenerCountry = () => {
  const {getAlbumListenerCountry} = useAnalyticsHook();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const lang = storage.getString('lang');

  const {
    data: listenerCountryData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-albumListenerCountry', () =>
    getAlbumListenerCountry({}),
  );

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <EqualizerIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.MySong.ListenerCountry.Title')}
        </Text>
      </View>

      {/* BODY AREA */}
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={MerchListItem}
          renderItem={({item, index}) => (
            <View
              style={{
                marginTop:
                  index !== 0 ? widthResponsive(17) : widthResponsive(18),
              }}>
              <CountryCard
                countryId={item.id}
                flagUri={item.image}
                name={item.owner}
                value={item.price}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AlbumListenerCountry;

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
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
});
