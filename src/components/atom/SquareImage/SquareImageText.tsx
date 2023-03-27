import React from 'react';
import {
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

export interface SquareImageProps {
  text: string;
  imgUri: string;
  onPress: () => void;
  hideText?: boolean;
  textStyle?: TextStyle;
  imageStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const SquareImageText: React.FC<SquareImageProps> = (
  props: SquareImageProps,
) => {
  const {
    imgUri,
    text,
    hideText,
    textStyle,
    imageStyle,
    containerStyle,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <ImageBackground
        source={{uri: imgUri}}
        resizeMode="cover"
        imageStyle={{borderRadius: 4}}
        style={[styles.image, imageStyle]}>
        {!hideText && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SquareImageText;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(12),
    color: color.Neutral[10],
    textAlign: 'center',
  },
});
