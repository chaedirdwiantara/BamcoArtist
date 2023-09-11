import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color, font, typography} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {width, widthPercentage} from '../../utils';
import {Button, TopNavigation} from '../../components';
import {CardBankAccount} from '../../components/molecule/Withdrawal/CardBankAccount';

export const WithdrawalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAddBankAccount = () => {
    navigation.navigate('AddBankAccount');
  };

  const goToEditBankAccount = () => {
    navigation.navigate('EditBankAccount');
  };

  const goToInputWithdrawal = () => {
    navigation.navigate('InputWithdrawal');
  };

  const goToVerifCode = () => {
    navigation.navigate('VerifCodeWithdrawal');
  };

  // only enable on the 14th and 28th of each month
  const getDate = new Date().getDate();
  const enabledButton = getDate === 14 || getDate === 28;

  return (
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

      <CardBankAccount
        haveBankAccount={false}
        number={'50352657444'}
        bankName={'Bank Central Asia (BCA)'}
        goToEditBankAccount={goToAddBankAccount}
        containerStyles={{marginTop: mvs(20)}}
      />

      <View style={styles.containerEmptyState}>
        <Text style={styles.titleEmptyState}>
          {t('Withdrawal.BankAccount.BankAccount')}
        </Text>
        <Text style={styles.subtitleEmptyState}>
          {t('Withdrawal.BankAccount.EmptyState')}
        </Text>
        <Button
          label={t('Withdrawal.BankAccount.AddBankAccount')}
          textStyles={{fontSize: mvs(11), fontFamily: font.InterMedium}}
          containerStyles={styles.btnAddBankAcc}
          onPress={goToAddBankAccount}
        />
      </View>

      <View style={styles.footerContent}>
        <Text style={styles.textWithdrawCredits}>
          {t('Withdrawal.InputWithdrawal.WithdrawCredits')}
        </Text>
        <View style={styles.containerInfo}>
          <Text style={[typography.Body2, styles.textCreditWithdraw]}>
            {t('Withdrawal.InputWithdrawal.CreditToWithdraw')}
          </Text>
          <Text style={[typography.Subtitle2, styles.valueCreditWithdraw]}>
            {'0'}
          </Text>
        </View>
        <View
          style={[
            styles.containerInfo,
            {
              paddingVertical: mvs(5),
            },
          ]}>
          <Text style={[typography.Body2, styles.textTotalConversion]}>
            {t('Withdrawal.InputWithdrawal.TotalConversion')}
          </Text>
          <Text style={[typography.Subtitle2, styles.valueTotalConversion]}>
            {'0'}
          </Text>
        </View>
        <Button
          label={t('TopUp.ButtonWithdraw')}
          disabled={!enabledButton}
          textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
          containerStyles={
            !enabledButton ? styles.btnDisabled : styles.btnContainer
          }
          onPress={goToVerifCode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  containerEmptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btnAddBankAcc: {
    width: width * 0.35,
    aspectRatio: mvs(109 / 24),
    backgroundColor: color.Pink[2],
  },
  titleEmptyState: {
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(20),
  },
  subtitleEmptyState: {
    maxWidth: width * 0.8,
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    textAlign: 'center',
    color: color.Neutral[10],
    marginTop: mvs(5),
    marginBottom: mvs(15),
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(15),
    marginBottom: mvs(15),
    // position: 'absolute',
    // bottom: mvs(15),
  },
  btnDisabled: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(15),
    marginBottom: mvs(15),
    // position: 'absolute',
    // bottom: mvs(15),
    backgroundColor: color.Dark[50],
  },
  footerContent: {
    width,
    // position: 'absolute',
    // bottom: 0,
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(20),
    backgroundColor: color.Dark[600],
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWithdrawCredits: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
    marginBottom: mvs(15),
  },
  textCreditWithdraw: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
  },
  valueCreditWithdraw: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
  },
  textTotalConversion: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
  },
  valueTotalConversion: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
  },
});
