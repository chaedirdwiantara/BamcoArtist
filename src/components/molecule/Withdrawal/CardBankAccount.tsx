import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {color, font, typography} from '../../../theme';
import {EditIcon} from '../../../assets/icon';
import {width, widthPercentage} from '../../../utils';

interface CardBankAccountProps {
  number: string;
  bankName: string;
  selectedBank: number;
  onPressSelectedBank: (param: number) => void;
  goToAddBankAccount: () => void;
  goToEditBankAccount: () => void;
  containerStyles?: ViewStyle;
}

export const CardBankAccount: React.FC<CardBankAccountProps> = ({
  number,
  bankName,
  selectedBank,
  onPressSelectedBank,
  goToAddBankAccount,
  goToEditBankAccount,
  containerStyles,
}) => {
  const {t} = useTranslation();

  return (
    <View style={containerStyles}>
      <View style={styles.containerFirstSection}>
        <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
          {t('Withdrawal.BankAccount.ChooseAccount')}
        </Text>
        <TouchableOpacity onPress={goToAddBankAccount}>
          <Text style={[typography.Button2, {color: color.Pink[2]}]}>
            {`+ ${t('Withdrawal.BankAccount.AddAccount')}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerSecondSection}>
        <Text style={[typography.Caption, styles.numberTitleStyle]}>
          {t('Withdrawal.BankAccount.Number')}
        </Text>
        <Text style={[typography.Caption, styles.bankNameTitleStyle]}>
          {t('Withdrawal.BankAccount.BankName')}
        </Text>
        <Text style={[typography.Caption, styles.actionTitleStyle]}>
          {t('Withdrawal.BankAccount.Action')}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.containerItemBank,
          {
            backgroundColor:
              selectedBank === 0 ? color.Success[500] : color.Dark[600],
          },
        ]}
        onPress={() => onPressSelectedBank(0)}>
        <Text style={[typography.Caption, styles.numberValueStyle]}>
          {number}
        </Text>
        <Text style={[typography.Caption, styles.bankNameValueStyle]}>
          {bankName}
        </Text>
        <TouchableOpacity
          style={styles.editIconStyle}
          onPress={goToEditBankAccount}>
          <EditIcon width={widthPercentage(20)} height={widthPercentage(20)} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFirstSection: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(15),
    backgroundColor: color.Dark[500],
    paddingVertical: mvs(12),
  },
  containerSecondSection: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(15),
    backgroundColor: color.Dark[400],
    paddingVertical: mvs(8),
  },
  numberTitleStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '38%',
  },
  bankNameTitleStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '47%',
  },
  actionTitleStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '15%',
  },
  containerItemBank: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mvs(18),
    paddingHorizontal: mvs(15),
  },
  numberValueStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '38%',
  },
  bankNameValueStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '47%',
  },
  editIconStyle: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
