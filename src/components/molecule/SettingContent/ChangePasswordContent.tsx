import React, {useEffect, useState} from 'react';
import {InteractionManager, StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {TopNavigation} from '../TopNavigation';
import {ms, mvs} from 'react-native-size-matters';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {color, font, typography} from '../../../theme';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../../assets/icon';

interface ChangePasswordProps {
  onPressGoBack: () => void;
}

const validation = yup.object({
  password: yup
    .string()
    .required('This field is required')
    .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  newPassword: yup
    .string()
    .required('This field is required')
    .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  repeatPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('newPassword'), null], "Password didn't match"),
});

interface InputProps {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export const ChangePasswordContent: React.FC<ChangePasswordProps> = ({
  onPressGoBack,
}) => {
  const {t} = useTranslation();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {changePassword, isError, isLoading, errorMsg, setIsError} =
    useSettingHook();

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

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
  }, [isValidating]);

  const onPressConfirm = async () => {
    await changePassword({
      password: getValues('password'),
      newPassword: getValues('newPassword'),
      repeatPassword: getValues('repeatPassword'),
    });

    setIsSubmit(true);
    setShowModal(false);
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        InteractionManager.runAfterInteractions(() => setToastVisible(true));
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Password.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthResponsive(15),
        }}
      />

      <View
        style={{
          paddingHorizontal: widthResponsive(20),
        }}>
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Setting.Password.Label.Old') || ''}
              password
              value={value}
              onChangeText={text => {
                onChange(text);
                setIsError(false);
              }}
              placeholder={t('Setting.Password.Label.Old') || ''}
              isError={errors?.password ? true : false}
              errorMsg={errors?.password?.message}
              containerStyles={{marginTop: heightPercentage(15)}}
            />
          )}
        />

        {isError ? (
          <View style={styles.containerErrorMsg}>
            <ErrorIcon fill={color.Error[400]} />
            <Gap width={ms(4)} />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        ) : null}

        <Controller
          name="newPassword"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Setting.Password.Label.New') || ''}
              password
              value={value}
              onChangeText={text => {
                onChange(text);
                setIsError(false);
              }}
              placeholder={t('Setting.Password.Label.New') || ''}
              isError={errors?.newPassword ? true : false}
              errorMsg={errors?.newPassword?.message}
              containerStyles={{marginTop: heightPercentage(15)}}
            />
          )}
        />

        <Controller
          name="repeatPassword"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Setting.Password.Label.Repeat') || ''}
              password
              value={value}
              onChangeText={text => {
                onChange(text);
                setIsError(false);
              }}
              placeholder={t('Setting.Password.Label.Repeat') || ''}
              isError={errors?.repeatPassword ? true : false}
              errorMsg={errors?.repeatPassword?.message}
              containerStyles={{marginTop: heightPercentage(15)}}
            />
          )}
        />

        <Button
          label={t('Setting.Password.Title')}
          onPress={() => setShowModal(true)}
          containerStyles={
            disabledButton ? styles.buttonDisabled : styles.button
          }
          disabled={disabledButton}
        />
      </View>

      <ModalConfirm
        modalVisible={showModal}
        title={t('Setting.Password.Title') || ''}
        subtitle={t('Setting.Password.Confirm') || ''}
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              Your Password have been updated!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
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
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
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
    backgroundColor: color.Dark[50],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
