import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {widthPercentage} from '../../utils';
import {ListItem} from './components/ListItem';
import PostListHome from '../ListCard/PostList';
import {RootStackParams} from '../../navigations';
import PostListSimilar from '../ListCard/PostListSimilar';
import PostListMyArtist from '../ListCard/PostListMyArtist';
import {dropDownDataCategory, dropDownDataSort} from '../../data/dropdown';

type ListPostProps = NativeStackScreenProps<RootStackParams, 'ListPost'>;

export const ListPostScreen: React.FC<ListPostProps> = ({
  route,
}: ListPostProps) => {
  const {title} = route.params;
  const children = () => {
    return (
      <View style={{flex: 1, paddingHorizontal: widthPercentage(20)}}>
        {title === 'Trending' ? (
          <PostListHome
            dataRightDropdown={dropDownDataCategory}
            dataLeftDropdown={dropDownDataSort}
            hideDropdown={true}
          />
        ) : title === 'My Artists' ? (
          <PostListMyArtist
            dataRightDropdown={dropDownDataCategory}
            dataLeftDropdown={dropDownDataSort}
            hideDropdown={true}
          />
        ) : (
          <PostListSimilar
            dataRightDropdown={dropDownDataCategory}
            dataLeftDropdown={dropDownDataSort}
            hideDropdown={true}
          />
        )}
      </View>
    );
  };

  return <ListItem title={title} children={children()} />;
};
