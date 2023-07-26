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
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

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
import {ListCountryType} from '../../../interface/location.interface';

interface ShippingInformationProps {
  dataShipping: DataShippingProps | null;
  onPressGoBack: () => void;
  dataAllCountry: ListCountryType[];
  dataCities: DataDropDownType[];
  setSelectedCountry: (value: number) => void;
  from?: string;
}

const validation = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('Please use valid email'),
  fullname: yup
    .string()
    .strict(true)
    .trim('Full name cannot include leading and trailing spaces')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
});

interface InputProps {
  email: string;
  fullname: string;
}

export const ShippingInformationContent: React.FC<ShippingInformationProps> = ({
  dataShipping,
  onPressGoBack,
  dataAllCountry,
  dataCities,
  setSelectedCountry,
  from,
}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    phoneNumber: dataShipping?.phoneNumber || '',
    province: dataShipping?.province || '',
    country: Number(dataShipping?.country) || -1,
    city: dataShipping?.city || '',
    postalCode: dataShipping?.postalCode?.toString() || '',
    address: dataShipping?.address || '',
  });

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      email: dataShipping?.email || '',
      fullname: dataShipping?.fullname || '',
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [countryNumber, setCountryNumber] = useState<string>(
    dataShipping?.phoneNumberCode || '',
  );
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastError, setToastError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid]);

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
        email: getValues('email'),
        fullname: getValues('fullname'),
        phoneNumber: state.phoneNumber,
        phoneNumberCode: countryNumber || '',
        postalCode: Number(state.postalCode),
        country: state.country.toString(),
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
  const checkValue = checkEmptyProperties(state);

  const disabledBg =
    disabledButton || checkValue ? Color.Dark[50] : Color.Success[400];

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
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Shipping.Label.Email') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                }}
                placeholder={t('Setting.Shipping.Placeholder.Email') || ''}
                isError={errors?.email ? true : false}
                errorMsg={errors?.email?.message}
              />
            )}
          />

          <View style={{marginTop: heightPercentage(15)}}>
            <Dropdown.PhoneShipping
              type="label"
              labelText={t('Setting.Shipping.Label.Phone') || ''}
              placeholder={t('Setting.Shipping.Label.Phone') || ''}
              value={state.phoneNumber}
              valuePrefix={countryNumber}
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

          <Controller
            name="fullname"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Shipping.Label.Fullname') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                }}
                placeholder={t('Setting.Shipping.Placeholder.Fullname') || ''}
                isError={errors?.fullname ? true : false}
                errorMsg={errors?.fullname?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown.Input
              type="location"
              data={dataAllCountry}
              placeHolder={t('Setting.Shipping.Placeholder.Country') || ''}
              initialValue={state.country}
              dropdownLabel={t('Setting.Shipping.Label.Country')}
              textTyped={(newText: {label: string; value: number}) => {
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

            <SsuInput.InputLabel
              label={t('Setting.Shipping.Label.State') || ''}
              placeholder={t('Setting.Shipping.Placeholder.State') || ''}
              value={state.province}
              onChangeText={(newText: string) =>
                onChangeText('province', newText)
              }
              containerStyles={{marginTop: heightPercentage(15), width: '45%'}}
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
            disabled={disabledButton || checkValue}
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
