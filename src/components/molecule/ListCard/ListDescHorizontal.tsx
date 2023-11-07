import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Gap, SquareImageText} from '../../atom';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

export interface ListDescHorizontalProps {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ViewStyle;
}

const ListDescHorizontal: FC<ListDescHorizontalProps> = (
  props: ListDescHorizontalProps,
) => {
  const {title, description, image, onPress, containerStyle, imageStyle} =
    props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, containerStyle]}>
      <SquareImageText
        imgUri={image || ''}
        text={title || ''}
        containerStyle={imageStyle}
        textStyle={{paddingTop: widthResponsive(15)}}
        hideText={title === 'Coming Soon'}
        onPress={() => {}}
      />
      <Gap width={16} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {fontSize: title === '' ? mvs(10) : mvs(12)},
          ]}
          numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListDescHorizontal;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: mvs(13),
    fontFamily: font.InterRegular,
    color: color.Neutral[10],
    fontWeight: '700',
  },
  subtitle: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    color: color.Dark[50],
    fontWeight: '400',
  },
});
