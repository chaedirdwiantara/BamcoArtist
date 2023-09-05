import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color, font} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {width, widthPercentage} from '../../utils';
import {Button, TopNavigation} from '../../components';
import {CardBankAccount} from '../../components/molecule/Withdrawal/CardBankAccount';

export const WithdrawalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const [selectedBank, setSelectedBank] = useState<number>(-1);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAddBankAccount = () => {
    navigation.navigate('AddBankAccount');
  };

  const goToEditBankAccount = () => {
    navigation.navigate('EditBankAccount');
  };

  const goToInputWithdrawal = () => {
    navigation.navigate('InputWithdrawal');
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

      <CardBankAccount
        number={'50352657444'}
        bankName={'Bank Central Asia (BCA)'}
        selectedBank={selectedBank}
        goToEditBankAccount={goToEditBankAccount}
        containerStyles={{marginTop: mvs(20)}}
      />

      <Button
        label={t('Btn.Continue')}
        disabled={selectedBank === -1}
        textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
        containerStyles={
          selectedBank === -1 ? styles.btnDisabled : styles.btnContainer
        }
        onPress={goToInputWithdrawal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(5),
    marginBottom: mvs(15),
    position: 'absolute',
    bottom: mvs(15),
  },
  btnDisabled: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginTop: mvs(5),
    marginBottom: mvs(15),
    position: 'absolute',
    bottom: mvs(15),
    backgroundColor: color.Dark[50],
  },
});
