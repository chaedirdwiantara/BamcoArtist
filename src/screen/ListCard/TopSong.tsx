import React, {FC, useEffect, useState} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';

import {MusicSection} from '../../components';
import {DataDropDownType} from '../../data/dropdown';
import {useSongHook} from '../../hooks/use-song.hook';
import {SongList} from '../../interface/song.interface';
import {elipsisText, heightResponsive} from '../../utils';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {ListDataSearchSongs} from '../../interface/search.interface';

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
  newOnPressMore?: (data: DataDropDownType) => void;
}

const TopSong: FC<TopSongPropsScreen> = (props: TopSongPropsScreen) => {
  const {
    onPress,
    scrollable,
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
  } = props;
  const {currentTrack, isPlaying, addSong} = usePlayerHook();
  const {setLikeSong, setUnlikeSong} = useSongHook();

  const [listSong, setListSong] = useState(dataSong);

  const likeOnPress = (index: number, isLiked?: boolean) => {
    if (listSong !== undefined && listSong !== null) {
      const newList = listSong.map(val => ({
        ...val,
        isLiked: val.id === index ? !val.isLiked : val.isLiked,
      }));

      setListSong(newList);
    }

    isLiked ? setUnlikeSong({id: index}) : setLikeSong({id: index});
  };

  useEffect(() => {
    if (dataSong !== undefined) {
      setListSong(dataSong);
    }
  }, [dataSong]);

  const newListSong =
    type === 'defaultPlaylist'
      ? listSong?.filter((val: {isLiked: string}) => val.isLiked)
      : listSong;

  return (
    <FlashList<SongList | ListDataSearchSongs>
      data={newListSong}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <MusicSection
          imgUri={item.imageUrl[0]?.image ?? ''}
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
            marginTop: mvs(20),
            marginBottom: index + 1 === dataSong?.length ? mvs(20) : 0,
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
          newOnPressMore={newOnPressMore}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
      extraData={[currentTrack, isPlaying]}
    />
  );
};

export default TopSong;
