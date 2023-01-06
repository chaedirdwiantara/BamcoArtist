import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AddIcon} from '../../../assets/icon';
import {color} from '../../../theme';

const {width} = Dimensions.get('screen');

export interface SquareImageProps extends TouchableOpacityProps {
  imgUri?: string;
  size?: number;
  height?: number;
  id?: number;
  type?: string;
  containerStyle?: ViewStyle;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {
    imgUri,
    size = width * 0.15,
    height = undefined,
    id,
    type,
    containerStyle,
  } = props;

  if (type === 'add') {
    return (
      <View style={[styles.root2, {width: size}]}>
        <AddIcon />
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={containerStyle} disabled={true} {...props}>
        <FastImage
          source={{uri: imgUri}}
          style={[
            styles.root,
            {
              width: size,
              height: height,
              aspectRatio: !height ? 1 / 1 : undefined,
            },
          ]}
          testID={`Image ${id}`}
        />
      </TouchableOpacity>
    );
  }
};

export default SquareImage;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 4,
  },
  root2: {
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Success[400],
  },
});
