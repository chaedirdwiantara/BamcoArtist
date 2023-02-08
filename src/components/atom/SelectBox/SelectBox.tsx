import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Button} from '../../atom';
import Color from '../../../theme/Color';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';

interface SelectBoxProps {
  selected: number[];
  setSelected: (value: number[]) => void;
  data: PreferenceList[];
  containerStyle?: ViewStyle;
}

export const SelectBox: React.FC<SelectBoxProps> = (props: SelectBoxProps) => {
  const {selected, setSelected, data, containerStyle} = props;

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
      {data.map(val => {
        const checkVal = selected?.some(res => res === val.id);
        const activeBtn = checkVal ? Color.Pink.linear : Color.Dark[400];

        return (
          <Button
            key={val.id}
            label={val.name}
            containerStyles={{
              backgroundColor: activeBtn,
              width: undefined,
              aspectRatio: undefined,
              height: heightPercentage(35),
              paddingHorizontal: widthPercentage(10),
              marginVertical: heightPercentage(2),
              marginHorizontal: widthPercentage(2),
            }}
            onPress={() => onPressBox(val.id, checkVal)}
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
