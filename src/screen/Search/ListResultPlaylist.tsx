import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListCard} from '../../components';
import {ListDataSearchPlaylist} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';

interface ListResultPlaylistsProps {
  dataSearchPlaylists: ListDataSearchPlaylist[];
}

const ListResultPlaylists: FC<ListResultPlaylistsProps> = (
  props: ListResultPlaylistsProps,
) => {
  const {dataSearchPlaylists} = props;

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <FlatList
      data={dataSearchPlaylists}
      renderItem={({item, index}) => (
        <ListCard.MusicList
          imgUri={item.thumbnailUrl}
          musicNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicTitle={item.name}
          singerName={item.name}
          onPressMore={resultDataMore}
          containerStyles={{marginTop: mvs(20)}}
          onPressCard={() => {}}
          hideDropdownMore
        />
      )}
    />
  );
};

export default ListResultPlaylists;

const styles = StyleSheet.create({});
