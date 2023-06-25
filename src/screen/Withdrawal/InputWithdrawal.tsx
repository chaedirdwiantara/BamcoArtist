import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigations';
import {color, font, typography} from '../../theme';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {ArrowLeftIcon, CoinDIcon} from '../../assets/icon';
import {Button, Gap, TopNavigation} from '../../components';
import {kFormatter, width, widthPercentage} from '../../utils';

export const InputWithdrawalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {creditCount, getCreditCount} = useCreditHook();

  useEffect(() => {
    getCreditCount();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToVerifCode = () => {
    navigation.navigate('VerifCodeWithdrawal');
  };

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

      <View style={styles.containerCoin}>
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          {t('TopUp.MyCoin')}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <CoinDIcon />
          <Gap width={widthPercentage(5)} />
          <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
            {kFormatter(creditCount, 1)}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={[
            typography.Caption,
            {
              color: color.Dark[50],
              fontFamily: font.InterRegular,
            },
          ]}>
          {t('Withdrawal.InputWithdrawal.InputWithdrawalAmount')}
        </Text>
        <TextInput keyboardType={'number-pad'} />
      </View>

      <View
        style={{
          paddingTop: mvs(20),
        }}>
        <View style={styles.containerInfoBank}>
          <Text style={[typography.Caption, styles.numberTitleStyle]}>
            {t('Withdrawal.BankAccount.AccountNumber')}
          </Text>
          <Text style={[typography.Caption, styles.bankNameTitleStyle]}>
            {t('Withdrawal.BankAccount.BankName')}
          </Text>
        </View>

        <View style={styles.containerValueBank}>
          <Text style={[typography.Subtitle1, styles.numberValueStyle]}>
            {'50352657444'}
          </Text>
          <Text style={[typography.Subtitle1, styles.bankNameValueStyle]}>
            {'Bank Central Asia (BCA)'}
          </Text>
        </View>
      </View>

      <View style={styles.footerContent}>
        <View style={styles.containerInfo}>
          <Text style={[typography.Body1, styles.textCreditWithdraw]}>
            {t('Withdrawal.InputWithdrawal.CreditToWithdraw')}
          </Text>
          <Text style={[typography.Subtitle1, styles.valueCreditWithdraw]}>
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
          <Text style={[typography.Body1, styles.textTotalConversion]}>
            {t('Withdrawal.InputWithdrawal.TotalConversion')}
          </Text>
          <Text style={[typography.Subtitle1, styles.valueTotalConversion]}>
            {'0'}
          </Text>
        </View>
        <Button
          label={t('TopUp.ButtonWithdraw')}
          textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
          containerStyles={styles.btnContainer}
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
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: mvs(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(15),
    marginVertical: mvs(20),
    backgroundColor: color.Dark[600],
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(15),
    marginBottom: mvs(10),
    alignSelf: 'center',
  },
  containerInfoBank: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberTitleStyle: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    width: '40%',
  },
  bankNameTitleStyle: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    width: '60%',
  },
  containerValueBank: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: mvs(8),
  },
  numberValueStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '40%',
  },
  bankNameValueStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '60%',
  },
  footerContent: {
    width,
    position: 'absolute',
    bottom: 0,
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(20),
    backgroundColor: color.Dark[600],
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCreditWithdraw: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
  },
  valueCreditWithdraw: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
  textTotalConversion: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
  },
  valueTotalConversion: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
  },
});
