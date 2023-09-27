import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Gap,
  ModalSuccess,
  SsuOTPInput,
  SsuOTPTimer,
  TopNavigation,
} from '../../components';
import {color, font} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {width, widthPercentage} from '../../utils';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {useWithdrawHook} from '../../hooks/use-withdraw.hook';
import {KeyboardShift} from '../../components/molecule/KeyboardShift';
import RenderMessage from '../../components/molecule/OtpInput/RenderMessage';

type WithdrawalProps = NativeStackScreenProps<
  RootStackParams,
  'VerifCodeWithdrawal'
>;

export const VerifCodeWithdrawalScreen: React.FC<WithdrawalProps> = ({
  route,
  navigation,
}: WithdrawalProps) => {
  const {type, data, idWithdraw} = route.params;

  const timer = 59;
  const {t} = useTranslation();
  const email = profileStorage()?.email;
  const {isError, isLoading, isOtpValid, confirmOtpBank, confirmOtpWithdraw} =
    useWithdrawHook();
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>('');
  const [subtitleModal, setSubtitleModal] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');

  // to show modal success
  useEffect(() => {
    if (isOtpValid) {
      setShowModalSuccess(true);
      if (type === 'withdraw') {
        // first time withdraw
        if (data?.countWithdraw === 0) {
          setTitleModal('Withdrawal.ModalSuccess.Title');
          setSubtitleModal('Withdrawal.ModalSuccess.SubtitleFirstTime');
          setButtonText('Withdrawal.ModalSuccess.ButtonText');
        } else {
          setTitleModal('Withdrawal.ModalSuccess.Title');
          setSubtitleModal('Withdrawal.ModalSuccess.SubtitleNextWithdraw');
          setButtonText('Withdrawal.ModalSuccess.ButtonText');
        }
      } else {
        if (type === 'add') {
          setTitleModal('Withdrawal.ModalSuccess.CreateWithdrawalAccount');
          setSubtitleModal('');
          setButtonText('General.Dismiss');
        } else if (type === 'edit') {
          setTitleModal('Withdrawal.ModalSuccess.EditWithdrawalAccount');
          setSubtitleModal('');
          setButtonText('General.Dismiss');
        } else {
          setTitleModal('Withdrawal.ModalSuccess.DeleteWithdrawalAccount');
          setSubtitleModal('');
          setButtonText('General.Dismiss');
        }
      }
    }
  }, [data, isLoading, isOtpValid, type]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const verifBankAccount = async (otp: string) => {
    // type add & edit isActive = true, delete isActive = false
    // type edit must send previous bank id
    const payload = {
      id: data?.bankId || 0,
      isActive: type !== 'delete',
      code: otp,
      previousBank: type === 'edit' ? data?.previousBankId || 0 : 0,
    };
    try {
      await confirmOtpBank(payload);
    } catch (error) {}
  };

  const verifWithdrawReq = async (otp: string) => {
    const payload = {
      id: idWithdraw || 0,
      code: otp,
    };
    try {
      await confirmOtpWithdraw(payload);
    } catch (error) {}
  };

  const onCodeComplete = async (otp: string) => {
    type === 'withdraw' ? verifWithdrawReq(otp) : verifBankAccount(otp);
  };

  const onPressModalSuccess = () => {
    if (type === 'withdraw') {
      storage.set('withdrawIndex', 2);
      navigation.navigate('TopUpCredit');
    } else {
      navigation.navigate('Withdrawal');
    }
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
            <RenderMessage
              otpSuccess={isOtpValid ? true : false}
              valMessage={t('Withdrawal.VerifCode.Rejected') || ''}
            />
          ) : null}

          <SsuOTPTimer
            action={() => {}}
            timer={timer}
            timerText={t('Withdrawal.VerifCode.ResendAfter') || ''}
          />
          <Gap height={4} />
        </View>

        <ModalSuccess
          title={t(titleModal)}
          subtitle={t(subtitleModal) || ''}
          buttonText={t(buttonText)}
          modalVisible={showModalSuccess}
          onPress={onPressModalSuccess}
        />
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
