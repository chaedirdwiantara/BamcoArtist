import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

export interface SelectDateType {
  id: number;
  name: string;
}

const DateButton = ({
  text,
  onPressSize,
  customStyle,
}: {
  text: string;
  onPressSize: () => void;
  customStyle: any;
}) => {
  return (
    <TouchableOpacity style={[styles.root, customStyle]} onPress={onPressSize}>
      <Text style={styles.labelStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const SelectDate = ({
  selected,
  data,
  onPressSize,
}: {
  selected: SelectDateType | undefined;
  data: SelectDateType[];
  onPressSize: (date: SelectDateType) => void;
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.length > 0 &&
        data?.map((date, index) => {
          return (
            <DateButton
              key={index}
              text={date.name}
              onPressSize={() => onPressSize(date)}
              customStyle={{
                marginLeft: index > 0 ? 14 : 0,
                backgroundColor:
                  selected?.id === date.id ? Color.Success[400] : '#353D4E',
              }}
            />
          );
        })}
    </ScrollView>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  root: {
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(24),
  },
  labelStyle: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
  },
});
