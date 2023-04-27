import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Button} from '../../atom';
import Color from '../../../theme/Color';
import {ListDonateType} from '../../../data/listDonate';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface SelectBoxProps {
  selected: string;
  setSelected: (value: string) => void;
  data: ListDonateType[];
  containerStyle?: ViewStyle;
  boxStyle?: ViewStyle;
  activeColor?: string;
}

export const SelectBoxTip: React.FC<SelectBoxProps> = (
  props: SelectBoxProps,
) => {
  const {selected, setSelected, data, containerStyle, boxStyle, activeColor} =
    props;
  const active = activeColor ? activeColor : Color.Success[400];

  return (
    <View style={[styles.root, containerStyle]}>
      {data.map(item => {
        const activeBtn = selected === item.value ? active : Color.Dark[600];
        const btnStyle = {
          backgroundColor: activeBtn,
          width: undefined,
          aspectRatio: undefined,
          height: heightPercentage(42),
          paddingHorizontal: widthPercentage(10),
          marginVertical: heightPercentage(5),
          marginRight: widthPercentage(10),
          ...boxStyle,
        };

        return (
          <Button
            key={item.text}
            label={item.text}
            containerStyles={btnStyle}
            onPress={() => setSelected(item.value)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
