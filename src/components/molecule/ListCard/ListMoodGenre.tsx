import React from 'react';
import {FlatList, ViewStyle} from 'react-native';

import {SquareImageText} from '../../atom';
import HorizontalCard from './HorizontalCard';
import {heightPercentage, widthPercentage} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';

export interface ListMoodGenreProps {
  title: string;
  data: PreferenceList[];
  onPress: () => void;
  onPressImage: (id: number, name: string) => void;
  imageStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const ListMoodGenre: React.FC<ListMoodGenreProps> = (
  props: ListMoodGenreProps,
) => {
  const {title, data, onPress, onPressImage, imageStyle, containerStyle} =
    props;

  const children = () => {
    return (
      <FlatList
        data={data ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{paddingLeft: widthPercentage(24)}}
        renderItem={({item, index}) => {
          const style = {
            width: widthPercentage(120),
            height: heightPercentage(40),
            marginRight:
              index === data.length - 1
                ? widthPercentage(50)
                : widthPercentage(15),
            ...imageStyle,
          };

          return (
            <SquareImageText
              key={index}
              imgUri={item.imageUrls[1].image}
              text={item.name}
              containerStyle={style}
              onPress={() => onPressImage(item.id, item.name)}
            />
          );
        }}
      />
    );
  };

  return (
    <HorizontalCard
      title={title}
      children={children()}
      onPress={onPress}
      containerStyle={containerStyle}
    />
  );
};

export default ListMoodGenre;
