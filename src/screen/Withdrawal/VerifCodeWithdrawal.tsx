import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  SsuOTPInput,
  SsuOTPTimer,
  TopNavigation,
} from '../../components';
import {color, font} from '../../theme';
import {width, widthPercentage} from '../../utils';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {KeyboardShift} from '../../components/molecule/KeyboardShift';
import RenderMessage from '../../components/molecule/OtpInput/RenderMessage';

export const VerifCodeWithdrawalScreen: React.FC = () => {
  const timer = 30;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardShift>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Withdrawal.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{
            paddingHorizontal: widthPercentage(12),
          }}
        />

        <View
          style={{
            width: width * 0.9,
            marginTop: mvs(20),
          }}>
          <View style={styles.otpTitleContainer}>
            <Text style={styles.titleStyle}>
              {t('Withdrawal.VerifCode.VerificationCode')}
            </Text>
            <Gap height={16} />
            <Text style={styles.descStyle}>
              {t('Withdrawal.VerifCode.VerificationText', {
                email: 'lorem@gmail.com',
              })}
            </Text>
          </View>
          <Gap height={18} />
          <SsuOTPInput
            hideIcon
            onCodeFilled={(result, code) => {
              if (result) {
                // onCodeComplete(code);
              }
            }}
          />
          {/* {isError ? (
        <RenderMessage otpSuccess={isOtpValid ? true : false} />
      ) : null} */}

          {/* TODO: move out the props for success or error when resend otp */}
          <SsuOTPTimer action={() => {}} timer={timer} />
          <Gap height={4} />
          <Button
            type="border"
            label="Back"
            borderColor="transparent"
            textStyles={{fontSize: mvs(14), color: color.Success[400]}}
            containerStyles={{width: '100%'}}
            onPress={onPressGoBack}
          />
        </View>
      </View>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  otpTitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(20),
    color: color.Neutral[10],
    textAlign: 'center',
  },
  descStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
});
