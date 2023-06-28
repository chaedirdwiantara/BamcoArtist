import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';

import {MusicSection} from '../../components';
import {DataDropDownType} from '../../data/dropdown';
import {useSongHook} from '../../hooks/use-song.hook';
import {SongList} from '../../interface/song.interface';
import {elipsisText, widthResponsive} from '../../utils';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {ListDataSearchSongs} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';

interface TopSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  dataSong?: SongList[] | ListDataSearchSongs[];
  scrollable?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: number) => void;
  activeOpacity?: number;
  loveIcon?: boolean;
  newDataMore?: DataDropDownType[];
  newOnPressMore?: (data: DataDropDownType, item: SongList) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  fromMainTab?: boolean;
  isLoading?: boolean;
}

const TopSong: FC<TopSongPropsScreen> = (props: TopSongPropsScreen) => {
  const {t} = useTranslation();
  const {
    onPress,
    type,
    hideDropdownMore,
    dataSong,
    rightIcon,
    rightIconComponent,
    onPressIcon,
    activeOpacity,
    loveIcon,
    newDataMore,
    newOnPressMore,
    fromMainTab,
    isLoading,
  } = props;
  const {currentTrack, isPlaying, addSong} = usePlayerHook();
  const {setLikeSong, setUnlikeSong} = useSongHook();

  const [listSong, setListSong] = useState<SongList[] | ListDataSearchSongs[]>(
    dataSong ?? [],
  );

  const likeOnPress = async (index: number, isLiked?: boolean) => {
    isLiked ? await setUnlikeSong({id: index}) : await setLikeSong({id: index});
    if (listSong !== undefined && listSong !== null) {
      const newList = listSong.map(val => ({
        ...val,
        isLiked: val.id === index ? !val.isLiked : val.isLiked,
      }));

      return setListSong(newList as SongList[] | ListDataSearchSongs[]);
    }
  };

  useEffect(() => {
    if (dataSong !== undefined) {
      setListSong(dataSong);
    }
  }, [dataSong]);

  const newListSong =
    type === 'defaultPlaylist'
      ? (listSong as any).filter((val: {isLiked: string}) => val.isLiked)
      : listSong;

  return newListSong && newListSong.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: newListSong?.length > 5 ? widthResponsive(24) : 0,
        paddingLeft: widthResponsive(24),
        width: newListSong?.length > 5 ? 'auto' : '100%',
      }}>
      <View
        style={{
          marginRight: ms(20),
          flex: 1,
          width: newListSong?.length > 5 ? widthResponsive(255) : '100%',
        }}>
        {newListSong?.map((item: SongList, index: number) => {
          if (index <= 4) {
            return (
              <MusicSection
                key={item.id}
                imgUri={item.imageUrl && item.imageUrl[0]?.image}
                musicNum={index + 1}
                musicTitle={elipsisText(item.title, 22)}
                singerName={item.musicianName}
                onPressCard={
                  type === 'home' || type === 'defaultPlaylist'
                    ? () => onPress(item)
                    : undefined
                }
                played={
                  type === 'home' || type === 'defaultPlaylist'
                    ? isPlaying && item.id === currentTrack?.id
                    : false
                }
                containerStyles={{
                  marginTop: mvs(12),
                }}
                hideDropdownMore={hideDropdownMore}
                rightIcon={rightIcon}
                rightIconComponent={rightIconComponent}
                onPressIcon={() => onPressIcon && onPressIcon(item.id)}
                activeOpacity={activeOpacity}
                loveIcon={loveIcon}
                likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                isLiked={item.isLiked}
                onPressAddToQueue={() => addSong(item)}
                songId={item.id}
                newDataMore={newDataMore}
                newOnPressMore={data =>
                  newOnPressMore && newOnPressMore(data, item)
                }
                fromMainTab={fromMainTab}
                singerId={item.musicianUUID}
              />
            );
          }
        })}
      </View>
      {newListSong?.length > 5 && (
        <View style={{width: widthResponsive(255)}}>
          {newListSong?.map((item: SongList, index: number) => {
            if (index > 4 && index < 10) {
              return (
                <MusicSection
                  key={item.id}
                  imgUri={item.imageUrl && item.imageUrl[0]?.image}
                  musicNum={index + 1}
                  musicTitle={elipsisText(item.title, 22)}
                  singerName={item.musicianName}
                  onPressCard={
                    type === 'home' || type === 'defaultPlaylist'
                      ? () => onPress(item)
                      : undefined
                  }
                  played={
                    type === 'home' || type === 'defaultPlaylist'
                      ? isPlaying && item.id === currentTrack?.id
                      : false
                  }
                  containerStyles={{
                    marginTop: mvs(12),
                  }}
                  hideDropdownMore={hideDropdownMore}
                  rightIcon={rightIcon}
                  rightIconComponent={rightIconComponent}
                  onPressIcon={() => onPressIcon && onPressIcon(item.id)}
                  activeOpacity={activeOpacity}
                  loveIcon={loveIcon}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  isLiked={item.isLiked}
                  onPressAddToQueue={() => addSong(item)}
                  songId={item.id}
                  newDataMore={newDataMore}
                  newOnPressMore={data =>
                    newOnPressMore && newOnPressMore(data, item)
                  }
                  fromMainTab={fromMainTab}
                  singerId={item.musicianUUID}
                />
              );
            }
          })}
        </View>
      )}
    </ScrollView>
  ) : isLoading ? (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: mvs(20),
      }}>
      <LoadingSpinner />
    </View>
  ) : (
    <EmptyStateSongMusician
      text={t('Home.Song.EmptyState', {title: 'Top Song'})}
    />
  );
};

export default TopSong;
