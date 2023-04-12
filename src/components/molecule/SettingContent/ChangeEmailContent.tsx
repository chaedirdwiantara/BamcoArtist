import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Color from '../../../theme/Color';
import {Button, Gap, SsuInput} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon, ErrorIcon} from '../../../assets/icon';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {ms, mvs} from 'react-native-size-matters';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {font} from '../../../theme';
import {PhoneSettingTypeProps} from '../../../interface/setting.interface';
import {useTranslation} from 'react-i18next';

interface ChangeEmailProps {
  oldEmail: string | undefined;
  onPressGoBack: () => void;
  type: PhoneSettingTypeProps;
  onSuccess: ({
    email,
    type,
  }: {
    email: string;
    type: PhoneSettingTypeProps;
  }) => void;
}

interface InputProps {
  newEmail: string;
  password: string;
  type: PhoneSettingTypeProps;
}

const validation = yup.object({
  newEmail: yup
    .string()
    .required('This field is required')
    .email('Please use valid email'),
  password: yup.string().when('type', {
    is: (val: PhoneSettingTypeProps) => val === 'Add',
    then: yup
      .string()
      .required('This field is required')
      .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  }),
});

export const ChangeEmailContent: React.FC<ChangeEmailProps> = ({
  onPressGoBack,
  type,
  onSuccess,
  oldEmail,
}) => {
  const {t} = useTranslation();
  const [countryNumber, setCountryNumber] = useState<string | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    verificationPasswordSetting,
    getVerificationCode,
    isError,
    isLoading,
    errorMsg,
    setIsError,
  } = useSettingHook();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isValidating},
    setError,
    clearErrors,
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      newEmail: '',
      password: '',
      type: type,
    },
  });

  const checkErrorCountry = (data: string | null) => {
    if (data === undefined) {
      setError('newEmail', {
        type: 'value',
        message: 'Select Country',
      });
    } else {
      setCountryNumber(data);
      clearErrors('newEmail');
    }
    return;
  };

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  const onPressSave = async () => {
    checkErrorCountry(countryNumber);
    if (type === 'Add') {
      await verificationPasswordSetting({
        email: getValues('newEmail'),
        password: getValues('password'),
      });
    } else {
      await getVerificationCode({
        email: getValues('newEmail'),
      });
    }

    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        onSuccess({
          email: getValues('newEmail'),
          type: type,
        });
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={
          type === 'Add'
            ? t('Setting.Email.Label.Add')
            : t('Setting.Email.Label.Change')
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      {type === 'Change' && (
        <>
          <SsuInput.InputLabel
            label={t('Setting.Email.Label.Old') || ''}
            value={oldEmail}
            editable={false}
            containerInputStyles={{borderBottomWidth: 0}}
            containerStyles={styles.containerInput}
          />
          <Gap height={10} />
        </>
      )}

      <Gap height={10} />
      <Controller
        name="newEmail"
        control={control}
        render={({field: {onChange, value}}) => (
          <SsuInput.InputLabel
            label={t('Setting.Email.Label.New') || ''}
            value={value}
            onChangeText={text => {
              onChange(text);
              setIsError(false);
            }}
            placeholder={t('Setting.Email.Label.Add') || ''}
            isError={errors?.newEmail ? true : false}
            errorMsg={errors?.newEmail?.message}
          />
        )}
      />

      {type === 'Add' && (
        <>
          <Gap height={20} />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Email.Label.Password') || ''}
                password
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                }}
                placeholder={'Input Password'}
                isError={errors?.password ? true : false}
                errorMsg={errors?.password?.message}
              />
            )}
          />
        </>
      )}

      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={Color.Error[400]} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}

      <Button
        label={t('Btn.VerificationCode') || ''}
        onPress={handleSubmit(onPressSave)}
        containerStyles={disabledButton ? styles.buttonDisabled : styles.button}
        disabled={disabledButton}
      />

      <ModalLoading visible={isLoading} />
    </View>
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
  containerInput: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
});
