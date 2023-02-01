import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInputProps,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {SsuInput} from '../../atom/InputText/SsuInput';
import {color, font, typography} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import SearchBar from '../../atom/SearchBar';
import {FlashList} from '@shopify/flash-list';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import Gap from '../../atom/Gap/Gap';
import {ChevronDownIcon, ErrorIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';

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
  onSelectCountry: (data: any) => void;
  type?: 'label' | 'input';
  labelText?: string;
}

const DropdownSelectCountry: FC<SelectCountryProps> = (
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
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setData(countryData);
    setFullData(countryData);
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

  const countryOnPress = (item: any) => {
    setValue(item);
    setModalVisible(false);
    onSelectCountry(item.code);
  };

  const onEndEditing = () => {
    console.log('pressed end editing');
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
          placeholder={'Phone Number'}
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
                ? widthResponsive(20)
                : widthResponsive(8),
          }}
          isError={isError}
          errorMsg={errorMsg}
          isFocus={isFocus}
          leftIcon={
            <View style={styles.leftIconContainer}>
              <TouchableOpacity
                style={styles.selectCountryContainer}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styles.leftLabel}>{value?.label}</Text>
                <ChevronDownIcon />
              </TouchableOpacity>
              <Text style={styles.selectedCountryCode}>{value?.code}</Text>
            </View>
          }
          {...props}
        />
        <Modal
          isVisible={modalVisible}
          scrollOffsetMax={400 - 300}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          propagateSwipe={true}>
          <View style={styles.modalContainer}>
            <View>
              <SearchBar
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                rightIcon={showIcon}
                reset={onReset}
                onEndEditing={onEndEditing}
              />
            </View>
            <FlashList
              data={data}
              showsVerticalScrollIndicator={false}
              // keyExtractor={}
              renderItem={({item}: any) => (
                <View>
                  <TouchableOpacity
                    style={styles.countryList}
                    onPress={() => countryOnPress(item)}>
                    <View style={styles.countryListContainer}>
                      <Image source={item.image} style={styles.imageStyle} />
                      <Gap width={4} />
                      <Text style={styles.listFont}>{item.label}</Text>
                    </View>
                    <Text style={styles.listFont}>{item.code}</Text>
                  </TouchableOpacity>
                </View>
              )}
              estimatedItemSize={31}
            />
          </View>
        </Modal>
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
          <TouchableOpacity
            style={stylesLabel.selectCountryContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <ChevronDownIcon />
            {value ? (
              <Text style={stylesLabel.leftLabel}>{value?.code}</Text>
            ) : (
              <Text style={stylesLabel.placeholder}>+1</Text>
            )}
          </TouchableOpacity>
        </View>
        <Gap width={widthResponsive(15)} />
        <SsuInput.InputLabel
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
          placeholder={'Phone Number'}
          keyboardType={'number-pad'}
          onEndEditing={() => numberTyped(value?.code)}
          isError={false}
          errorMsg={errorMsg}
          isFocus={isFocus}
          isPhone
          {...props}
        />

        <Modal
          isVisible={modalVisible}
          scrollOffsetMax={400 - 300}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          propagateSwipe={true}>
          <View style={styles.modalContainer}>
            <View>
              <SearchBar
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                rightIcon={showIcon}
                reset={onReset}
                onEndEditing={onEndEditing}
              />
            </View>
            <FlashList
              data={data}
              showsVerticalScrollIndicator={false}
              // keyExtractor={}
              renderItem={({item}: any) => (
                <View>
                  <TouchableOpacity
                    style={styles.countryList}
                    onPress={() => countryOnPress(item)}>
                    <View style={styles.countryListContainer}>
                      <Image source={item.image} style={styles.imageStyle} />
                      <Gap width={4} />
                      <Text style={styles.listFont}>{item.label}</Text>
                    </View>
                    <Text style={styles.listFont}>{item.code}</Text>
                  </TouchableOpacity>
                </View>
              )}
              estimatedItemSize={31}
            />
          </View>
        </Modal>
      </View>
      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={Color.Error[400]} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}
    </>
  );
};

export default DropdownSelectCountry;

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
  },
  selectedCountryCode: {
    color: color.Dark[300],
    fontWeight: '400',
    fontFamily: font.InterLight,
    fontSize: mvs(12),
    marginLeft: ms(4),
    marginTop: ms(-1),
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
    fontSize: mvs(10),
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
});
