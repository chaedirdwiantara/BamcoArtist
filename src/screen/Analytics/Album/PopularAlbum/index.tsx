import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DropDownFilter, Gap} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPink2Icon} from '../../../../assets/icon';
import {DataDropDownType, dropDownAlbumRange} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../../hooks/use-storage.hook';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';

const PopularAlbum = () => {
  const {getPopularAlbum} = useAnalyticsHook();
  const {t} = useTranslation();
  const lang = storage.getString('lang');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    data: popularAlbumData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-popularAlbum', () =>
    getPopularAlbum({
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
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
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
        <MusicPink2Icon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.PopularAlbum.Title')}
        </Text>
      </View>
      {/* DROPDOWN AREA */}
      <View style={styles.topContainer}>
        <DropDownFilter
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownAlbumRange}
          selectedMenu={setSelectedRange}
          leftPosition={
            lang === 'en' ? widthResponsive(-85) : widthResponsive(-85)
          }
          topPosition={widthResponsive(20)}
          containerStyle={styles.dropdownContainer}
          textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
          iconColor={color.Neutral[10]}
          dropdownStyle={styles.dropdown}
        />
        <View>
          <TouchableOpacity
            // TODO: ADD ALBUM ID
            onPress={() =>
              navigation.navigate('AlbumAnalyticScreen', {albumId: 0})
            }>
            <Text style={styles.link}>
              {t('Home.Tab.Analytic.Fans.TopFans.Link')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* BODY AREA */}
      <View style={{paddingLeft: widthResponsive(1.8)}}>
        <AlbumRow
          title={'Rafaela'}
          imgUri={
            'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gambaran-live-stream-rafaela-di-dalam-game-mobile-legends.jpg'
          }
          createdOn={'2018'}
          onPress={() => {}}
          streamCount={kFormatter(2500)}
          imgSize={80}
        />
      </View>
    </View>
  );
};

export default PopularAlbum;

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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
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
