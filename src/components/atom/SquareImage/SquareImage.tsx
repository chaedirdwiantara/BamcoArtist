import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
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
  darkImage?: boolean;
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
    darkImage,
  } = props;

  const blurOp = 10;

  if (type === 'add') {
    return (
      <View style={[styles.root2, {width: size}]}>
        <AddIcon />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        disabled={true}
        {...props}>
        {imgUri && imgUri !== null ? (
          darkImage ? (
            <FastImage
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
              testID={`Image ${id}`}>
              {darkImage && <View style={styles.darkImage} />}
            </FastImage>
          ) : (
            <Image
              source={{uri: imgUri}}
              style={[
                styles.root,
                {
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
          )
        ) : (
          <DefaultImage.SongCover width={size} height={size} />
        )}
      </TouchableOpacity>
    );
  }
};

export default SquareImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
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
  darkImage: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  },
});
