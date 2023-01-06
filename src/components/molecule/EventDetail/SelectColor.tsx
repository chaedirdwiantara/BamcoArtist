import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {normalize} from '../../../utils';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {CheckIcon} from '../../../assets/icon';

export interface SelectColorType {
  id: number;
  name: string;
}

const ColorButton = ({
  color,
  onPressColor,
  isSelected,
  customStyle,
}: {
  color: string;
  onPressColor: () => void;
  isSelected: boolean;
  customStyle: any;
}) => {
  return (
    <TouchableOpacity
      style={[styles.root, customStyle, {backgroundColor: color}]}
      onPress={onPressColor}>
      {isSelected && <CheckIcon width={30} height={30} />}
    </TouchableOpacity>
  );
};

const SelectColor = ({
  selectedColor,
  colors,
  onPressColor,
}: {
  selectedColor: SelectColorType | undefined;
  colors: SelectColorType[];
  onPressColor: (color: SelectColorType) => void;
}) => {
  return (
    <View style={styles.buttonContainer}>
      {colors?.length > 0 &&
        colors?.map((color, index) => {
          return (
            <ColorButton
              key={index}
              color={color.name}
              onPressColor={() => onPressColor(color)}
              isSelected={selectedColor?.id === color.id}
              customStyle={{
                marginLeft: index > 0 ? 14 : 0,
              }}
            />
          );
        })}
    </View>
  );
};

export default SelectColor;

const styles = StyleSheet.create({
  root: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
