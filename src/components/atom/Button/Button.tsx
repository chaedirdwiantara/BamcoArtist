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
import {color} from '../../../theme';
import Gap from '../Gap/Gap';

interface ButtonProps {
  label: string;
  type?: string;
  borderColor?: string;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  disabled?: boolean;
  onPress?: () => void;
  typeOfButton?: 'withIcon' | undefined;
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.labelStyle, textStyles]}>{label}</Text>
        {typeOfButton === 'withIcon' && (
          <View style={{flexDirection: 'row'}}>
            <Gap width={4} />
            <ChevronDownIcon width={16} height={16} stroke={color.Pink[200]} />
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
    backgroundColor: Color.Pink.linear,
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
