import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';

import {Gap} from '../../atom';
import {ErrorIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface dataProps {
  label: string;
  value: string | number;
}

interface InputDropdownProps {
  data: dataProps[];
  placeHolder: string;
  dropdownLabel: string;
  textTyped: (data: any) => void;
  containerStyles?: ViewStyle;
  initialValue?: string | number;
  isError?: boolean;
  errorMsg?: string;
  type?: string;
  showSearch?: boolean;
  translation?: boolean;
  disable?: boolean;
  dropdownPosition?: 'auto' | 'bottom' | 'top';
  isRequired?: boolean;
}

const borderColor = color.Dark[500];
const itemBg = color.Dark[900];
const fontColorMain = color.Neutral[10];

const InputDropdown: React.FC<InputDropdownProps> = (
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
    isError,
    errorMsg,
    type = '',
    showSearch,
    translation,
    disable,
    dropdownPosition,
    isRequired = false,
  } = props;
  const initValue = {label: initialValue, value: initialValue};

  const [value, setValue] = useState(initValue || null);
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

  const renderLabel = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={[typography.Overline, {color: color.Neutral[50]}]}>
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

  return (
    <View style={[styles.container, containerStyles]}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={translation ? dataTranslation : data}
        maxHeight={mvs(300)}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeHolder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          textTyped(item);
          setIsFocus(false);
        }}
        disable={disable}
        fontFamily={font.InterRegular}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        activeColor={color.Dark[500]}
        itemContainerStyle={[styles.itemContainer]}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        search={showSearch || type === 'location'}
        searchPlaceholder="Search..."
        inputSearchStyle={styles.inputSearchStyle}
        dropdownPosition={dropdownPosition}
      />
      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={color.Error[400]} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: ms(3),
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
    color: color.Dark[300],
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
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(20),
  },
  inputSearchStyle: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    borderColor: 'transparent',
    borderBottomColor: color.Pink[200],
  },
});
