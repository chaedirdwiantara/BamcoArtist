import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {TopUpCreditContent} from '../../components';
import {usePlayerStore} from '../../store/player.store';
import {TransactionHistoryPropsType} from '../../interface/credit.interface';

export const TopUpCreditScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const onPressWithdrawal = () => {
    navigation.navigate('Withdrawal');
  };

  const goToDetailTransaction = (dataDetail: TransactionHistoryPropsType) => {
    navigation.navigate('DetailHistoryTransaction', {dataDetail});
  };

  return (
    <View style={styles.root}>
      <TopUpCreditContent
        onPressGoBack={onPressGoBack}
        onPressWithdrawal={onPressWithdrawal}
        goToDetailTransaction={goToDetailTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
