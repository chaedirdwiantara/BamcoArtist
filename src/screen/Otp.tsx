import React, {FC, useEffect} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SsuSheet from '../components/atom/SsuSheet';
import {Button, Gap, SsuOTPInput, SsuOTPTimer} from '../components';
import {normalize, widthResponsive} from '../utils';
import {color, font} from '../theme';
import {RootStackParams} from '../navigations';
import {useAuthHook} from '../hooks/use-auth.hook';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';
import RenderMessage from '../components/molecule/OtpInput/RenderMessage';
import {SSULogo} from '../assets/logo';

const {width, height} = Dimensions.get('screen');

type OtpProps = NativeStackScreenProps<RootStackParams, 'Otp'>;

export const Otp: FC<OtpProps> = ({navigation, route}: OtpProps) => {
  const timer = 12;
  const {
    isError,
    errorMsg,
    isOtpValid,
    isLoading,
    loginResult,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
  } = useAuthHook();

  useEffect(() => {
    if (!isLoading && !isError && isOtpValid === true) {
      if (loginResult === 'preference') {
        navigation.replace('Preference');
      } else if (loginResult === 'home') {
        navigation.replace('MainTab');
      }
    } else if (!isLoading && isError && errorMsg !== '') {
      // TODO: display error message
    }
  }, [isError, errorMsg, isOtpValid, isLoading, loginResult]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onCodeComplete = (code: string) => {
    if (route.params.type === 'email') {
      confirmEmailOtp(route.params.id, code);
    } else if (route.params.type === 'phoneNumber') {
      confirmSmsOtp(route.params.id, code);
    }
  };

  const onResendOTP = () => {
    if (route.params.type === 'email') {
      sendOtpEmail(route.params.id);
    } else if (route.params.type === 'phoneNumber') {
      sendOtpSms(route.params.id);
    }
  };

  const children = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>{route.params.title}</Text>
          <Gap height={16} />
          <Text style={styles.descStyle}>{route.params.subtitle}</Text>
        </View>
        <Gap height={18} />
        <SsuOTPInput
          hideIcon
          onCodeFilled={(result, code) => {
            if (result) {
              onCodeComplete(code);
            }
          }}
        />
        {isError ? (
          <RenderMessage otpSuccess={isOtpValid ? true : false} />
        ) : null}

        {/* TODO: move out the props for success or error when resend otp */}
        <SsuOTPTimer action={onResendOTP} timer={timer} />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleBack}
        />
      </>
    );
  };

  const topChild = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: widthResponsive(48),
        }}>
        <SSULogo />
        <Text style={styles.titleStyle}>Begin Today</Text>
        <Gap height={12} />
        <Text style={[styles.descStyle, {textAlign: 'center'}]}>
          Sign in or Register to explore full features and support the musician
        </Text>
        <Gap height={160} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <Image
          source={require('../assets/background/signin-guest.png')}
          style={styles.image}
        />
        <SsuSheet children={children()} topChild={topChild()} />
        <ModalLoading visible={isLoading} />
      </View>
    </KeyboardAvoidingView>
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
    fontSize: mvs(20),
    color: color.Neutral[10],
  },
  descStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    lineHeight: mvs(12),
  },
  otpTitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
