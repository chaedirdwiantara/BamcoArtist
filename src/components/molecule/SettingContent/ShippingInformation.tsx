import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  InteractionManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
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
import Color from '../../../theme/Color';
import {typography} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {updateShipping} from '../../../api/setting.api';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {DataDropDownType, countryData} from '../../../data/dropdown';
import {DataShippingProps} from '../../../interface/setting.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

interface ShippingInformationProps {
  dataShipping: DataShippingProps | null;
  onPressGoBack: () => void;
  dataAllCountry: DataDropDownType[];
  dataState: DataDropDownType[];
  dataCities: DataDropDownType[];
  setSelectedCountry: (value: string) => void;
  setSelectedState: (value: string) => void;
  from?: string;
}

export const ShippingInformationContent: React.FC<ShippingInformationProps> = ({
  dataShipping,
  onPressGoBack,
  dataAllCountry,
  dataState,
  dataCities,
  setSelectedCountry,
  setSelectedState,
  from,
}) => {
  const {t} = useTranslation();
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [countryNumber, setCountryNumber] = useState<string | null>('');
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastError, setToastError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const onPressConfirm = async () => {
    try {
      const payload = {
        ...state,
        phoneNumber: countryNumber + state.phoneNumber,
        postalCode: Number(state.postalCode),
      };
      await updateShipping(payload);
      if (from === 'checkout') return navigation.goBack();
      setShowModal(false);
      setToastError(false);
      InteractionManager.runAfterInteractions(() => setToastVisible(true));
    } catch (error) {
      setShowModal(false);
      setToastError(true);
      InteractionManager.runAfterInteractions(() => setToastVisible(true));
    }
  };

  const toastText = toastError
    ? 'Shipping Information failed to save!'
    : 'Shipping Information have been saved!';

  const toastBg = toastError ? Color.Error[400] : Color.Success[400];
  const disabledButton = checkEmptyProperties(state);
  const disabledBg = disabledButton ? Color.Dark[50] : Color.Success[400];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Setting.Shipping.Title') || ''}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={Color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{
            marginBottom: heightPercentage(10),
            paddingHorizontal: widthResponsive(15),
          }}
        />

        <ScrollView
          style={{
            paddingHorizontal: widthResponsive(20),
          }}>
          <SsuInput.InputLabel
            label={t('Setting.Shipping.Label.Email') || ''}
            placeholder={t('Setting.Shipping.Placeholder.Email') || ''}
            value={state.email}
            onChangeText={(newText: string) => onChangeText('email', newText)}
          />

          <View style={{marginTop: heightPercentage(15)}}>
            <Dropdown.Country
              type="label"
              labelText={t('Setting.Shipping.Label.Phone') || ''}
              placeholder={t('Setting.Shipping.Label.Phone') || ''}
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
            label={t('Setting.Shipping.Label.Fullname') || ''}
            placeholder={t('Setting.Shipping.Placeholder.Fullname') || ''}
            value={state.fullname}
            errorMsg={'Full Name can not be blank, please input your Full Name'}
            onChangeText={(newText: string) =>
              onChangeText('fullname', newText)
            }
            containerStyles={{marginTop: heightPercentage(15)}}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown.Input
              type="location"
              data={dataAllCountry}
              placeHolder={t('Setting.Shipping.Placeholder.Country') || ''}
              initialValue={state.country}
              dropdownLabel={t('Setting.Shipping.Label.Country')}
              textTyped={(newText: {label: string; value: string}) => {
                setSelectedCountry(newText.value);
                setState({
                  ...state,
                  country: newText.value,
                  province: '',
                  city: '',
                  postalCode: '',
                  address: '',
                });
              }}
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
              dropdownPosition="top"
            />

            <Dropdown.Input
              data={dataState}
              initialValue={state.province}
              showSearch={true}
              placeHolder={t('Setting.Shipping.Placeholder.State')}
              dropdownLabel={t('Setting.Shipping.Label.State')}
              textTyped={(newText: {label: string; value: string}) => {
                setSelectedState(newText.value);
                setState({
                  ...state,
                  province: newText.value,
                  city: '',
                  postalCode: '',
                  address: '',
                });
              }}
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
              dropdownPosition="top"
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown.Input
              data={dataCities}
              placeHolder={t('Setting.Shipping.Placeholder.City')}
              dropdownLabel={t('Setting.Shipping.Label.City')}
              showSearch={true}
              initialValue={state.city}
              textTyped={(newText: {label: string; value: string}) => {
                setState({
                  ...state,
                  city: newText.value,
                  postalCode: '',
                  address: '',
                });
              }}
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
              dropdownPosition="top"
            />

            <SsuInput.InputLabel
              label={t('Setting.Shipping.Label.Postal') || ''}
              placeholder={t('Setting.Shipping.Placeholder.Postal') || ''}
              value={state.postalCode}
              keyboardType={'number-pad'}
              onChangeText={(newText: string) =>
                onChangeText('postalCode', newText)
              }
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
            />
          </View>

          <SsuInput.InputLabel
            label={t('Setting.Shipping.Label.Address') || ''}
            placeholder={t('Setting.Shipping.Placeholder.Address') || ''}
            value={state.address}
            onChangeText={(newText: string) => onChangeText('address', newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />

          <Button
            label={t('Btn.Save')}
            onPress={() => setShowModal(true)}
            disabled={disabledButton}
            containerStyles={{
              width: width * 0.9,
              aspectRatio: widthPercentage(327 / 36),
              marginTop: heightPercentage(25),
              alignSelf: 'center',
              backgroundColor: disabledBg,
            }}
            textStyles={{fontSize: mvs(13)}}
          />
        </ScrollView>
      </View>

      <ModalConfirm
        modalVisible={showModal}
        title={t('Setting.Shipping.Title') || ''}
        subtitle={
          from === 'checkout'
            ? t('Setting.Shipping.Confirm2') || ''
            : t('Setting.Shipping.Confirm') || ''
        }
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
      />

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
