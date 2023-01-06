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
import {color} from '../../theme';

const {width} = Dimensions.get('screen');

export interface SquareImageProps extends TouchableOpacityProps {
  imgUri?: string;
  size?: number;
  height?: number;
  id?: number;
  containerStyle?: ViewStyle;
}

const SquareComp: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {
    imgUri,
    size = width * 0.15,
    height = undefined,
    id,
    containerStyle,
  } = props;

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
};

export default SquareComp;

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
  },
  root2: {
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Success[400],
  },
});
