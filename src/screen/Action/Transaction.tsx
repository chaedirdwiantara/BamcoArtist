import {View, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import AllTransaction from '../../components/molecule/Transaction/All';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useFocusEffect} from '@react-navigation/native';
import {getBookyayToken} from '../../service/refreshBookyayToken';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type TransactionProps = NativeStackScreenProps<RootStackParams, 'Transaction'>;

export const Transaction: React.FC<TransactionProps> = ({
  navigation,
}: TransactionProps) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      getBookyayToken();
      setLoading(false);
    }, []),
  );

  const bookyayToken = profileStorage()?.bookyayToken;

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Transaction.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />

      {loading ? (
        <ModalLoading visible={loading} />
      ) : (
        <AllTransaction token={bookyayToken || ''} />
      )}
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
