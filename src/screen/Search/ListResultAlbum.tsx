import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListCard} from '../../components';
import {ListDataSearchAlbums} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';

interface ListResultAlbumProps {
  dataSearchAlbums: ListDataSearchAlbums[];
}

const ListResultAlbum: FC<ListResultAlbumProps> = (
  props: ListResultAlbumProps,
) => {
  const {dataSearchAlbums} = props;

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <FlatList
      data={dataSearchAlbums}
      renderItem={({item, index}) => (
        <ListCard.MusicList
          imgUri={item.imageUrl}
          musicNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicTitle={item.title}
          singerName={item.title}
          onPressMore={resultDataMore}
          containerStyles={{marginTop: mvs(20)}}
          onPressCard={() => {}}
          hideDropdownMore
        />
      )}
    />
  );
};

export default ListResultAlbum;

const styles = StyleSheet.create({});
