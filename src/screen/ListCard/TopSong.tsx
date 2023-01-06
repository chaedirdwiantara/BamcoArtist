import React, {FC} from 'react';
import {MusicSection} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {SongList} from '../../interface/song.interface';
import {elipsisText, heightResponsive} from '../../utils';

interface TopSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  dataSong?: SongList[];
  scrollable?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
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
  } = props;

  return (
    <FlashList
      data={dataSong}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <MusicSection
          imgUri={item.imageUrl !== null ? item.imageUrl : ''}
          musicNum={index + 1}
          musicTitle={elipsisText(item.title, 22)}
          singerName={item.musicianName}
          onPressCard={type === 'home' ? () => onPress(item) : undefined}
          containerStyles={{marginTop: mvs(20)}}
          played={type === 'home' ? item.played : false}
          hideDropdownMore={hideDropdownMore}
          rightIcon={rightIcon}
          rightIconComponent={rightIconComponent}
          onPressIcon={onPressIcon}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default TopSong;
