import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color, font} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {width, widthPercentage} from '../../utils';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useWithdrawHook} from '../../hooks/use-withdraw.hook';
import {KeyboardShift} from '../../components/molecule/KeyboardShift';
import RenderMessage from '../../components/molecule/OtpInput/RenderMessage';
import {Gap, SsuOTPInput, SsuOTPTimer, TopNavigation} from '../../components';

type WithdrawalProps = NativeStackScreenProps<
  RootStackParams,
  'VerifCodeWithdrawal'
>;

export const VerifCodeWithdrawalScreen: React.FC<WithdrawalProps> = ({
  route,
  navigation,
}: WithdrawalProps) => {
  const {type, data} = route.params;
  const timer = 30;
  const {t} = useTranslation();
  const email = profileStorage()?.email;
  const {isError, isOtpValid, confirmOtp} = useWithdrawHook();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onCodeComplete = async (otp: string) => {
    // type add & edit isActive = true, delete isActive = false
    // type edit must send previous bank id
    const payload = {
      id: data?.bankId || 0,
      isActive: type !== 'delete',
      code: otp,
      previousBank: type === 'edit' ? data?.previousBankId || 0 : 0,
    };
    try {
      await confirmOtp(payload);
      navigation.navigate('Withdrawal');
    } catch (error) {}
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
              {t('Withdrawal.VerifCode.VerificationText', {email})}
            </Text>
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

          <SsuOTPTimer action={() => {}} timer={timer} />
          <Gap height={4} />
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
    justifyContent: 'center',
    alignItems: 'center',
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
