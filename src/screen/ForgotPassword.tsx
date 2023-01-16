import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../theme';
import {normalize} from '../utils';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import SsuSheet from '../components/atom/SsuSheet';
import {
  Button,
  Gap,
  ModalConfirm,
  SsuInput,
  SsuOTPInput,
  SsuOTPTimer,
} from '../components';
import {EmailIcon, LockIcon} from '../assets/icon';
import {useAuthHook} from '../hooks/use-auth.hook';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';
import * as yup from 'yup';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RenderMessage from '../components/molecule/OtpInput/RenderMessage';
import {storage} from '../hooks/use-storage.hook';

const {width, height} = Dimensions.get('screen');
type PageProps = 'emailInput' | 'otp' | 'newPass';
interface ForgotPasswordProps {
  email: string;
  password: string;
  confirmPassword: string;
  page: PageProps;
}

const validationSchema = yup.object({
  email: yup.string().when('page', {
    is: (val: PageProps) => val === 'emailInput',
    then: yup
      .string()
      .required('This field is required')
      .email('Please use valid email'),
  }),
  password: yup.string().when('page', {
    is: (val: PageProps) => val === 'newPass',
    then: yup
      .string()
      .required('This field is required')
      .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  }),
  confirmPassword: yup.string().when('page', {
    is: (val: PageProps) => val === 'newPass',
    then: yup
      .string()
      .required('Field is required')
      .oneOf([yup.ref('password'), null], `Password didn't match`),
  }),
});

export const ForgotPassword: FC = () => {
  const {
    isError,
    errorMsg,
    isOtpValid,
    isLoading,
    loginResult,
    forgotPassword,
    confirmEmailOtpFP,
    onChangePassword,
  } = useAuthHook();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setValue,
    watch,
  } = useForm<ForgotPasswordProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      page: 'emailInput',
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const timer = 12;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [code, setCode] = useState<string>('888888');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });

  const handleSubmitEmail: SubmitHandler<ForgotPasswordProps> = data => {
    setIsSubmit(true);
    forgotPassword(data.email);
  };
  const onCodeComplete = (otp: string) => {
    setIsSubmit(true);
    confirmEmailOtpFP(watch('email'), otp);
    setCode(otp);
  };

  const handleOnPressSubmit: SubmitHandler<
    ForgotPasswordProps
  > = async data => {
    setIsSubmit(true);
    console.log();
    await onChangePassword(data.email, code, data.password);
  };
  const handleFocusInput = (focus: string | null) => {
    setFocusInput(focus);
  };

  useEffect(() => {
    if (!isLoading && isSubmit) {
      if (watch('page') === 'emailInput') {
        if (!isError) {
          setIsSubmit(false);
          setValue('page', 'otp');
        } else {
          setError('email', {
            type: 'value',
            message: errorMsg,
          });
        }
      } else if (watch('page') === 'otp') {
        if (!isError && isOtpValid) {
          setIsSubmit(false);
          setValue('page', 'newPass');
        }
      } else if (watch('page') === 'newPass') {
        if (!isError && loginResult !== null) {
          storage.set('isLogin', true);
          if (loginResult === 'preference') {
            navigation.reset({
              index: 0,
              routes: [{name: 'Preference'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'MainTab'}],
            });
          }
        } else if (isError) {
          console.log({errorMsg});
          setError('confirmPassword', {
            type: 'value',
            message: errorMsg,
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function handleBackButtonClick() {
    if (watch('page') === 'newPass') {
      openModal('modalConfirm');
      return true;
    } else if (watch('page') === 'otp') {
      setValue('page', 'emailInput');
      return false;
    } else if (watch('page') === 'emailInput') {
      navigation.goBack();
      return false;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (type: string) => {
    setModalVisible({
      ...isModalVisible,
      [type]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const onPressConfirm = async () => {
    navigation.pop();
    navigation.replace('Login');
  };

  //  email
  const emailInput = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>Update your password</Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>
            Input your email address to recover your password
          </Text>
        </View>

        <Gap height={16} />
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              isError={errors?.email ? true : false}
              errorMsg={errors?.email?.message ?? errorMsg}
              value={value}
              onChangeText={onChange}
              placeholder={'Enter your email'}
              leftIcon={<EmailIcon stroke={color.Dark[50]} />}
              onFocus={() => {
                handleFocusInput('email');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isFocus={focusInput === 'email'}
            />
          )}
        />

        <Gap height={24} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmit(handleSubmitEmail)}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleBackButtonClick}
        />
        <Gap height={10} />
      </>
    );
  };

  //   OTP
  const otp = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>Input Otp</Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>
            Enter the recovery code we just sent to
          </Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>{watch('email')}</Text>
        </View>

        <Gap height={16} />
        <SsuOTPInput
          hideIcon
          onCodeFilled={(result, codes) => {
            if (result) {
              onCodeComplete(codes);
            }
          }}
        />
        {isError ? (
          <RenderMessage otpSuccess={isOtpValid ? true : false} />
        ) : null}
        {/* <Gap height={24} /> */}
        <SsuOTPTimer action={() => {}} timer={timer} />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleBackButtonClick}
        />
        <Gap height={10} />
      </>
    );
  };

  //   New Password
  const newPass = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>Set New Password</Text>
        </View>

        <Gap height={16} />
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              placeholder={'Password'}
              leftIcon={<LockIcon stroke={color.Dark[50]} />}
              password
              onFocus={() => {
                handleFocusInput('password');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={errors?.password ? true : false}
              errorMsg={errors?.password?.message}
              isFocus={focusInput === 'password'}
            />
          )}
        />
        <Gap height={8} />
        <Controller
          name="confirmPassword"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              placeholder={'Repeat'}
              leftIcon={<LockIcon stroke={color.Dark[50]} />}
              password
              onFocus={() => {
                handleFocusInput('confirmPassword');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={errors?.confirmPassword ? true : false}
              errorMsg={errors?.email?.message}
              isFocus={focusInput === 'confirmPassword'}
            />
          )}
        />
        <Gap height={20} />
        <Button
          label="Sign In"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmit(handleOnPressSubmit)}
        />
      </>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/background/signin-guest.png')}
        style={styles.image}
      />
      <SsuSheet
        children={
          watch('page') === 'otp'
            ? otp()
            : watch('page') === 'newPass'
            ? newPass()
            : watch('page') === 'emailInput'
            ? emailInput()
            : emailInput()
        }
      />
      <ModalLoading visible={isLoading} />
      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title="Set New Password"
        subtitle="Are you sure you want to leave your progress unsaved?"
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: normalize(20),
    lineHeight: mvs(32),
    color: color.Neutral[10],
  },
  descStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
  },
  otpTitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
