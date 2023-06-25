import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  Dropdown,
  SsuInput,
  SsuToast,
  ModalConfirm,
  TopNavigation,
} from '../../components';
import {RootStackParams} from '../../navigations';
import {color, font, typography} from '../../theme';
import {width, widthPercentage, widthResponsive} from '../../utils';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../assets/icon';

interface InputProps {
  country: string;
  bankName: string;
  accountNumber: string;
  nameOfAccountHolder: string;
}

const validation = yup.object({
  country: yup.string(),
  bankName: yup.string(),
  accountNumber: yup.string(),
  nameOfAccountHolder: yup.string(),
});

export const EditBankAccountScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();

  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      country: '',
      bankName: '',
      accountNumber: '',
      nameOfAccountHolder: '',
    },
  });

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Withdrawal.EditBankAccount.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          paddingHorizontal: widthPercentage(12),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: widthResponsive(20),
        }}>
        <Controller
          name="country"
          control={control}
          render={({field: {onChange, value}}) => (
            <Dropdown.Input
              type="location"
              initialValue={value}
              data={[]}
              placeHolder={
                t('Withdrawal.AddBankAccount.Placeholder.Country') || ''
              }
              dropdownLabel={t('Withdrawal.AddBankAccount.Label.Country') || ''}
              textTyped={(newText: {label: string; value: string}) => {
                onChange(newText.value);
                setChanges(true);
                // setSelectedCountry(newText.value);
              }}
              containerStyles={{
                marginTop: mvs(16),
              }}
              isError={errors?.country ? true : false}
              errorMsg={errors?.country?.message}
            />
          )}
        />

        <Controller
          name="bankName"
          control={control}
          render={({field: {onChange, value}}) => (
            <Dropdown.Input
              type="location"
              initialValue={value}
              data={[]}
              placeHolder={
                t('Withdrawal.AddBankAccount.Placeholder.BankName') || ''
              }
              dropdownLabel={
                t('Withdrawal.AddBankAccount.Label.BankName') || ''
              }
              textTyped={(newText: {label: string; value: string}) => {
                onChange(newText.value);
                setChanges(true);
                // setSelectedCountry(newText.value);
              }}
              containerStyles={{
                marginTop: mvs(16),
              }}
              isError={errors?.bankName ? true : false}
              errorMsg={errors?.bankName?.message}
            />
          )}
        />

        <Controller
          name="accountNumber"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={
                t('Withdrawal.AddBankAccount.Placeholder.AccountNumber') || ''
              }
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Label.AccountNumber') || ''
              }
              isError={errors?.accountNumber ? true : false}
              errorMsg={errors?.accountNumber?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="nameOfAccountHolder"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={
                t(
                  'Withdrawal.AddBankAccount.Placeholder.NameOfAccountHolder',
                ) || ''
              }
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Label.NameOfAccountHolder') || ''
              }
              isError={errors?.nameOfAccountHolder ? true : false}
              errorMsg={errors?.nameOfAccountHolder?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        {/* {isError ? (
          <View style={styles.containerErrorMsg}>
            <ErrorIcon fill={color.Error[400]} />
            <Gap width={ms(4)} />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        ) : null} */}

        <Button
          label={t('Btn.Save') || ''}
          onPress={() => {}}
          textStyles={{fontSize: mvs(13)}}
          containerStyles={
            disabledButton ? styles.buttonDisabled : styles.button
          }
          disabled={disabledButton}
        />

        <ModalConfirm
          modalVisible={showModal}
          title={t('Setting.Account.Title') || ''}
          subtitle={t('Setting.Account.Confirm') || ''}
          onPressClose={() => setShowModal(false)}
          onPressOk={() => {}}
        />

        <SsuToast
          modalVisible={toastVisible}
          onBackPressed={() => setToastVisible(false)}
          children={
            <View style={[styles.modalContainer]}>
              <TickCircleIcon
                width={widthResponsive(21)}
                height={mvs(20)}
                stroke={color.Neutral[10]}
              />
              <Gap width={widthResponsive(7)} />
              <Text
                style={[
                  typography.Button2,
                  {
                    color: color.Neutral[10],
                  },
                ]}>
                Your account have been updated!
              </Text>
            </View>
          }
          modalStyle={{marginHorizontal: widthResponsive(24)}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 38),
    marginVertical: mvs(25),
    alignSelf: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: mvs(22),
    height: mvs(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
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
    fontSize: mvs(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: mvs(327 / 36),
    marginVertical: mvs(25),
    alignSelf: 'center',
    backgroundColor: color.Dark[50],
  },
});
