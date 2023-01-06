import React, {FC, useState} from 'react';
import {MusicSection} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {elipsisText, heightResponsive} from '../../utils';
import {TopSongProps} from '../../data/topSong';
import {SongList} from '../../interface/song.interface';

interface TopSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  dataSong?: SongList[];
  scrollable?: boolean;
  hideDropdownMore?: boolean;
}

const TopSong: FC<TopSongPropsScreen> = (props: TopSongPropsScreen) => {
  const {onPress, scrollable, type, hideDropdownMore, dataSong} = props;
  const [listSong, setListSong] = useState(dataSong || []);

  const onPressPlay = (item: SongList, index: number) => {
    let newList = [...listSong];
    newList = newList.map(v => ({...v, played: false}));
    newList[index].played = true;
    setListSong(newList);
    onPress(item);
  };

  return (
    <FlashList
      data={listSong}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <MusicSection
          imgUri={item.imageUrl !== null ? item.imageUrl : ''}
          musicNum={index + 1}
          musicTitle={elipsisText(item.title, 22)}
          singerName={item.musicianName}
          onPressCard={
            type === 'home' ? () => onPressPlay(item, index) : undefined
          }
          containerStyles={{marginTop: mvs(20)}}
          played={type === 'home' ? item.played : false}
          hideDropdownMore={hideDropdownMore}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default TopSong;
