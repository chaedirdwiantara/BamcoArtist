import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AddIcon, DefaultImage} from '../../../assets/icon';
import {color} from '../../../theme';

const {width} = Dimensions.get('screen');

export interface SquareImageProps extends TouchableOpacityProps {
  imgUri?: string;
  size?: number | string;
  height?: number;
  id?: number;
  type?: string;
  containerStyle?: ViewStyle;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  blurModeOn?: boolean;
}

const SquareImage: React.FC<SquareImageProps> = (props: SquareImageProps) => {
  const {
    imgUri,
    size = width * 0.15,
    height = undefined,
    id,
    type,
    containerStyle,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    blurModeOn,
  } = props;

  const blurOp = Platform.OS === 'ios' ? 8 : 3;

  if (type === 'add') {
    return (
      <View style={[styles.root2, {width: size}]}>
        <AddIcon />
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={containerStyle} disabled={true} {...props}>
        {imgUri && imgUri !== null ? (
          <Image
            source={{uri: imgUri}}
            style={[
              styles.root,
              {
                width: size,
                height: height,
                aspectRatio: !height ? 1 / 1 : undefined,
                borderRadius: borderRadius ? borderRadius : undefined,
                borderTopLeftRadius: borderTopLeftRadius
                  ? borderTopLeftRadius
                  : undefined,
                borderTopRightRadius: borderTopRightRadius
                  ? borderTopRightRadius
                  : undefined,
                borderBottomLeftRadius: borderBottomLeftRadius
                  ? borderBottomLeftRadius
                  : undefined,
                borderBottomRightRadius: borderBottomRightRadius
                  ? borderBottomRightRadius
                  : undefined,
              },
            ]}
            testID={`Image ${id}`}
            blurRadius={blurModeOn ? blurOp : undefined}
          />
        ) : (
          <DefaultImage.SongCover width={size} height={size} />
        )}
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
