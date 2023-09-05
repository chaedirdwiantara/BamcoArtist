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
  number?: string;
  bankName?: string;
  selectedBank: number;
  goToEditBankAccount: () => void;
  containerStyles?: ViewStyle;
}

export const CardBankAccount: React.FC<CardBankAccountProps> = ({
  number,
  bankName,
  selectedBank,
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
        <TouchableOpacity onPress={goToEditBankAccount}>
          <EditIcon
            stroke={color.Pink[2]}
            width={widthPercentage(20)}
            height={widthPercentage(20)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerSecondSection}>
        <Text style={[typography.Caption, styles.numberTitleStyle]}>
          {t('Withdrawal.BankAccount.Number')}
        </Text>
        <Text style={[typography.Caption, styles.bankNameTitleStyle]}>
          {t('Withdrawal.BankAccount.BankName')}
        </Text>
      </View>

      <View
        style={[
          styles.containerItemBank,
          {
            backgroundColor:
              selectedBank === 0 ? color.Success[500] : color.Dark[600],
          },
        ]}>
        <Text style={[typography.Caption, styles.numberValueStyle]}>
          {number}
        </Text>
        <Text style={[typography.Caption, styles.bankNameValueStyle]}>
          {bankName}
        </Text>
      </View>
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
    width: '40%',
  },
  bankNameTitleStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '55%',
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
    width: '40%',
  },
  bankNameValueStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    width: '55%',
  },
});
