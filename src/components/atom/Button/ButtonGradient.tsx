import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ButtonGradientProps {
  label: string;
  angle?: number;
  colors?: string[];
  disabled?: boolean;
  onPress: () => void;
  textStyles?: TextStyle;
  gradientStyles?: ViewStyle;
  containerStyles?: ViewStyle;
}

export const ButtonGradient: React.FC<ButtonGradientProps> = (
  props: ButtonGradientProps,
) => {
  const {
    label,
    angle = 95.44,
    colors = ['#F98FD9', '#FF70D4'],
    disabled,
    onPress,
    textStyles,
    gradientStyles,
    containerStyles,
  } = props;

  return (
    <TouchableOpacity
      style={containerStyles}
      disabled={disabled}
      testID={'ssu-button-gradient'}
      onPress={onPress}>
      <LinearGradient
        useAngle
        colors={disabled ? [Color.Dark[50], Color.Dark[50]] : colors}
        angle={angle}
        style={[styles.gradient, gradientStyles]}>
        <Text style={[styles.text, textStyles]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: widthPercentage(279),
    height: undefined,
    aspectRatio: heightPercentage(279 / 40),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
