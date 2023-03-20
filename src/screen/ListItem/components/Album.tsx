import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useQuery} from 'react-query';

import {ListItem} from './ListItem';
import TopSong from '../../ListCard/TopSong';
import {widthPercentage} from '../../../utils';
import {useSearchHook} from '../../../hooks/use-search.hook';

interface ListAlbumProps {
  title: string;
  goToDetailAlbum: () => void;
}

export const ListAlbum: React.FC<ListAlbumProps> = ({
  title,
  goToDetailAlbum,
}) => {
  const {getSearchAlbums} = useSearchHook();
  const {data: dataSearchAlbums, refetch} = useQuery(['/search-albums'], () =>
    getSearchAlbums({keyword: ''}),
  );
  useEffect(() => {
    refetch();
  }, []);

  const children = () => {
    return (
      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(20)}}>
          <TopSong
            dataSong={dataSearchAlbums?.data}
            hideDropdownMore={true}
            type="home"
            onPress={goToDetailAlbum}
          />
        </View>
      </ScrollView>
    );
  };

  return <ListItem title={title} children={children()} />;
};
