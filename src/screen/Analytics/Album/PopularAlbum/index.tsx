import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DropDownFilter, Gap} from '../../../../components';
import {widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPink2Icon} from '../../../../assets/icon';
import {DataDropDownType, dropDownFansGrowth} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../../hooks/use-storage.hook';

const PopularAlbum = () => {
  const {getPopularAlbum} = useAnalyticsHook();
  const {t} = useTranslation();
  const lang = storage.getString('lang');

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
        <MusicPink2Icon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.PopularAlbum.Title')}
        </Text>
      </View>
      {/* DROPDOWN AREA */}
      <View style={{width: 90, zIndex: 100}}>
        <DropDownFilter
          labelCaption={t(selectedRange.label)}
          dataFilter={dropDownFansGrowth}
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
      </View>
      {/* BODY AREA */}
      <View></View>
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
});
