import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListCard} from '../../components';
import {ListDataSearchSongs} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

interface ListResultSongProps {
  dataSearchSongs: ListDataSearchSongs[];
}

const ListResultSong: FC<ListResultSongProps> = (
  props: ListResultSongProps,
) => {
  const {dataSearchSongs} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOnPress = (id: number) => {
    navigation.navigate('SongDetails', {id});
  };

  return (
    <FlatList
      data={dataSearchSongs}
      renderItem={({item, index}) => (
        <ListCard.MusicList
          imgUri={item.imageUrl}
          musicNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicTitle={item.title}
          singerName={item.musicianName}
          containerStyles={{marginTop: mvs(20)}}
          onPressCard={() => handleOnPress(item.id)}
          hideDropdownMore
        />
      )}
    />
  );
};

export default ListResultSong;

const styles = StyleSheet.create({});
