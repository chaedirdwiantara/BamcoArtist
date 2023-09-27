import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Button} from '../../atom';
import {width} from '../../../utils';
import {color, font} from '../../../theme';

interface EmptyStateWithdrawProps {
  onPress: () => void;
  containerStyles?: ViewStyle;
}

export const EmptyStateWithdraw: React.FC<EmptyStateWithdrawProps> = ({
  onPress,
  containerStyles,
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.containerEmptyState, containerStyles]}>
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
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
