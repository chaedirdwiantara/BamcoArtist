import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Gap, SsuDivider, SsuInput, SsuToast} from '../components/atom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RegistrationType} from '../interface/profile.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {EmailIcon, FullNameIcon, LockIcon} from '../assets/icon';
import {color, font} from '../theme';
import {Dropdown, SsuStatusBar, TermAndConditions} from '../components';
import {countryData} from '../data/dropdown';
import {heightResponsive, normalize, widthResponsive} from '../utils';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../assets/logo';
import {ms, mvs} from 'react-native-size-matters';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';
import {storage} from '../hooks/use-storage.hook';

interface RegisterInput {
  fullname: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string;
  image: string;
  registrationType: RegistrationType;
  termsCondition: boolean;
}

const registerValidation = yup.object({
  registrationType: yup.string(),
  fullname: yup
    .string()
    .required('This field is required')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
  email: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val === 'email',
    then: yup
      .string()
      .required('This field is required')
      .email('Please use valid email'),
  }),
  phoneNumber: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val === 'phoneNumber',
    then: yup
      .string()
      .required('This field is required')
      .matches(/^[0-9]{0,15}$/, 'Only allowed 15 numerical characters'),
  }),
  image: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val !== 'email' && val !== 'phoneNumber',
    then: yup.string().required('Image not found'),
  }),
  password: yup
    .string()
    .required('This field is required')
    .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  confirmPassword: yup
    .string()
    .required('Field is required')
    .oneOf([yup.ref('password'), null], `Password didn't match`),
  termsCondition: yup.bool().oneOf([true], 'Please agree before continue.'),
});

export const SignupScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoading,
    isError,
    authResult,
    errorMsg,
    onRegisterUser,
    onLoginApple,
    ssoEmail,
    ssoRegistered,
    ssoError,
    ssoErrorMsg,
    setSsoError,
    ssoType,
    ssoId,
    loginResult,
  } = useAuthHook();
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [countryNumber, setCountryNumber] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setValue,
    watch,
    clearErrors,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerValidation),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      password: '',
      confirmPassword: '',
      registrationType: 'email',
      termsCondition: false,
    },
  });

  const handleRegisterUser: SubmitHandler<RegisterInput> = data => {
    if (data.registrationType === 'email') {
      onRegisterUser({
        fullname: data.fullname,
        password: data.password,
        registrationType: data.registrationType,
        email: data.email,
      });
    } else {
      onRegisterUser({
        fullname: data.fullname,
        password: data.password,
        registrationType: data.registrationType,
        phoneNumber: countryNumber + data.phoneNumber,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && authResult !== null) {
      if (watch('registrationType') === 'email') {
        navigation.replace('Otp', {
          id: watch('email'),
          type: 'email',
          title: 'Email Verification Code',
          subtitle: `We have sent you six digits verification code on address ${watch(
            'email',
          )} check your inbox and enter verification code here`,
        });
      } else {
        navigation.replace('Otp', {
          id: countryNumber + watch('phoneNumber'),
          type: 'phoneNumber',
          title: 'Phone Verification Code',
          subtitle: `Enter the verification code that we’ve sent to ${
            countryNumber + watch('phoneNumber')
          }`,
          context: 'register',
        });
      }
    } else if (!isLoading && isError !== null) {
      setError('termsCondition', {
        type: 'value',
        message: errorMsg,
      });
      checkErrorCountry(countryNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, authResult]);

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };

  const handleChangeLoginType = (loginType: RegistrationType) => {
    setValue('registrationType', loginType);
    handleFocusInput(null);
  };

  const handleFocusInput = (focus: string | null) => {
    setFocusInput(focus);
  };

  const resultData = (dataResult: any) => {
    setCountryNumber(dataResult);
    console.log(dataResult, 'dataResult Select Country');
  };

  const checkErrorCountry = (data: any) => {
    if (watch('registrationType') === 'phoneNumber') {
      if (data === undefined) {
        setError('phoneNumber', {
          type: 'value',
          message: 'Select Country',
        });
      } else {
        setCountryNumber(data);
        clearErrors('phoneNumber');
      }
    }
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  useEffect(() => {
    if (ssoRegistered !== null && !ssoRegistered) {
      navigation.navigate('SignupSSO', {
        email: ssoEmail,
        ssoType: ssoType as RegistrationType,
        ssoId: ssoId,
      });
    } else if (
      ssoRegistered !== null &&
      ssoRegistered &&
      loginResult !== null
    ) {
      storage.set('isLogin', true);
      if (loginResult === 'preference') {
        navigation.replace('Preference');
      } else {
        navigation.replace('MainTab');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssoRegistered, loginResult]);

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={heightResponsive(10)}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View>
            <Text style={styles.titleStyle}>Sign Up</Text>
            <Gap height={24} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <GoogleLogo />
              <Gap width={24} />
              <FacebookLogo />
              {Platform.OS === 'ios' ? <Gap width={24} /> : null}
              {Platform.OS === 'ios' ? (
                <TouchableOpacity onPress={onLoginApple}>
                  <AppleLogo />
                </TouchableOpacity>
              ) : null}
            </View>
            <Gap height={20} />
            <SsuDivider text={'or'} />
            <Gap height={20} />
            <View style={styles.wrapperLoginType}>
              <Text
                style={
                  watch('registrationType') === 'email'
                    ? styles.loginTypeActive
                    : styles.loginTypeInactive
                }
                onPress={() => handleChangeLoginType('email')}>
                Email
              </Text>
              <View style={styles.verticalSeparatorLoginType} />
              <Text
                style={
                  watch('registrationType') === 'phoneNumber'
                    ? styles.loginTypeActive
                    : styles.loginTypeInactive
                }
                onPress={() => handleChangeLoginType('phoneNumber')}>
                Phone Number
              </Text>
            </View>
            <Gap height={16} />
            {watch('registrationType') === 'email' ? (
              <Controller
                name="email"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SsuInput.InputText
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Email'}
                    leftIcon={<EmailIcon stroke={color.Dark[50]} />}
                    onFocus={() => handleFocusInput('email')}
                    onBlur={() => {
                      handleFocusInput(null);
                    }}
                    isError={errors?.email ? true : false}
                    errorMsg={errors?.email?.message}
                    isFocus={focusInput === 'email'}
                  />
                )}
              />
            ) : (
              <View>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Dropdown.Country
                      value={value}
                      onChangeText={onChange}
                      countryData={countryData}
                      numberTyped={resultData}
                      onFocus={() => handleFocusInput('phoneNumber')}
                      isError={errors?.phoneNumber ? true : false}
                      errorMsg={errors?.phoneNumber?.message}
                      isFocus={focusInput === 'phoneNumber'}
                      onSelectCountry={checkErrorCountry}
                    />
                  )}
                />
              </View>
            )}
            <Gap height={8} />
            <Controller
              name="fullname"
              control={control}
              render={({field: {onChange, value}}) => (
                <SsuInput.InputText
                  value={value}
                  onChangeText={onChange}
                  placeholder={'Full Name'}
                  leftIcon={<FullNameIcon stroke={color.Dark[50]} />}
                  onFocus={() => {
                    handleFocusInput('fullname');
                  }}
                  onBlur={() => {
                    handleFocusInput(null);
                  }}
                  isError={errors?.fullname ? true : false}
                  errorMsg={errors?.fullname?.message}
                  isFocus={focusInput === 'fullname'}
                />
              )}
            />
            <Gap height={8} />
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
                  errorMsg={errors?.confirmPassword?.message}
                  isFocus={focusInput === 'confirmPassword'}
                />
              )}
            />
            <Gap height={14} />
            <Controller
              name="termsCondition"
              control={control}
              render={({field: {onChange, value}}) => (
                <TermAndConditions
                  handleOnPress={() => onChange(!value)}
                  active={value}
                  errorMsg={errors?.termsCondition?.message}
                  onTncPress={() =>
                    handleWebview(
                      'Terms Conditions',
                      'https://sunnysideup.io/marketplace/tos',
                    )
                  }
                  onPrivacyPress={() => {
                    handleWebview(
                      'Privacy Policy',
                      'https://sunnysideup.io/marketplace/privacy-policy',
                    );
                  }}
                />
              )}
            />
            <Gap height={20} />
            <Button
              label="Submit"
              textStyles={{fontSize: mvs(14)}}
              containerStyles={{width: '100%'}}
              onPress={handleSubmit(handleRegisterUser)}
            />
            <Gap height={4} />
            <Button
              label="Back"
              type="border"
              borderColor="transparent"
              textStyles={{fontSize: mvs(14), color: color.Pink.linear}}
              containerStyles={{width: '100%'}}
              onPress={handleOnPressBack}
            />
          </View>
          <View>
            <Text style={styles.forgotPassStyle}>
              Already have an Account?{' '}
              <Text
                onPress={() => handleOnPressSignIn()}
                style={{
                  fontFamily: font.InterRegular,
                  fontWeight: '700',
                  fontSize: mvs(12),
                }}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ModalLoading visible={isLoading} />
      <SsuToast
        modalVisible={ssoError}
        onBackPressed={() => setSsoError(false)}
        children={
          <View style={[styles.modalContainer]}>
            <Text style={[styles.textStyle]}>{ssoErrorMsg}</Text>
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.Dark[800],
  },
  scrollView: {
    paddingHorizontal: widthResponsive(48),
    paddingTop: heightResponsive(64),
    paddingBottom: heightResponsive(24),
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(20),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  wrapperLoginType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  verticalSeparatorLoginType: {
    width: ms(1),
    height: mvs(12),
    backgroundColor: color.Dark[500],
    marginLeft: ms(12),
    marginRight: ms(12),
  },
  loginTypeActive: {
    fontFamily: font.InterMedium,
    fontSize: mvs(12),
    color: color.Pink[2],
    lineHeight: mvs(14),
    fontWeight: '500',
  },
  loginTypeInactive: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    color: color.Neutral[10],
    lineHeight: mvs(14),
    fontWeight: '400',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    alignSelf: 'center',
    marginTop: heightResponsive(100),
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
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
