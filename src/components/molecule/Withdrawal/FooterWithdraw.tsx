import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Button} from '../../atom';
import {convertToHKD, width} from '../../../utils';
import {color, font, typography} from '../../../theme';

interface FooterWithdrawProps {
  totalCredit: string;
  enabledButton: boolean;
  onPress: () => void;
  containerStyles?: ViewStyle;
}

export const FooterWithdraw: React.FC<FooterWithdrawProps> = ({
  totalCredit,
  enabledButton,
  onPress,
  containerStyles,
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.footerContent, containerStyles]}>
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
          {convertToHKD(Number(totalCredit), true)}
        </Text>
      </View>
      <Button
        label={t('TopUp.ButtonWithdraw')}
        disabled={!enabledButton}
        textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
        containerStyles={
          !enabledButton ? styles.btnDisabled : styles.btnContainer
        }
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContent: {
    width,
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
  btnContainer: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(15),
    marginBottom: mvs(15),
  },
  btnDisabled: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(15),
    marginBottom: mvs(15),
    backgroundColor: color.Dark[50],
  },
});
