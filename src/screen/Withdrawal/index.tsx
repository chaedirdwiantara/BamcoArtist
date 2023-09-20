import React, {useCallback, useEffect, useState} from 'react';
import {InteractionManager, StyleSheet, Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  width,
  kFormatter,
  convertToHKD,
  widthPercentage,
  heightPercentage,
} from '../../utils';
import {RootStackParams} from '../../navigations';
import {color, font, typography} from '../../theme';
import {removeBankAccount} from '../../api/withdraw.api';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {ArrowLeftIcon, CoinDIcon} from '../../assets/icon';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useWithdrawHook} from '../../hooks/use-withdraw.hook';
import {Button, Gap, ModalConfirm, TopNavigation} from '../../components';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {CardBankAccount} from '../../components/molecule/Withdrawal/CardBankAccount';

export const WithdrawalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {dataBankUser, getUserBankAccount} = useWithdrawHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [totalCredit, setTotalCredit] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);

  // get credit user
  useEffect(() => {
    getCreditCount();
  }, []);

  // get bank account user
  useFocusEffect(
    useCallback(() => {
      const uuid = profileStorage()?.uuid;
      getUserBankAccount({uuid});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToCreateBankAccount = (type: string) => {
    navigation.navigate('NewBankAccount', {type, data: dataBankUser});
  };

  const goToVerifCode = () => {
    navigation.navigate('VerifCodeWithdrawal', {
      type: 'withdraw',
      data: dataBankUser,
    });
  };

  const deleteBankAccount = async () => {
    setShowModal(false);
    InteractionManager.runAfterInteractions(() => setLoadingDelete(true));
    try {
      await removeBankAccount({id: dataBankUser?.bankId});

      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
      // navigate to otp screen when success
      navigation.navigate('VerifCodeWithdrawal', {
        type: 'delete',
        data: dataBankUser,
      });
    } catch (error) {
      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
    }
  };

  // only enable on the 14th and 28th of each month
  const getDate = new Date().getDate();
  const enabledButton = getDate === 14 || getDate === 28;

  // active border color, when focus is true
  const activeColor = focusInput ? color.Pink[200] : color.Dark[500];
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
        number={dataBankUser?.accountNumber}
        bankName={dataBankUser?.bankName}
        goToEditBankAccount={() => goToCreateBankAccount('edit')}
        onPressRemove={() => setShowModal(true)}
        containerStyles={{marginTop: mvs(20)}}
      />

      {/* // show if user have bank account */}
      {dataBankUser !== null && dataBankUser !== undefined && (
        <View>
          <View style={styles.containerCoin}>
            <Text style={styles.textMyCredit}>{t('TopUp.MyCoin')}</Text>
            <View style={{flexDirection: 'row'}}>
              <CoinDIcon
                style={{
                  width: widthPercentage(18),
                  height: heightPercentage(18),
                }}
              />
              <Gap width={widthPercentage(5)} />
              <Text style={styles.amountMyCredit}>
                {kFormatter(creditCount, 1)}
              </Text>
            </View>
          </View>
          <Text style={styles.textLabelInput}>
            {t('Withdrawal.InputWithdrawal.InputWithdrawalAmount')}
          </Text>
          <View style={[styles.containerInput, {borderColor: activeColor}]}>
            <View style={{width: '10%'}}>
              <CoinDIcon
                style={{
                  width: widthPercentage(18),
                  height: heightPercentage(18),
                }}
              />
            </View>
            <TextInput
              style={{
                width: '90%',
                color: color.Neutral[10],
              }}
              value={totalCredit}
              keyboardType={'number-pad'}
              textAlign="right"
              placeholder={t('Withdrawal.InputWithdrawal.InputAmount') || ''}
              placeholderTextColor={color.Dark[300]}
              onFocus={() => {
                setFocusInput(true);
              }}
              onBlur={() => {
                setFocusInput(false);
              }}
              onChangeText={value => {
                // only accept number without leading zeros
                if (value !== '0') setTotalCredit(value.replace(/[^0-9]/g, ''));
              }}
            />
          </View>
        </View>
      )}

      {/* // show if user don't have bank account */}
      <View style={styles.containerEmptyState}>
        {(dataBankUser === null || dataBankUser === undefined) && (
          <>
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
              onPress={() => goToCreateBankAccount('add')}
            />
          </>
        )}
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
            {totalCredit || 0}
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
            {convertToHKD(Number(totalCredit))}
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

        <ModalConfirm
          modalVisible={showModal}
          title={t('Withdrawal.DeleteBankAccount.ModalConfirm.Title') || ''}
          subtitle={
            t('Withdrawal.DeleteBankAccount.ModalConfirm.Subtitle') || ''
          }
          onPressClose={() => setShowModal(false)}
          onPressOk={deleteBankAccount}
        />

        <ModalLoading visible={isLoadingDelete} />
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
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: mvs(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(13),
    marginVertical: mvs(20),
    backgroundColor: color.Dark[600],
  },
  textMyCredit: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Neutral[10],
  },
  amountMyCredit: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(14),
    color: color.Neutral[10],
  },
  textLabelInput: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    marginBottom: mvs(10),
    fontSize: mvs(12),
  },
  containerInput: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: mvs(1),
    paddingHorizontal: widthPercentage(15),
    paddingVertical: mvs(12),
    borderRadius: mvs(4),
  },
});
