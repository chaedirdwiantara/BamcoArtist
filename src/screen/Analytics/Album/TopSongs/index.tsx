import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DropDownFilter, Gap, ListCard} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPinkIcon} from '../../../../assets/icon';
import {DataDropDownType, dropDownAlbumRange} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../../hooks/use-storage.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {songs2} from '../../../../data/music2';

const TopSongs = () => {
  const {getTopSongs} = useAnalyticsHook();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const lang = storage.getString('lang');

  const {
    data: popularAlbumData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-topSongs', () =>
    getTopSongs({
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
        <MusicPinkIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.TopSongs.Title')}
        </Text>
      </View>
      {/* DROPDOWN AREA */}
      <View style={styles.topArea}>
        <View style={{width: 90, zIndex: 100}}>
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
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('YourTopFansScreen')}>
            <Text style={styles.link}>
              {t('Home.Tab.Analytic.Fans.TopFans.Link')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* BODY AREA */}
      <View>
        <AlbumRow
          title={'Rafaela'}
          imgUri={
            'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gambaran-live-stream-rafaela-di-dalam-game-mobile-legends.jpg'
          }
          createdOn={'2018'}
          onPress={() => {}}
          LikeCount={kFormatter(1500)}
          streamCount={kFormatter(2500)}
          imgSize={80}
        />
        {/* <Gap height={20} /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={songs2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <ListCard.MusicList
              imgUri={item.url}
              musicNum={(index + 2).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              musicTitle={item.title}
              singerName={''}
              likeAnalytics={item.likes}
              streamAnalytics={item.stream}
              onPressMore={() => {}}
              containerStyles={{marginTop: mvs(20)}}
              onPressCard={() => {}}
              hideDropdownMore
            />
          )}
        />
      </View>
    </View>
  );
};

export default TopSongs;

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
