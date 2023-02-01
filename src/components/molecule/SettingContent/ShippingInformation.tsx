import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  CloseCircleIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import {Dropdown} from '../DropDown';
import {
  dataCity,
  dataLocation,
  dataState,
} from '../../../data/Settings/account';
import Color from '../../../theme/Color';
import {typography} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {countryData} from '../../../data/dropdown';
import {updateShipping} from '../../../api/setting.api';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {DataShippingProps} from '../../../interface/setting.interface';

interface ShippingInformationProps {
  dataShipping: DataShippingProps | null;
  onPressGoBack: () => void;
}

export const ShippingInformationContent: React.FC<ShippingInformationProps> = ({
  dataShipping,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    email: dataShipping?.email || '',
    phoneNumber: dataShipping?.phoneNumber || '',
    fullname: dataShipping?.fullname || '',
    province: dataShipping?.province || '',
    country: dataShipping?.country || '',
    city: dataShipping?.city || '',
    postalCode: dataShipping?.postalCode?.toString() || '',
    address: dataShipping?.address || '',
  });

  const [countryNumber, setCountryNumber] = useState<string | null>('');
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastError, setToastError] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const resultData = (dataResult: string) => {
    setCountryNumber(dataResult);
  };

  const handleFocusInput = (focus: string | null) => {
    setFocusInput(focus);
  };

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const checkEmptyProperties = (obj: any) => {
    for (const key in obj) {
      if (obj[key] === '') return true;
    }
    return false;
  };

  const onPressSave = async () => {
    try {
      const payload = {
        ...state,
        phoneNumber: countryNumber + state.phoneNumber,
        postalCode: Number(state.postalCode),
      };
      await updateShipping(payload);
      setToastVisible(true);
      setToastError(false);
    } catch (error) {
      setToastVisible(true);
      setToastError(true);
    }
  };

  const toastText = toastError
    ? 'Shipping Information failed to save!'
    : 'Shipping Information have been saved!';

  const toastBg = toastError ? Color.Error[400] : Color.Success[400];
  const disabledButton = checkEmptyProperties(state);
  const disabledBg = disabledButton ? Color.Dark[50] : Color.Pink[200];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title="Shipping Information"
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={Color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{marginBottom: heightPercentage(15)}}
        />

        <ScrollView>
          <SsuInput.InputLabel
            label="Email"
            placeholder="Add Email"
            value={state.email}
            onChangeText={(newText: string) => onChangeText('email', newText)}
          />

          <View style={{marginTop: heightPercentage(15)}}>
            <Dropdown.Country
              type="label"
              labelText={'New Phone Number'}
              placeholder={'New Phone Number'}
              value={state.phoneNumber}
              onChangeText={(newText: string) =>
                onChangeText('phoneNumber', newText)
              }
              countryData={countryData}
              numberTyped={resultData}
              onFocus={() => handleFocusInput('newPhoneNumber')}
              isFocus={focusInput === 'newPhoneNumber'}
              onBlur={() => handleFocusInput('')}
              onSelectCountry={(val: string) => setCountryNumber(val)}
            />
          </View>

          <SsuInput.InputLabel
            label="Full Name"
            placeholder="Add Full Name"
            value={state.fullname}
            errorMsg={'Full Name can not be blank, please input your Full Name'}
            onChangeText={(newText: string) =>
              onChangeText('fullname', newText)
            }
            containerStyles={{marginTop: heightPercentage(15)}}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown.Input
              data={dataState}
              initialValue={state.province}
              placeHolder={'Select State/Province'}
              dropdownLabel={'State/Province'}
              textTyped={(newText: {label: string; value: string}) =>
                onChangeText('province', newText.value)
              }
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
            />

            <Dropdown.Input
              data={dataLocation}
              placeHolder={'Select Country'}
              initialValue={state.country}
              dropdownLabel={'Country'}
              textTyped={(newText: {label: string; value: string}) =>
                onChangeText('country', newText.value)
              }
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <SsuInput.InputLabel
              label="Postal Code"
              placeholder="Add Postal Code"
              value={state.postalCode}
              keyboardType={'number-pad'}
              onChangeText={(newText: string) =>
                onChangeText('postalCode', newText)
              }
              inputStyles={{minHeight: mvs(55)}}
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
            />

            <Dropdown.Input
              data={dataCity}
              placeHolder={'Select City'}
              dropdownLabel={'City'}
              initialValue={state.city}
              textTyped={(newText: {label: string; value: string}) =>
                onChangeText('city', newText.value)
              }
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
            />
          </View>

          <SsuInput.InputLabel
            label="Address"
            placeholder="Add Address"
            value={state.address}
            onChangeText={(newText: string) => onChangeText('address', newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />

          <Button
            label="Save"
            onPress={onPressSave}
            disabled={disabledButton}
            containerStyles={{
              width: width * 0.9,
              aspectRatio: widthPercentage(327 / 36),
              marginTop: heightPercentage(25),
              alignSelf: 'center',
              backgroundColor: disabledBg,
            }}
          />
        </ScrollView>
      </View>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer, {backgroundColor: toastBg}]}>
            {toastError ? (
              <CloseCircleIcon
                width={widthResponsive(21)}
                height={heightPercentage(20)}
                stroke={Color.Neutral[10]}
              />
            ) : (
              <TickCircleIcon
                width={widthResponsive(21)}
                height={heightPercentage(20)}
                stroke={Color.Neutral[10]}
              />
            )}
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: Color.Neutral[10],
  },
});
