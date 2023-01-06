import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {ms} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface ButtonProps {
  label: string;
  type?: string;
  borderColor?: string;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    type,
    label,
    borderColor,
    containerStyles,
    textStyles,
    disabled,
    onPress,
  } = props;

  const withBorder = type === 'border' && {
    borderWidth: ms(1),
    borderColor: borderColor ? borderColor : Color.Pink.linear,
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[styles.root, withBorder, containerStyles]}
      disabled={disabled}
      testID={'ssu-button'}
      onPress={onPress}>
      <Text style={[styles.labelStyle, textStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthPercentage(279),
    height: undefined,
    aspectRatio: heightPercentage(279 / 40),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Pink.linear,
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
