import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Color from '../../../theme/Color';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {color, font, typography} from '../../../theme';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {ms, mvs} from 'react-native-size-matters';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {PhoneSettingTypeProps} from '../../../interface/setting.interface';
import {useAuthHook} from '../../../hooks/use-auth.hook';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {useTranslation} from 'react-i18next';

interface OtpPNProps {
  countryNumber: string | null;
  phoneNumber: string;
  onPressGoBack: () => void;
  type: PhoneSettingTypeProps;
  onSuccess: (msg: string) => void;
}

interface InputProps {
  code: string;
}

const validation = yup.object({
  code: yup.string().required('This field is required'),
});

export const OtpPhoneNumber: React.FC<OtpPNProps> = ({
  countryNumber,
  phoneNumber,
  onPressGoBack,
  type,
  onSuccess,
}) => {
  const {t} = useTranslation();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
  });

  const {
    addNewPhoneNumber,
    changePhoneNumber,
    getVerificationCode,
    isError,
    isLoading,
    errorMsg,
    setIsError,
    successMsg,
  } = useSettingHook();
  const {
    isError: isErrorResend,
    errorMsg: errorMsgResend,
    isLoading: isLoadingResend,
    sendOtpSms,
  } = useAuthHook();

  const {
    control,
    formState: {errors, isValid, isValidating},
    setError,
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  const onPressSave = async () => {
    closeModal();
    if (type === 'Add') {
      await addNewPhoneNumber({
        phoneNumber: countryNumber + phoneNumber,
        code: getValues('code'),
      });
    } else {
      await changePhoneNumber({
        phoneNumber: countryNumber + phoneNumber,
        code: getValues('code'),
      });
    }
    setIsSubmit(true);
  };

  const onResendOTP = async () => {
    type === 'Add'
      ? await sendOtpSms(countryNumber + phoneNumber, 'addPhoneNumber')
      : await getVerificationCode({
          phoneNumber: countryNumber + phoneNumber,
        });
  };

  useEffect(() => {
    if (isErrorResend && !isLoadingResend) {
      setTimeout(() => {
        setVisibleModal(true);
      }, 500);
    }
  }, [isErrorResend, isLoadingResend]);

  useEffect(() => {
    if (isSubmit) {
      if (!isError) {
        onSuccess(successMsg);
      } else {
        setError('code', {
          type: 'value',
          message: errorMsg,
        });
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  const openModal = (typeModal: string) => {
    setModalVisible({
      ...isModalVisible,
      [typeModal]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
    });
  };

  const onPressConfirm = async () => {
    onPressSave();
  };

  return (
    <>
      <View style={styles.root}>
        <TopNavigation.Type2
          title={
            (type === 'Change'
              ? t('Setting.Phone.Label.Change')
              : t('Setting.Phone.Label.Add')) || ''
          }
          itemStrokeColor={Color.Neutral[10]}
        />

        <Gap height={10} />
        <View>
          <Text style={[typography.Overline, styles.label]}>
            {t('Setting.Phone.Label.New')}
          </Text>
          <Gap height={8} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{countryNumber}</Text>
            <Gap width={widthResponsive(15)} />
            <Text style={styles.text}>{phoneNumber}</Text>
          </View>
        </View>

        <Gap height={20} />
        <Controller
          name="code"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Setting.EnterVerifCode') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setIsError(false);
              }}
              placeholder={t('Setting.EnterVerifCode') || ''}
              isError={errors?.code ? true : false}
              errorMsg={errorMsg}
            />
          )}
        />

        <TouchableOpacity style={styles.containerResend} onPress={onResendOTP}>
          <Text style={styles.resend}>{t('General.NoVerifCode')}</Text>
        </TouchableOpacity>

        <Button
          label={t('Btn.Submit')}
          textStyles={{fontSize: mvs(14)}}
          containerStyles={
            disabledButton ? styles.buttonDisabled : styles.button
          }
          disabled={disabledButton}
          onPress={() => openModal('modalConfirm')}
        />
        <Gap height={4} />
        <Button
          label={t('Btn.Cancel')}
          type="border"
          borderColor="transparent"
          textStyles={{fontSize: mvs(14), color: color.Success[400]}}
          containerStyles={{width: '100%'}}
          onPress={onPressGoBack}
        />

        <ModalLoading visible={isLoading || isLoadingResend} />
      </View>
      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title={
          (type === 'Change'
            ? t('Setting.Phone.Label.Change')
            : t('Setting.Phone.Label.Add')) || ''
        }
        subtitle={
          (type === 'Add' ? t('Modal.Phone.Add') : t('Modal.Phone.Change')) ||
          ''
        }
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
      />
      <SsuToast
        modalVisible={visibleModal && !isLoadingResend}
        onBackPressed={() => setVisibleModal(false)}
        children={
          <View style={[styles.modalContainer]}>
            <Text style={[styles.modalText]}>{errorMsgResend}</Text>
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  button: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Dark[50],
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
  label: {
    paddingLeft: Platform.OS === 'ios' ? 0 : ms(4),
    color: Color.Neutral[50],
  },
  text: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(14),
  },
  resend: {
    color: Color.Pink[200],
    fontFamily: font.InterRegular,
    fontSize: normalize(11),
    lineHeight: mvs(12),
  },
  containerResend: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(10),
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: color.Error[400],
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  modalText: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
