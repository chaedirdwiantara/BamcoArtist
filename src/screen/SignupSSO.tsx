import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Gap, SsuInput} from '../components/atom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RegistrationType} from '../interface/profile.interface';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {FullNameIcon, LockIcon} from '../assets/icon';
import {color, font} from '../theme';
import {SsuStatusBar, TermAndConditions} from '../components';
import {heightResponsive, widthResponsive} from '../utils';
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

type RegisterProps = NativeStackScreenProps<RootStackParams, 'SignupSSO'>;

export const SignupSSOScreen: React.FC<RegisterProps> = ({
  navigation,
  route,
}: RegisterProps) => {
  const {isLoading, isError, authResult, errorMsg, onRegisterUser} =
    useAuthHook();
  const [focusInput, setFocusInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerValidation),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      password: '',
      confirmPassword: '',
      registrationType: 'apple',
      termsCondition: false,
    },
  });

  const handleRegisterUser: SubmitHandler<RegisterInput> = data => {
    onRegisterUser({
      fullname: data.fullname,
      password: data.password,
      registrationType: route.params?.ssoType,
      email: route.params?.email,
      image: 'https://picsum.photos/200',
      externalUserID: route.params?.ssoId,
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && authResult !== null) {
      storage.set('profile', JSON.stringify(authResult.data));
      storage.set('isLogin', true);
      navigation.replace('Preference');
    } else if (!isLoading && isError !== null) {
      setError('termsCondition', {
        type: 'value',
        message: errorMsg,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, authResult]);

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const handleFocusInput = (focus: string | null) => {
    setFocusInput(focus);
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

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
                  placeholder={'Repeat Password'}
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
        </ScrollView>
      </KeyboardAvoidingView>
      <ModalLoading visible={isLoading} />
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
});
