import React from 'react';
import {View, Text, FlatList, ViewStyle, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {SquareImageText} from '../../atom';
import {color, font} from '../../../theme';
import HorizontalCard from './HorizontalCard';
import {DiveInType} from '../../../data/diveInList';
import {elipsisText, heightPercentage, widthPercentage} from '../../../utils';
import {ListDataSearchAlbums} from '../../../interface/search.interface';

export interface ListImageDescProps {
  title: string;
  data: ListDataSearchAlbums[] | DiveInType[] | undefined;
  onPress: () => void;
  onPressImage: (name: string) => void;
  hideArrow?: boolean;
  imageStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const ListImageDesc: React.FC<ListImageDescProps> = (
  props: ListImageDescProps,
) => {
  const {
    title,
    data,
    hideArrow,
    onPress,
    onPressImage,
    imageStyle,
    containerStyle,
  } = props;

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
            width: widthPercentage(100),
            height: widthPercentage(100),
            marginRight:
              index === data.length - 1
                ? widthPercentage(50)
                : widthPercentage(15),
            ...imageStyle,
          };

          return (
            <View key={index}>
              <SquareImageText
                imgUri={item.imageUrl[2].image}
                text={item.title || ''}
                containerStyle={style}
                imageStyle={{justifyContent: 'flex-start'}}
                textStyle={{paddingTop: heightPercentage(15)}}
                hideText={title === 'Coming Soon'}
                onPress={() => onPressImage(item.title)}
              />
              <View style={{marginTop: heightPercentage(10)}}>
                <Text style={styles.title}>{elipsisText(item.title, 15)}</Text>
                <Text
                  style={[
                    styles.subtitle,
                    {fontSize: title === '' ? mvs(10) : mvs(12)},
                  ]}>
                  {title === ''
                    ? item.description
                    : elipsisText(item.description || item.title, 15)}
                </Text>
              </View>
            </View>
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
      hideArrow={hideArrow}
      containerStyle={containerStyle}
    />
  );
};

export default ListImageDesc;

const styles = StyleSheet.create({
  title: {
    fontSize: mvs(13),
    fontFamily: font.InterMedium,
    color: color.Neutral[10],
  },
  subtitle: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    color: color.Dark[50],
  },
});
