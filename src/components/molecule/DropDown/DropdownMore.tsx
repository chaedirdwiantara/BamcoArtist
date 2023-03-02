import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';

import {Gap} from '../../atom';
import {normalize} from '../../../utils';
import {color, font} from '../../../theme';
import {DataDropDownType} from '../../../data/dropdown';

interface dataProps {
  label: string;
  value?: string;
}

interface DropdownMoreProps {
  data: dataProps[];
  selectedMenu: (data: DataDropDownType) => void;
  containerStyle?: ViewStyle;
  iconFill?: string;
  iconStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  idComment?: string;
  selectedIdComment?: (idComment: string) => void;
  translation?: boolean;
  sizeIcon?: number;
}

const itemBg = color.Dark[900];

const DropdownMore: React.FC<DropdownMoreProps> = (
  props: DropdownMoreProps,
) => {
  const {t} = useTranslation();
  const {
    data,
    selectedMenu,
    containerStyle,
    iconFill,
    iconStyle,
    dropdownStyle,
    idComment,
    selectedIdComment,
    translation,
    sizeIcon,
  } = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dataTranslation, setDataTranslation] = useState<dataProps[]>([]);

  let setTranslation: dataProps[] = [];
  useEffect(() => {
    data.map((item: dataProps) => {
      setTranslation.push({
        label: t(item.label),
        value: item.value,
      });
    });
    setDataTranslation(setTranslation);
  }, []);

  const newSizePointIcon = sizeIcon ? sizeIcon : 2.5;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          dropdownStyle,
          isFocus && {borderColor: color.Success[500]},
        ]}
        containerStyle={[styles.containerStyle, containerStyle]}
        selectedTextStyle={styles.fontAll}
        itemTextStyle={styles.fontAll}
        itemContainerStyle={[styles.itemContainer]}
        data={translation ? dataTranslation : data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          selectedMenu(item);
          setIsFocus(false);
          selectedIdComment && idComment && selectedIdComment(idComment);
        }}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        activeColor={itemBg}
        renderRightIcon={() => (
          <View
            style={[
              {
                paddingHorizontal: 8,
                paddingVertical: 3,
              },
              iconStyle,
            ]}>
            <View
              style={{
                width: newSizePointIcon,
                height: newSizePointIcon,
                borderRadius: 50,
                backgroundColor: iconFill ? iconFill : color.Neutral[10],
              }}></View>
            <Gap height={newSizePointIcon} />
            <View
              style={{
                width: newSizePointIcon,
                height: newSizePointIcon,
                borderRadius: 50,
                backgroundColor: iconFill ? iconFill : color.Neutral[10],
              }}></View>
            <Gap height={newSizePointIcon} />
            <View
              style={{
                width: newSizePointIcon,
                height: newSizePointIcon,
                borderRadius: 50,
                backgroundColor: iconFill ? iconFill : color.Neutral[10],
              }}></View>
          </View>
        )}
      />
    </View>
  );
};

export default DropdownMore;

const styles = StyleSheet.create({
  container: {},
  // Dropdown first view
  dropdown: {
    // paddingHorizontal: 8,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
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
});
