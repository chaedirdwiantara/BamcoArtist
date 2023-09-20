import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  Dropdown,
  SsuInput,
  ModalConfirm,
  TopNavigation,
  ModalImagePicker,
} from '../../components';
import {RootStackParams} from '../../navigations';
import {color, font, typography} from '../../theme';
import {storage} from '../../hooks/use-storage.hook';
import {addBankAccount, editBankAccount} from '../../api/withdraw.api';
import {useLocationHook} from '../../hooks/use-location.hook';
import {useWithdrawHook} from '../../hooks/use-withdraw.hook';
import {width, widthPercentage, widthResponsive} from '../../utils';
import {ArrowLeftIcon, CameraIcon, ErrorIcon} from '../../assets/icon';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

interface InputProps {
  country: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  bankAddress: string;
  accountHolder: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
}

const validation = yup.object({
  country: yup.string(),
  bankName: yup.string(),
  accountNumber: yup.string(),
  swiftCode: yup.string(),
  bankAddress: yup.string(),
  accountHolder: yup.string(),
  beneficiaryName: yup.string(),
  beneficiaryAddress: yup.string(),
});

type BankAccountProps = NativeStackScreenProps<
  RootStackParams,
  'NewBankAccount'
>;

export const NewBankAccountScreen: React.FC<BankAccountProps> = ({
  route,
  navigation,
}: BankAccountProps) => {
  const {type, data} = route.params;
  const {t} = useTranslation();
  const {isError, errorMsg} = useWithdrawHook();
  const {dataAllCountry, getDataAllCountryWithdraw} = useLocationHook();

  const [attachment, setAttachment] = useState<string | null>();
  const [changes, setChanges] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>('');
  const [subtitleModal, setSubtitleModal] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      country: data?.country || '',
      bankName: data?.bankName || '',
      accountNumber: data?.accountNumber || '',
      swiftCode: data?.swiftCode || '',
      bankAddress: data?.bankAddress || '',
      accountHolder: data?.accountHolder || '',
      beneficiaryName: data?.beneficiaryName || '',
      beneficiaryAddress: data?.beneficiaryAddress || '',
    },
  });

  useEffect(() => {
    setAttachment(data?.attachment);
  }, [data]);

  useEffect(() => {
    getDataAllCountryWithdraw();
  }, []);

  useEffect(() => {
    if (
      isValid &&
      getValues('country') &&
      getValues('bankName') &&
      getValues('accountNumber') &&
      getValues('swiftCode') &&
      getValues('bankAddress') &&
      getValues('accountHolder') &&
      getValues('beneficiaryName') &&
      getValues('beneficiaryAddress') &&
      attachment
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, changes]);

  const onPressGoBack = () => {
    if (changes) {
      setShowModalConfirm(true);
      setModalType('back');
      setTitleModal('Withdrawal.AddBankAccount.ModalConfirm.TitleUnsaved');
      setSubtitleModal(
        'Withdrawal.AddBankAccount.ModalConfirm.SubtitleUnsaved',
      );
    } else {
      navigation.goBack();
    }
  };

  const onPressSave = () => {
    setShowModalConfirm(true);
    setModalType('save');
    setTitleModal('Withdrawal.AddBankAccount.Title');
    setSubtitleModal('Withdrawal.AddBankAccount.ModalConfirm.SubtitleAdd');
  };

  const onPressConfirm = async () => {
    setShowModalConfirm(false);
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    if (modalType === 'back') {
      navigation.goBack();
    } else {
      const JSONProfile = storage.getString('profile');
      let uuid: string = '';
      if (JSONProfile) {
        const profileObject = JSON.parse(JSONProfile);
        uuid = profileObject.uuid;
      }

      // Agreement with BE
      // Must begin with string 'start-' and end with string '-end'
      const imageBase64 = 'start~-' + attachment + '~-end';
      try {
        const payload = {
          userId: uuid,
          country: getValues('country'),
          bankName: getValues('bankName'),
          accountNumber: getValues('accountNumber'),
          swiftCode: getValues('swiftCode'),
          bankAddress: getValues('bankAddress'),
          accountHolder: getValues('accountHolder'),
          beneficiaryName: getValues('beneficiaryName'),
          beneficiaryAddress: getValues('beneficiaryAddress'),
          attachment: imageBase64,
        };
        let response =
          type === 'add'
            ? await addBankAccount(payload)
            : await editBankAccount({...payload, id: data?.bankId});

        InteractionManager.runAfterInteractions(() => setIsLoading(false));
        // if add success, navigate to otp screen
        // for type edit, must send bank id before edit
        const responseData =
          type === 'add'
            ? response.data
            : {...response.data, previousBankId: data?.bankId};

        navigation.navigate('VerifCodeWithdrawal', {
          type,
          data: responseData,
        });
      } catch (error) {
        InteractionManager.runAfterInteractions(() => setIsLoading(false));
      }
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={
          type === 'add'
            ? t('Withdrawal.AddBankAccount.Title')
            : t('Withdrawal.EditBankAccount.Title')
        }
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
              data={dataAllCountry}
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
            <SsuInput.InputLabel
              label={t('Withdrawal.AddBankAccount.Label.BankName') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.BankName') || ''
              }
              isError={errors?.bankName ? true : false}
              errorMsg={errors?.bankName?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="accountNumber"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Withdrawal.AddBankAccount.Label.AccountNumber') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.AccountNumber') || ''
              }
              isError={errors?.accountNumber ? true : false}
              errorMsg={errors?.accountNumber?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="swiftCode"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Withdrawal.AddBankAccount.Label.SwiftCode') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.SwiftCode') || ''
              }
              isError={errors?.swiftCode ? true : false}
              errorMsg={errors?.swiftCode?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="bankAddress"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Withdrawal.AddBankAccount.Label.BankAddress') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.BankAddress') || ''
              }
              isError={errors?.bankAddress ? true : false}
              errorMsg={errors?.bankAddress?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="accountHolder"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={
                t('Withdrawal.AddBankAccount.Label.NameOfAccountHolder') || ''
              }
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t(
                  'Withdrawal.AddBankAccount.Placeholder.NameOfAccountHolder',
                ) || ''
              }
              isError={errors?.accountHolder ? true : false}
              errorMsg={errors?.accountHolder?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="beneficiaryName"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Withdrawal.AddBankAccount.Label.BeneficiaryName') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.BeneficiaryName') || ''
              }
              isError={errors?.beneficiaryName ? true : false}
              errorMsg={errors?.beneficiaryName?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <Controller
          name="beneficiaryAddress"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={
                t('Withdrawal.AddBankAccount.Label.BeneficiaryAddress') || ''
              }
              value={value}
              onChangeText={text => {
                onChange(text);
                setChanges(true);
              }}
              placeholder={
                t('Withdrawal.AddBankAccount.Placeholder.BeneficiaryAddress') ||
                ''
              }
              isError={errors?.beneficiaryAddress ? true : false}
              errorMsg={errors?.beneficiaryAddress?.message}
              containerStyles={{marginTop: mvs(15)}}
            />
          )}
        />

        <View style={{marginTop: mvs(15)}}>
          <Text style={[typography.Overline, styles.label]}>
            {t('Withdrawal.AddBankAccount.Label.UploadPhotos')}
          </Text>
          <TouchableOpacity
            style={[
              styles.attachment,
              {aspectRatio: attachment ? mvs(327 / 200) : mvs(327 / 96)},
            ]}
            onPress={() => setShowModalImage(true)}>
            {attachment ? (
              <>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${attachment}`,
                  }}
                  resizeMode="stretch"
                  borderRadius={mvs(4)}
                  style={{height: '100%', width: '100%'}}
                />
                <CameraIcon
                  stroke={color.Neutral[10]}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                />
              </>
            ) : (
              <>
                <CameraIcon
                  stroke={color.Dark[300]}
                  style={styles.iconCamera}
                />
                <Text style={styles.uploadText}>
                  {t('Withdrawal.AddBankAccount.Placeholder.UploadPhotos')}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {isError ? (
          <View style={styles.containerErrorMsg}>
            <ErrorIcon fill={color.Error[400]} />
            <Gap width={ms(4)} />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        ) : null}

        <Button
          label={t('Btn.Save') || ''}
          onPress={onPressSave}
          textStyles={{fontSize: mvs(13)}}
          containerStyles={
            disabledButton ? styles.buttonDisabled : styles.button
          }
          disabled={disabledButton}
        />

        <ModalImagePicker
          title={t('Profile.Edit.Photos') || ''}
          modalVisible={showModalImage}
          sendUri={image => setAttachment(image.data)}
          sendUriMultiple={() => null}
          onDeleteImage={() => setAttachment(null)}
          onPressClose={() => setShowModalImage(false)}
          hideMenuDelete={attachment !== undefined}
          includeBase64={true}
        />

        <ModalConfirm
          modalVisible={showModalConfirm}
          title={t(titleModal) || ''}
          subtitle={t(subtitleModal) || ''}
          onPressClose={() => setShowModalConfirm(false)}
          onPressOk={onPressConfirm}
        />
      </ScrollView>

      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: mvs(327 / 42),
    marginVertical: mvs(25),
    alignSelf: 'center',
    backgroundColor: color.Dark[50],
  },
  button: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 38),
    marginVertical: mvs(25),
    alignSelf: 'center',
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
  label: {
    paddingLeft: Platform.OS === 'ios' ? 0 : ms(4),
    color: color.Neutral[50],
  },
  attachment: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width * 0.9,
    borderColor: color.Dark[300],
    borderWidth: mvs(1),
    borderRadius: mvs(4),
    borderStyle: 'dashed',
    marginTop: mvs(15),
  },
  uploadText: {
    color: color.Dark[300],
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    marginLeft: mvs(5),
  },
  iconCamera: {
    width: widthPercentage(22),
    height: widthPercentage(22),
  },
});
