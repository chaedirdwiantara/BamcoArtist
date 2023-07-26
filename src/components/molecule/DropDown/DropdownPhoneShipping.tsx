import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInputProps,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SsuInput} from '../../atom/InputText/SsuInput';
import {color, font, typography} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import SearchBar from '../../atom/SearchBar';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Gap from '../../atom/Gap/Gap';
import {ErrorIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {Dropdown} from 'react-native-element-dropdown';

interface CountryData {
  value: string;
  label: string;
  image: string;
  code: string;
}
interface SelectCountryProps extends TextInputProps {
  countryData: CountryData[];
  numberTyped: (data: any) => void;
  isError?: boolean;
  errorMsg?: string;
  isFocus?: boolean;
  onSelectCountry: (data: string) => void;
  type?: 'label' | 'input';
  labelText?: string;
  valuePrefix?: string;
}

const itemBg = color.Dark[700];
const fontColorMain = color.Neutral[10];

const DropdownPhoneShipping: FC<SelectCountryProps> = (
  props: SelectCountryProps,
) => {
  const {
    countryData,
    numberTyped,
    isError,
    errorMsg,
    isFocus,
    onChangeText,
    value: valueNumber,
    onSelectCountry,
    type = 'input',
    labelText,
    valuePrefix,
  } = props;
  const {t} = useTranslation();
  const [data, setData] = useState<CountryData[]>([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<CountryData[]>([]);
  const [value, setValue] = useState<CountryData>();
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setData(countryData);
    setFullData(countryData);
    if (valuePrefix) {
      const selectedCountry = countryData.filter(
        val => val.code === valuePrefix,
      );
      const newVal =
        selectedCountry.length > 0 ? selectedCountry[0] : countryData[0];
      setValue(newVal);
    } else {
      setValue(countryData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contains = ({label}: any, queries: any) => {
    if (label.toLowerCase().includes(queries)) {
      return true;
    }
    return false;
  };

  const handleSearch = (text: any) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter((user: any) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
    setShowIcon(true);
  };

  const onReset = () => {
    setQuery('');
    setShowIcon(false);
    setData(countryData);
  };

  const countryOnPress = (item: CountryData) => {
    setValue(item);
    onSelectCountry(item.code);
  };

  const onEndEditing = () => {
    console.log('pressed end editing');
  };

  const renderItem = (item: any) => {
    return (
      <View style={stylesDropdown.item}>
        <View style={styles.countryListContainer}>
          <Image source={item.image} style={styles.imageStyle} />
          <Gap width={4} />
          <Text style={styles.listFont}>{item.label}</Text>
        </View>
        <Text style={styles.listFont}>{item.code}</Text>
      </View>
    );
  };

  const renderInputSearch = () => {
    return (
      <View style={{paddingHorizontal: widthPercentage(12), marginBottom: 10}}>
        <SearchBar
          style={{height: 28}}
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          rightIcon={showIcon}
          reset={onReset}
          onEndEditing={onEndEditing}
        />
      </View>
    );
  };

  if (type === 'input') {
    return (
      <View
        style={{
          height: mvs(42),
          width: '100%',
          marginBottom: isError ? mvs(18.7) : undefined,
        }}>
        <SsuInput.InputText
          value={valueNumber}
          onChangeText={onChangeText}
          placeholder={t('SignUp.Phone') || ''}
          keyboardType={'number-pad'}
          fontSize={mvs(12)}
          onEndEditing={() => numberTyped(value?.code)}
          leftIconContainer={{
            width: widthResponsive(55),
            marginLeft: widthResponsive(-12),
            marginRight:
              value && value?.code.length > 2
                ? widthResponsive(30)
                : value && value?.code.length <= 2
                ? widthResponsive(22)
                : widthResponsive(8),
          }}
          isError={isError}
          errorMsg={errorMsg}
          isFocus={isFocus}
          leftIcon={
            <View style={styles.leftIconContainer}>
              <Text style={styles.leftLabel}>{value?.label}</Text>
              <Dropdown
                style={stylesDropdown.dropdown}
                containerStyle={[stylesDropdown.containerStyle]}
                placeholderStyle={stylesDropdown.placeholderStyle}
                selectedTextStyle={stylesDropdown.fontAll}
                itemTextStyle={stylesDropdown.fontAll}
                itemContainerStyle={[stylesDropdown.itemContainer]}
                iconStyle={stylesDropdown.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => {
                  countryOnPress(item);
                }}
                fontFamily={font.InterRegular}
                showsVerticalScrollIndicator={false}
                autoScroll={false}
                activeColor={color.Dark[500]}
                renderInputSearch={renderInputSearch}
                search
                renderItem={renderItem}
                dropdownPosition={'bottom'}
              />
              <Text style={styles.selectedCountryCode}>{value?.code}</Text>
            </View>
          }
          {...props}
        />
      </View>
    );
  }

  return (
    <>
      {labelText && (
        <Text
          style={[
            typography.Overline,
            {color: isError ? Color.Error[400] : Color.Neutral[50]},
            stylesLabel.label,
          ]}>
          {labelText}
        </Text>
      )}
      <View
        style={{
          height: mvs(42),
          flexDirection: 'row',
        }}>
        <View
          style={[
            stylesLabel.leftIconContainer,
            {
              borderBottomColor: isError
                ? Color.Error[400]
                : isFocus
                ? Color.Pink[200]
                : Color.Dark[500],
            },
          ]}>
          <View style={styles.leftIconContainer}>
            <Dropdown
              style={stylesLabel.dropdown}
              containerStyle={[stylesDropdown.containerStyle]}
              placeholderStyle={stylesDropdown.placeholderStyle}
              selectedTextStyle={stylesDropdown.fontAll}
              itemTextStyle={stylesDropdown.fontAll}
              itemContainerStyle={[stylesDropdown.itemContainer]}
              iconStyle={stylesLabel.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={value}
              onChange={item => {
                countryOnPress(item);
              }}
              fontFamily={font.InterRegular}
              showsVerticalScrollIndicator={false}
              autoScroll={false}
              activeColor={color.Dark[500]}
              renderInputSearch={renderInputSearch}
              search
              renderItem={renderItem}
              dropdownPosition={'bottom'}
            />
            <Text style={stylesLabel.selectedCountryCode}>{value?.code}</Text>
          </View>
        </View>
        <Gap width={widthResponsive(15)} />
        <SsuInput.InputLabel
          {...props}
          containerInputStyles={{
            width: widthResponsive(275),
            borderBottomColor: isError
              ? Color.Error[400]
              : isFocus
              ? Color.Pink[200]
              : Color.Dark[500],
          }}
          value={valueNumber}
          onChangeText={onChangeText}
          placeholder={t('SignUp.Phone') || ''}
          keyboardType={'number-pad'}
          onEndEditing={() => numberTyped(value?.code)}
          isError={false}
          errorMsg={errorMsg}
          isFocus={isFocus}
          isPhone
        />
      </View>
      {errorMsg ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={Color.Error[400]} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}
    </>
  );
};

export default DropdownPhoneShipping;

const styles = StyleSheet.create({
  leftIconContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectCountryContainer: {
    flexDirection: 'row',
    backgroundColor: color.Dark[700],
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  leftLabel: {
    color: color.Neutral[10],
    alignSelf: 'center',
    fontFamily: font.InterLight,
    fontSize: mvs(12),
    fontWeight: '400',
    position: 'absolute',
    left: '20%',
    zIndex: 2,
  },
  selectedCountryCode: {
    color: color.Neutral[10],
    fontWeight: '400',
    fontFamily: font.InterLight,
    fontSize: mvs(12),
    marginLeft: ms(4),
  },
  modalContainer: {
    backgroundColor: color.Dark[700],
    paddingVertical: mvs(8),
    paddingHorizontal: ms(8),
    borderRadius: 5,
    height: mvs(200),
  },
  countryList: {
    marginTop: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryListContainer: {flexDirection: 'row', alignItems: 'center'},
  imageStyle: {height: mvs(15), width: ms(20)},
  listFont: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    marginLeft: ms(4),
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
});

const stylesLabel = StyleSheet.create({
  leftIconContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthResponsive(60),
    borderBottomWidth: 1,
    paddingBottom:
      Platform.OS === 'ios' ? heightPercentage(11) : heightPercentage(13),
  },
  selectCountryContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'flex-end',
    borderRadius: 5,
    justifyContent: 'center',
  },
  label: {
    paddingLeft: Platform.OS === 'ios' ? 0 : ms(4),
  },
  placeholder: {
    color: '#48546A',
  },
  leftLabel: {
    color: color.Neutral[10],
    alignSelf: 'flex-end',
    fontFamily: font.InterLight,
    fontSize: normalize(12),
    fontWeight: '400',
  },
  iconStyle: {
    width: ms(28),
    height: ms(20),
    left: '10%',
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(15),
  },
  dropdown: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? heightPercentage(13) : heightPercentage(22),
  },
  selectedCountryCode: {
    color: color.Neutral[10],
    fontWeight: '400',
    fontFamily: font.InterLight,
    fontSize: mvs(13),
    paddingTop:
      Platform.OS === 'ios' ? heightPercentage(20) : heightPercentage(12),
    paddingRight:
      Platform.OS === 'ios' ? widthPercentage(10) : widthPercentage(13),
  },
});

const stylesDropdown = StyleSheet.create({
  selectedTextStyle: {
    fontSize: normalize(13),
    color: fontColorMain,
  },
  itemTextStyle: {
    fontSize: normalize(13),
    color: fontColorMain,
  },
  iconStyle: {
    width: ms(28),
    height: ms(20),
    left: '70%',
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(15),
  },
  dropdown: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: itemBg,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  // Dropdown modal container
  containerStyle: {
    borderWidth: 0,
    backgroundColor: itemBg,
    width: widthPercentage(200),
    paddingVertical: widthPercentage(10),
  },
  // Item container in modal container
  itemContainer: {
    paddingVertical: 5,
    backgroundColor: itemBg,
    borderColor: itemBg,
  },
  placeholderStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(12),
    lineHeight: mvs(12),
    color: color.Dark[50],
  },
  fontAll: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Neutral[10],
  },
});
