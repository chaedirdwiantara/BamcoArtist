import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';

import {ListItem} from './ListItem';
import TopSong from '../../ListCard/TopSong';
import {widthPercentage} from '../../../utils';
import {useSongHook} from '../../../hooks/use-song.hook';

interface ListSongProps {
  title: string;
}

export const ListSong: React.FC<ListSongProps> = ({title}) => {
  const {dataSong, getListDataSong} = useSongHook();

  useEffect(() => {
    getListDataSong({
      page: 1,
      perPage: 10,
    });
  }, []);

  const children = () => {
    return (
      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(20)}}>
          <TopSong dataSong={dataSong} onPress={() => null} loveIcon={true} />
        </View>
      </ScrollView>
    );
  };

  return <ListItem title={title} children={children()} />;
};
