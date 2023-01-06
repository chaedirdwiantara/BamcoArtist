import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Button} from '../../atom';
import Color from '../../../theme/Color';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface SelectBoxProps {
  selected: number[];
  setSelected: (value: number[]) => void;
  favorites: string[];
  containerStyle?: ViewStyle;
}

export const SelectBox: React.FC<SelectBoxProps> = (props: SelectBoxProps) => {
  const {selected, setSelected, favorites, containerStyle} = props;
  const onPressBox = (val: number, checkVal: boolean) => {
    let newArr = [...selected];
    const oldIndexValue = newArr.indexOf(val);
    if (checkVal) {
      newArr.splice(oldIndexValue, 1);
      setSelected(newArr);
    } else {
      if (selected?.length > 4) {
        setSelected([...newArr.slice(1, 5), val]);
      } else {
        setSelected([...newArr, val]);
      }
    }
  };

  return (
    <View style={[styles.root, containerStyle]}>
      {favorites.map((val, i) => {
        const checkVal = selected?.some(res => res === i + 1);
        const activeBtn = checkVal ? Color.Pink.linear : Color.Dark[400];

        return (
          <Button
            key={i}
            label={val}
            containerStyles={{
              backgroundColor: activeBtn,
              width: undefined,
              aspectRatio: undefined,
              height: heightPercentage(35),
              paddingHorizontal: widthPercentage(10),
              marginVertical: heightPercentage(2),
              marginHorizontal: widthPercentage(2),
            }}
            onPress={() => onPressBox(i + 1, checkVal)}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(12),
  },
  title: {
    color: Color.Neutral[10],
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
