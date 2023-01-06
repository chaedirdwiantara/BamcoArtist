import React, {useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {HomeIcon, ThreeDotsIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {normalize, widthPercentage} from '../../../utils';

interface dataProps {
  label: string;
  value?: string;
}

interface DropdownMoreProps {
  data: dataProps[];
  selectedMenu: (data: any) => void;
  containerStyle?: ViewStyle;
}

const itemBg = color.Dark[900];

const DropdownMore: React.FC<DropdownMoreProps> = (
  props: DropdownMoreProps,
) => {
  const {data, selectedMenu, containerStyle} = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: color.Success[500]}]}
        containerStyle={[styles.containerStyle, containerStyle]}
        selectedTextStyle={styles.fontAll}
        itemTextStyle={styles.fontAll}
        itemContainerStyle={[styles.itemContainer]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          selectedMenu(item);
          setIsFocus(false);
        }}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        activeColor={color.Dark[500]}
        renderLeftIcon={() => (
          <ThreeDotsIcon fill={color.Neutral[10]} style={{marginLeft: -5}} />
        )}
      />
    </View>
  );
};

export default DropdownMore;

const styles = StyleSheet.create({
  container: {
    width: widthPercentage(15),
  },
  // Dropdown first view
  dropdown: {
    // paddingHorizontal: 8,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
    // marginLeft: widthPercentage(-57),
  },
  // Item container in modal container
  itemContainer: {
    height: mvs(47),
    backgroundColor: itemBg,
    borderColor: itemBg,
  },
  placeholderStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[50],
  },
  fontAll: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
    tintColor: color.Pink[200],
  },
});
