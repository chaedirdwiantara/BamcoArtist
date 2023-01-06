import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Gap} from '../../atom';
import {widthPercentage} from '../../../utils';
import {color, typography} from '../../../theme';

interface RadioButtonProps {
  text: string;
  size?: number;
  selected?: boolean;
  onPress: () => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  text = '',
  size = widthPercentage(16),
  selected,
  onPress,
}) => {
  const newBorderColor = selected ? color.Success[500] : color.Dark[300];

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View
        style={[
          styles.circleOutside,
          {width: size, borderColor: newBorderColor},
        ]}>
        {selected ? (
          <View style={[styles.circleInside, {width: size / 2}]} />
        ) : null}
      </View>
      <Gap width={widthPercentage(8)} />
      <Text style={[typography.Subtitle2, {color: color.Neutral[10]}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleOutside: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: color.Dark[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInside: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
    backgroundColor: color.Success[500],
  },
});
