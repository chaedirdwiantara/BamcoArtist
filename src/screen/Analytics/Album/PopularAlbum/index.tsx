import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {EmptyStateAnalytic, Gap} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPink2Icon} from '../../../../assets/icon';
import {DataDropDownType} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';

const PopularAlbum = () => {
  const {getPopularAlbum} = useAnalyticsHook();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {data, isLoading, isError, refetch} = useQuery(
    'analytic-popularAlbum',
    () => getPopularAlbum(),
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
      {/* SUBTITLE AREA */}
      <Gap height={10} />
      <View style={styles.topContainer}>
        <Text style={[styles.link, {color: color.Neutral[10]}]}>
          {t('Home.Tab.Analytic.Album.PopularAlbum.Subtitle')}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() =>
              data?.data
                ? navigation.navigate('AlbumAnalyticScreen', {
                    albumId: data.data.id,
                  })
                : {}
            }>
            <Text style={styles.link}>
              {t('Home.Tab.Analytic.Album.PopularAlbum.Link')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={10} />
      {/* BODY AREA */}
      {data?.data ? (
        <View style={{paddingLeft: widthResponsive(1.8)}}>
          <AlbumRow
            title={data.data.title}
            imgUri={data.data.albumImage[1]?.image}
            createdOn={data.data.productionYear}
            onPress={() => {}}
            streamCount={kFormatter(data.data.totalCountListener)}
            imgSize={80}
          />
        </View>
      ) : (
        <EmptyStateAnalytic
          caption={t('Home.Tab.Analytic.Album.PopularAlbum.EmptyState')}
        />
      )}
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
