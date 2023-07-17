import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {MusicPink2Icon} from '../../../../assets/icon';
import {DropDownFilter, Gap, ListCard} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {DataDropDownType, dropDownAlbumRange} from '../../../../data/dropdown';
import {storage} from '../../../../hooks/use-storage.hook';
import {color, font, typography} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {songs2} from '../../../../data/music2';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';

const Album = () => {
  const {t} = useTranslation();
  const {getAlbumSongs} = useAnalyticsHook();
  const {
    data: popularAlbumData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('analytic-albumSongs', () =>
    getAlbumSongs({
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
    value: '1',
  });
  const lang = storage.getString('lang');
  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <MusicPink2Icon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.MySong.Album.Title')}
        </Text>
      </View>
      {/* DROPDOWN AREA */}
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
      {/* BODY AREA */}
      <View>
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
        <Gap height={18} />
        <View style={styles.lineStyle} />
        <Gap height={18} />
        <Text style={[typography.Heading6, styles.caption]}>Song</Text>
        {songs2.map((item, index) => (
          <ListCard.MusicList
            imgUri={item.url}
            musicNum={(index + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            musicTitle={item.title}
            singerName={''}
            likeAnalytics={item.likes}
            streamAnalytics={item.stream}
            onPressMore={() => {}}
            containerStyles={{marginTop: mvs(20)}}
            //TODO: CHANGE ID TO CORRECT ONE LATER
            onPressCard={() =>
              navigation.navigate('SongDetailAnalytic', {
                songId: item.id.toString(),
              })
            }
            hideDropdownMore
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default Album;

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
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
  caption: {
    color: color.Neutral[10],
  },
  lineStyle: {
    borderWidth: 0.6,
    borderColor: color.Dark[400],
  },
});
