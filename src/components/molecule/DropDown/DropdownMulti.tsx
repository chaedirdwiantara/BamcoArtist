import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {MultiSelect} from 'react-native-element-dropdown';

import {CheckBox, Gap} from '../../atom';
import {CloseCircleIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {heightPercentage, widthPercentage} from '../../../utils';

export interface dataProps {
  label: string;
  value: number;
}

interface InputDropdownProps {
  data: dataProps[];
  placeHolder: string;
  dropdownLabel: string;
  textTyped: (data: any) => void;
  containerStyles?: ViewStyle;
  initialValue?: (string | number | undefined)[] | null;
  setValues: (val: number[]) => void;
  disable?: boolean;
  isRequired?: boolean;
}

const borderColor = color.Dark[500];
const itemBg = color.Dark[900];
const fontColorMain = color.Neutral[10];

const MultiDropdown: React.FC<InputDropdownProps> = (
  props: InputDropdownProps,
) => {
  const {t} = useTranslation();
  const {
    initialValue,
    data,
    placeHolder,
    dropdownLabel,
    textTyped,
    containerStyles,
    setValues,
    disable,
    isRequired = false,
  } = props;

  const [value, setValue] = useState(initialValue ?? []);

  const isSelected = (item: any) => {
    return value.find(val => item.value === val) ? true : false;
  };

  const renderLabel = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            typography.Overline,
            {
              color: color.Neutral[50],
              paddingLeft: Platform.OS === 'ios' ? 0 : widthPercentage(4),
            },
          ]}>
          {dropdownLabel}
        </Text>
        {isRequired && (
          <Text style={[typography.Overline, {color: color.Pink[200]}]}>
            {' *' + t('General.Required')}
          </Text>
        )}
      </View>
    );
  };

  const renderItem = (item: any, selected?: boolean) => {
    let selectedValue = [...value];
    const newVal = selected
      ? selectedValue.filter(val => val !== item.value)
      : [...selectedValue, item.value];

    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <CheckBox
          handleOnPress={() => {
            setValue(newVal);
            textTyped(newVal);
            setValues(newVal);
          }}
          active={isSelected(item)}
        />
      </View>
    );
  };

  const renderSelectedItem = (item: any, unSelect?: (item: any) => void) => {
    return (
      <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
        <View style={styles.badgeContainer}>
          <Text style={styles.textStyle}>{item.label}</Text>
          <Gap width={widthPercentage(5)} />
          <CloseCircleIcon style={styles.closeIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <View style={[styles.container, containerStyles]}>
      {renderLabel()}
      <MultiSelect
        search
        searchPlaceholder="Search..."
        style={[styles.dropdown]}
        containerStyle={styles.containerStyle}
        placeholderStyle={{
          fontSize: mvs(13),
          color: color.Neutral[10],
          paddingLeft: Platform.OS === 'ios' ? 0 : mvs(4),
        }}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={mvs(300)}
        labelField="label"
        valueField="value"
        placeholder={placeHolder}
        value={value}
        disable={disable}
        onChange={item => {
          setValue(item);
          textTyped(item);
          setValues(item);
        }}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        activeColor={color.Dark[500]}
        itemContainerStyle={[styles.itemContainer]}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        renderSelectedItem={renderSelectedItem}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MultiDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  // Dropdown first view
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    paddingVertical:
      Platform.OS === 'ios' ? heightPercentage(4) : heightPercentage(8),
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  // Item container in modal container
  itemContainer: {
    height: mvs(53),
    borderWidth: 0,
    backgroundColor: itemBg,
  },
  placeholderStyle: {
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
  selectedTextStyle: {
    fontSize: mvs(13),
    color: fontColorMain,
  },
  itemTextStyle: {
    fontSize: mvs(13),
    color: fontColorMain,
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(18),
  },
  inputSearchStyle: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    borderColor: 'transparent',
    borderBottomColor: color.Pink[200],
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: widthPercentage(6),
    backgroundColor: color.Dark[400],
    borderRadius: 2,
    marginRight: widthPercentage(7),
    marginTop: widthPercentage(7),
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: ms(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
  },
  closeIcon: {
    width: widthPercentage(20),
    height: widthPercentage(20),
  },
});
