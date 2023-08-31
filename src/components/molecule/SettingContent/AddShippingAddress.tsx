import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  width,
  widthPercentage,
  widthResponsive,
  heightPercentage,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {Button, SsuInput} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {RootStackParams} from '../../../navigations';
import {storage} from '../../../hooks/use-storage.hook';
import {DataDropDownType, countryData} from '../../../data/dropdown';
import {ListCountryType} from '../../../interface/location.interface';
import {DataShippingProps} from '../../../interface/setting.interface';
import {createShipping, updateShipping} from '../../../api/setting.api';

interface AddShippingAddressProps {
  dataShipping: DataShippingProps | undefined;
  onPressGoBack: () => void;
  dataAllCountry: ListCountryType[];
  dataCities: DataDropDownType[];
  setSelectedCountry: (value: string) => void;
  from?: string;
}

const validation = yup.object({
  phoneNumber: yup.string().required('This field is required'),
  receiverFirstname: yup.string().required('This field is required'),
  receiverLastname: yup.string().required('This field is required'),
  address: yup.string().required('This field is required'),
});

interface InputProps {
  phoneNumber: string;
  receiverFirstname: string;
  receiverLastname: string;
  address: string;
}

export interface TextConfirmProps {
  title: string;
  subtitle: string;
}

export const AddShippingAddress: React.FC<AddShippingAddressProps> = ({
  dataShipping,
  onPressGoBack,
  dataAllCountry,
  dataCities,
  setSelectedCountry,
  from,
}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    bookyayShipmentID: dataShipping?.bookyayShipmentID,
    phoneNumberCode: dataShipping?.phoneNumberCode || '',
    country: dataShipping?.country || '',
    province: dataShipping?.province || '',
    city: dataShipping?.city || '',
    postalCode: dataShipping?.postalCode?.toString() || '',
  });

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: dataShipping?.phoneNumber || '',
      receiverFirstname: dataShipping?.receiverFirstname || '',
      receiverLastname: dataShipping?.receiverLastname || '',
      address: dataShipping?.address || '',
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [textConfirm, setTextConfirm] = useState<TextConfirmProps>({
    title: '',
    subtitle: '',
  });

  useEffect(() => {
    if (dataShipping === undefined) {
      setTextConfirm({
        title: 'Setting.Shipping.AddAddress',
        subtitle: 'Setting.Shipping.ConfirmAddAddress',
      });
    } else {
      setTextConfirm({
        title: 'Setting.Shipping.ChangeAddress',
        subtitle: 'Setting.Shipping.ConfirmChangeAddress',
      });
    }
  }, [dataShipping]);

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid]);

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
        phoneNumber: getValues('phoneNumber'),
        receiverFirstname: getValues('receiverFirstname'),
        receiverLastname: getValues('receiverLastname'),
        postalCode: Number(state.postalCode),
        country: state.country,
        address: getValues('address'),
      };

      // create new address, if data shipping is undefined
      if (dataShipping === undefined) {
        const response = await createShipping(payload);

        // send id to list address screen, for "new" flag
        if (response.data.bookyayShipmentID !== undefined) {
          storage.set('newIdShipping', response.data.bookyayShipmentID);
        }
        // to show toast add success in list address screen
        storage.set('toastType', 'add');
      } else {
        await updateShipping(payload);
        // to show toast update success in list address screen
        storage.set('toastType', 'update');
      }
      navigation.goBack();
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
    }
  };

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
          <View style={{marginTop: heightPercentage(15)}}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.PhoneShipping
                  type="label"
                  labelText={t('Setting.Shipping.Label.Phone') || ''}
                  placeholder={t('Setting.Shipping.Label.Phone') || ''}
                  value={value}
                  valuePrefix={state.phoneNumberCode}
                  onChangeText={(newText: string) => onChange(newText)}
                  countryData={countryData}
                  numberTyped={val => onChangeText('phoneNumberCode', val)}
                  onFocus={() => handleFocusInput('newPhoneNumber')}
                  isFocus={focusInput === 'newPhoneNumber'}
                  onBlur={() => handleFocusInput('')}
                  onSelectCountry={val => onChangeText('phoneNumberCode', val)}
                />
              )}
            />
          </View>

          <Controller
            name="receiverFirstname"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Shipping.Label.FirstName') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                }}
                placeholder={t('Setting.Shipping.Placeholder.FirstName') || ''}
                isError={errors?.receiverFirstname ? true : false}
                errorMsg={errors?.receiverFirstname?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Controller
            name="receiverLastname"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Shipping.Label.LastName') || ''}
                value={value}
                onChangeText={text => {
                  onChange(text);
                }}
                placeholder={t('Setting.Shipping.Placeholder.LastName') || ''}
                isError={errors?.receiverLastname ? true : false}
                errorMsg={errors?.receiverLastname?.message}
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
              textTyped={(newText: {label: string; value: string}) => {
                setSelectedCountry(newText.value);
                setState({
                  ...state,
                  country: newText.value,
                  province: '',
                  city: '',
                  postalCode: '',
                });
              }}
              containerStyles={{
                marginTop: heightPercentage(15),
                width: '45%',
              }}
            />

            <SsuInput.InputLabel
              label={t('Setting.Shipping.Label.State') || ''}
              placeholder={t('Setting.Shipping.Placeholder.State') || ''}
              value={state.province}
              onChangeText={(newText: string) =>
                setState({
                  ...state,
                  province: newText,
                  city: '',
                  postalCode: '',
                })
              }
              containerStyles={{
                marginTop: heightPercentage(15),
                width: '45%',
              }}
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
                });
              }}
              containerStyles={{
                marginTop: heightPercentage(15),
                width: '45%',
              }}
            />

            <SsuInput.InputLabel
              label={t('Setting.Shipping.Label.Postal') || ''}
              placeholder={t('Setting.Shipping.Placeholder.Postal') || ''}
              value={state.postalCode}
              keyboardType={'number-pad'}
              onChangeText={(newText: string) =>
                onChangeText('postalCode', newText)
              }
              containerStyles={{
                marginTop: heightPercentage(15),
                width: '45%',
              }}
            />
          </View>

          <Controller
            name="address"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Shipping.Label.Address') || ''}
                placeholder={t('Setting.Shipping.Placeholder.Address') || ''}
                value={value}
                onChangeText={(newText: string) => onChange(newText)}
                containerStyles={{marginTop: heightPercentage(15)}}
                isError={errors?.address ? true : false}
                errorMsg={errors?.address?.message}
              />
            )}
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
        title={t(textConfirm.title) || ''}
        subtitle={
          from === 'checkout'
            ? t('Setting.Shipping.Confirm2') || ''
            : t(textConfirm.subtitle) || ''
        }
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
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
