import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DropDownFilter,
  EmptyStateAnalytic,
  Gap,
  ListCard,
} from '../../../../components';
import {kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {MusicPinkIcon} from '../../../../assets/icon';
import {DataDropDownType, dropDownAlbumRange} from '../../../../data/dropdown';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../../hooks/use-storage.hook';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';

const TopSongs = () => {
  const {getTopSongs} = useAnalyticsHook();
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  const {
    data: songData,
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
          : t(selectedRange.label) === 'All Time'
          ? 'all_time'
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
      </View>
      {/* BODY AREA */}
      <View>
        {songData?.data && songData?.data.length > 0 ? (
          <>
            <AlbumRow
              title={songData.data[0].title}
              imgUri={songData.data[0].imageUrl[0].image}
              createdOn={songData.data[0].publishedDate}
              onPress={() => {}}
              LikeCount={kFormatter(songData.data[0].likesCount)}
              streamCount={kFormatter(songData.data[0].listenerCount)}
              albumTitle={songData.data[0].album.title}
              imgSize={80}
              key={-1}
            />
            {songData.data.map((item, index) =>
              index !== 0 ? (
                <ListCard.MusicList
                  imgUri={item.imageUrl[0]?.image}
                  musicNum={(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  musicTitle={item.title}
                  singerName={''}
                  likeAnalytics={item.likesCount}
                  streamAnalytics={item.listenerCount}
                  onPressMore={() => {}}
                  containerStyles={{marginTop: mvs(20)}}
                  onPressCard={() => {}}
                  hideDropdownMore
                  key={index}
                />
              ) : (
                <View />
              ),
            )}
          </>
        ) : (
          <EmptyStateAnalytic
            caption={t('Home.Tab.Analytic.Album.TopSongs.EmptyState')}
          />
        )}
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
});
