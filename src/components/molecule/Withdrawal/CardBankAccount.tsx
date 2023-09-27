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

import {Gap} from '../../atom';
import {width, widthPercentage} from '../../../utils';
import {color, font, typography} from '../../../theme';
import {EditIcon, TrashIcon} from '../../../assets/icon';

interface CardBankAccountProps {
  number?: string;
  bankName?: string;
  goToEditBankAccount?: () => void;
  onPressRemove?: () => void;
  containerStyles?: ViewStyle;
}

export const CardBankAccount: React.FC<CardBankAccountProps> = ({
  number,
  bankName,
  goToEditBankAccount,
  onPressRemove,
  containerStyles,
}) => {
  const {t} = useTranslation();

  return (
    <View style={containerStyles}>
      <View style={styles.containerFirstSection}>
        <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
          {t('Withdrawal.BankAccount.BankAccount')}
        </Text>
        {bankName && (
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={goToEditBankAccount}>
              <EditIcon
                stroke={color.Pink[2]}
                width={widthPercentage(21)}
                height={widthPercentage(21)}
              />
            </TouchableOpacity>
            <Gap width={widthPercentage(10)} />
            <TouchableOpacity onPress={onPressRemove}>
              <TrashIcon
                width={widthPercentage(23)}
                height={widthPercentage(23)}
                stroke={color.Pink[2]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.containerSecondSection}>
        <Text style={[typography.Caption, styles.numberTitleStyle]}>
          {t('Withdrawal.BankAccount.Number')}
        </Text>
        <Text style={[typography.Caption, styles.bankNameTitleStyle]}>
          {t('Withdrawal.BankAccount.BankName')}
        </Text>
      </View>

      {bankName && (
        <View style={styles.containerItemBank}>
          <Text style={[typography.Caption, styles.numberValueStyle]}>
            {number}
          </Text>
          <Text style={[typography.Caption, styles.bankNameValueStyle]}>
            {bankName}
          </Text>
        </View>
      )}
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
    paddingVertical: mvs(15),
    paddingHorizontal: mvs(15),
    backgroundColor: 'transparent',
    borderWidth: mvs(1),
    borderColor: '#282F3C',
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
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
