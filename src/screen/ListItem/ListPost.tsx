import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {widthPercentage} from '../../utils';
import {ListItem} from './components/ListItem';
import {RootStackParams} from '../../navigations';
import PostListPublic from '../ListCard/PostListPublic';
import PostListExclusive from '../ListCard/PostListExclusive';
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
          <PostListPublic
            dataRightDropdown={dropDownDataCategory}
            dataLeftDropdown={dropDownDataSort}
          />
        ) : (
          <PostListExclusive
            dataRightDropdown={dropDownDataCategory}
            dataLeftDropdown={dropDownDataSort}
          />
        )}
      </View>
    );
  };

  return <ListItem title={title} children={children()} />;
};
