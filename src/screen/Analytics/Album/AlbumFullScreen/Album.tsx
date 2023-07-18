import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {MusicPink2Icon} from '../../../../assets/icon';
import {
  DropDownFilter,
  EmptyStateAnalytic,
  Gap,
  ListCard,
} from '../../../../components';
import {elipsisText, kFormatter, widthResponsive} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {DataDropDownType} from '../../../../data/dropdown';
import {profileStorage, storage} from '../../../../hooks/use-storage.hook';
import {color, font, typography} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {AlbumRow} from '../../../../components/molecule/SongDetailsContent/AlbumRow';
import {useQuery} from 'react-query';
import {useAnalyticsHook} from '../../../../hooks/use-analytics.hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {DataDetailAlbum} from '../../../../interface/song.interface';

interface AlbumProps {
  albumId: number;
}

const Album: FC<AlbumProps> = (props: AlbumProps) => {
  const {albumId} = props;
  const {t} = useTranslation();
  const uuid = profileStorage()?.uuid;
  const lang = storage.getString('lang');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {getAlbumDetail, getSongListByAlbumId, getAlbumListbyUuid} =
    useAnalyticsHook();

  //! STATE HOOK AREAS
  const [selectedAlbum, setSelectedAlbum] = useState<DataDropDownType>({
    label: 'Select Album',
    value: albumId.toString(),
  });
  const [albumDesc, setAlbumDesc] = useState<DataDetailAlbum>();

  //! QUERY AREAS
  const {data: albumDetailData, refetch: refetchAlbumDetail} = useQuery(
    'analytic-albumDetail',
    () =>
      getAlbumDetail({
        id: selectedAlbum.value,
      }),
  );

  const {data: albumListData} = useQuery('analytic-albumList', () =>
    getAlbumListbyUuid({
      uuid,
    }),
  );

  const {data: songListData, refetch: refetchSongList} = useQuery(
    'analytic-songList',
    () =>
      getSongListByAlbumId({
        albumID: Number(selectedAlbum.value),
      }),
  );

  // ! HOOK EFFECTS AREAS
  // ? set data api to state, and then use it in to component
  useEffect(() => {
    setAlbumDesc(albumDetailData?.data);
  }, [albumDetailData]);

  // ? refetch album detail & song list when user change the selected album
  useEffect(() => {
    refetchAlbumDetail();
    refetchSongList();
  }, [selectedAlbum]);

  //! VARIABLE AREAS
  const songList = songListData?.data;
  const albumList: DataDropDownType[] = albumListData?.data
    ? albumListData?.data.map(item => ({
        label: elipsisText(item.title, 11),
        value: item.id.toString(),
      }))
    : [];

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <MusicPink2Icon />
        <Gap width={10} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.MySong.Album.Title')}
        </Text>
      </View>
      {/* DROPDOWN AREA */}
      <View style={{width: widthResponsive(120), zIndex: 100}}>
        <DropDownFilter
          labelCaption={selectedAlbum.label}
          dataFilter={albumList}
          selectedMenu={setSelectedAlbum}
          leftPosition={
            lang === 'en' ? widthResponsive(-120) : widthResponsive(-120)
          }
          topPosition={widthResponsive(20)}
          containerStyle={styles.dropdownContainer}
          textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
          iconColor={color.Neutral[10]}
          dropdownStyle={styles.dropdown}
        />
      </View>
      {/* BODY AREA */}
      {albumDesc && songList ? (
        <View>
          <AlbumRow
            title={albumDesc.title}
            imgUri={albumDesc.imageUrl[1]?.image}
            createdOn={albumDesc.productionYear}
            onPress={() => {}}
            streamCount={kFormatter(albumDesc.totalCountListener)}
            imgSize={80}
          />
          <Gap height={18} />
          <View style={styles.lineStyle} />
          <Gap height={18} />
          <Text style={[typography.Heading6, styles.caption]}>Song</Text>
          {songList.map((item, index) => (
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
      ) : (
        <EmptyStateAnalytic
          caption={t('Home.Tab.Analytic.Album.PopularAlbum.EmptyState')}
        />
      )}
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
    width: widthResponsive(120),
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
