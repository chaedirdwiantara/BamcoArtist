import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {color, font} from '../theme';
import {normalize} from '../utils';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import SsuSheet from '../components/atom/SsuSheet';
import {Button, Gap, SsuInput, SsuOTPInput, SsuOTPTimer} from '../components';
import {EmailIcon, LockIcon} from '../assets/icon';

const {width, height} = Dimensions.get('screen');
interface ForgotPasswordProps {
  userCredentials?: string;
  timer?: number;
}

export const ForgotPassword: FC<ForgotPasswordProps> = (
  props: ForgotPasswordProps,
) => {
  const {userCredentials = 'name@domain.com', timer = 12} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [page, setPage] = useState('emailInput');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState(false);

  const handleSubmitEmail = () => {
    // navigation.navigate('Otp');
    setPage('otp');
  };
  const handleOnPressBack = () => {
    navigation.goBack();
  };
  const handleOtpBack = () => {
    setPage('emailInput');
  };
  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };
  const handleOnPressButtonSignIn = () => {
    navigation.navigate('SignInGuest');
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
        <SsuInput.InputText
          value={email}
          onChangeText={(newText: any) => setEmail(newText)}
          placeholder={'Enter your email'}
          leftIcon={<EmailIcon stroke={color.Dark[50]} />}
        />
        <Gap height={24} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmitEmail}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressBack}
        />
        <Gap height={30} />
        <Text style={styles.forgotPassStyle}>
          Already have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignIn()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: normalize(12),
              lineHeight: mvs(16),
            }}>
            Sign In
          </Text>
        </Text>
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
          <Text style={styles.descStyle}>{userCredentials}</Text>
        </View>

        <Gap height={16} />
        <SsuOTPInput
          hideIcon
          // showMessage
          // otpSuccess={true}
          onCodeChanged={code => console.log(code)}
          onCodeFilled={(result, code) => {
            if (result) {
              console.log(code);
            }
          }}
        />
        {/* <Gap height={24} /> */}
        <SsuOTPTimer action={() => {}} timer={timer} />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOtpBack}
        />
        <Gap height={30} />
        <Text style={styles.forgotPassStyle}>
          Already have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignIn()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: normalize(12),
              lineHeight: mvs(16),
            }}>
            Sign In
          </Text>
        </Text>
      </>
    );
  };

  //   New Password
  const newPass = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>Input New Password</Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>
            Enter the recovery code we just sent to
          </Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>{userCredentials}</Text>
        </View>

        <Gap height={16} />
        <SsuInput.InputText
          value={password}
          onChangeText={(newText: any) => setPassword(newText)}
          placeholder={'Password'}
          leftIcon={<LockIcon stroke={color.Dark[50]} />}
          password
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={repeat}
          onChangeText={(newText: any) => setRepeat(newText)}
          placeholder={'Repeat Password'}
          isError={error}
          errorMsg={'Incorrect username or password'}
          leftIcon={<LockIcon stroke={color.Dark[50]} />}
          password
        />
        <Gap height={20} />
        <Button
          label="Sign In"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressButtonSignIn}
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
          page === 'otp'
            ? otp()
            : page === 'newPass'
            ? newPass()
            : page === 'emailInput'
            ? emailInput()
            : emailInput()
        }
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
