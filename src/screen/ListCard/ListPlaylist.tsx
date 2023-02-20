import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {ListCard} from '../../components';
import {elipsisText, heightResponsive} from '../../utils';
import {Playlist} from '../../interface/playlist.interface';

interface ListPlaylistScreen {
  data?: Playlist[];
  onPress: (id: number, name: string) => void;
  scrollable?: boolean;
  withoutNum?: boolean;
}

const ListPlaylist: FC<ListPlaylistScreen> = (props: ListPlaylistScreen) => {
  const {onPress, scrollable, data, withoutNum} = props;

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <ListCard.Playlist
          imgUri={item.thumbnailUrl !== null ? item.thumbnailUrl : ''}
          musicNum={withoutNum ? '' : index + 1}
          musicTitle={elipsisText(item.name, 22)}
          singerName={'by ' + item.playlistOwner.fullname}
          onPressCard={() => onPress(item.id, item.name)}
          containerStyles={{marginTop: mvs(20)}}
          isPublic={item.isPublic}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
    />
  );
};

export default ListPlaylist;
