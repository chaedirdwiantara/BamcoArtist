import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import AllTransaction from '../../components/molecule/Transaction/All';

type TransactionProps = NativeStackScreenProps<RootStackParams, 'Transaction'>;

export const Transaction: React.FC<TransactionProps> = ({
  navigation,
}: TransactionProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Transaction.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />

      <AllTransaction />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: heightPercentage(16),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Dark[300],
    marginHorizontal: widthPercentage(10),
  },
});
