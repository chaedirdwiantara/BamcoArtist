import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {ms} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {ChevronDownIcon} from '../../../assets/icon';
import Gap from '../Gap/Gap';

interface ButtonProps {
  label: string;
  type?: string;
  borderColor?: string;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle | undefined;
  disabled?: boolean;
  onPress?: () => void;
  typeOfButton?: 'withIcon' | undefined;
  iconColor?: string;
  iconSize?: number;
  gapTextToIcon?: number;
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
    typeOfButton,
    iconColor = Color.Pink[200],
    gapTextToIcon,
    iconSize,
  } = props;

  const withBorder = type === 'border' && {
    borderWidth: ms(1),
    borderColor: borderColor ? borderColor : Color.Success[400],
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[styles.root, withBorder, containerStyles]}
      disabled={disabled}
      testID={'ssu-button'}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.labelStyle, textStyles]}>{label}</Text>
        {typeOfButton === 'withIcon' && (
          <View style={{flexDirection: 'row'}}>
            <Gap width={gapTextToIcon ?? 4} />
            <ChevronDownIcon
              width={iconSize ?? 16}
              height={iconSize ?? 16}
              stroke={iconColor}
            />
          </View>
        )}
      </View>
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
    backgroundColor: Color.Success[400],
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
