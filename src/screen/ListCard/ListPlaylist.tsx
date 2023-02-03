import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {ListCard} from '../../components';
import {elipsisText, heightResponsive} from '../../utils';
import {Playlist} from '../../interface/playlist.interface';

interface ListPlaylistScreen {
  data?: Playlist[];
  onPress: (id: number) => void;
  scrollable?: boolean;
}

const ListPlaylist: FC<ListPlaylistScreen> = (props: ListPlaylistScreen) => {
  const {onPress, scrollable, data} = props;

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <ListCard.Playlist
          imgUri={item.thumbnailUrl !== null ? item.thumbnailUrl : ''}
          musicNum={index + 1}
          musicTitle={elipsisText(item.name, 22)}
          singerName={'by ' + item.playlistOwner.fullname}
          onPressCard={() => onPress(item.id)}
          containerStyles={{marginTop: mvs(20)}}
          isPublic={item.isPublic}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default ListPlaylist;
