import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, InteractionManager} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ModalConfirm,
  TopNavigation,
  CardBankAccount,
  CardTotalCredit,
  EmptyStateWithdraw,
  FooterWithdraw,
  InputWithdrawal,
} from '../../components';
import {color} from '../../theme';
import {widthPercentage} from '../../utils';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import useKeyboard from '../../utils/useKeyboard';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useWithdrawHook} from '../../hooks/use-withdraw.hook';
import {KeyboardShift} from '../../components/molecule/KeyboardShift';
import {BankAccountPropsType} from '../../interface/withdraw.interface';
import {removeBankAccount, withdrawRequest} from '../../api/withdraw.api';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

export const WithdrawalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const isKeyboardOpen = useKeyboard();
  const {getUserBankAccount} = useWithdrawHook();

  const {creditCount, getCreditCount} = useCreditHook();
  const [totalCredit, setTotalCredit] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [dataBankUser, setDataBankUser] = useState<BankAccountPropsType>();

  // get credit user
  useEffect(() => {
    getCreditCount();
  }, []);

  // get bank account user
  const {
    data: dataBank,
    isLoading,
    status,
    refetch,
  } = useQuery({
    queryKey: ['bank-account-withdraw'],
    queryFn: () => getUserBankAccount({uuid: profileStorage()?.uuid}),
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  // save bank account to local state
  useFocusEffect(
    useCallback(() => {
      if (status === 'success' && dataBank?.data) {
        setDataBankUser({...dataBank?.data});
      } else {
        setDataBankUser(undefined);
      }
    }, [status, dataBank]),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToCreateBankAccount = (type: string) => {
    navigation.navigate('NewBankAccount', {type, data: dataBankUser});
  };

  const goToVerifCode = async () => {
    setShowModal(false);
    InteractionManager.runAfterInteractions(() => setLoadingDelete(true));
    try {
      const payload = {
        userId: profileStorage()?.uuid || '',
        bankId: dataBankUser?.bankId || 0,
        creditAmount: Number(totalCredit),
      };
      const response = await withdrawRequest(payload);

      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
      // navigate to otp screen when success
      navigation.navigate('VerifCodeWithdrawal', {
        type: 'withdraw',
        idWithdraw: response.data?.id || 0,
      });
    } catch (error) {
      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
    }
  };

  const deleteBankAccount = async () => {
    setShowModal(false);
    InteractionManager.runAfterInteractions(() => setLoadingDelete(true));
    try {
      await removeBankAccount({id: dataBankUser?.bankId});

      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
      // navigate to otp screen when success
      navigation.navigate('VerifCodeWithdrawal', {
        type: 'delete',
        data: dataBankUser,
      });
    } catch (error) {
      InteractionManager.runAfterInteractions(() => setLoadingDelete(false));
    }
  };

  // only enable on the 14th and 28th of each month
  // const getDate = new Date().getDate();
  // const date = getDate === 14 || getDate === 28;
  const minimumCredit = Number(totalCredit) >= 5000;
  const enabledButton = minimumCredit;
  return (
    <KeyboardShift>
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
          number={dataBankUser?.accountNumber}
          bankName={dataBankUser?.bankName}
          goToEditBankAccount={() => goToCreateBankAccount('edit')}
          onPressRemove={() => setShowModal(true)}
          containerStyles={{marginTop: mvs(20)}}
        />

        {/* // show if user has a bank account */}
        <View style={{flex: 1}}>
          {isLoading ? null : dataBankUser !== null &&
            dataBankUser !== undefined ? (
            <View>
              <CardTotalCredit creditCount={creditCount} />
              <InputWithdrawal
                totalCredit={totalCredit}
                setTotalCredit={setTotalCredit}
              />
            </View>
          ) : (
            // show if user doesn't have bank account
            <EmptyStateWithdraw onPress={() => goToCreateBankAccount('add')} />
          )}
        </View>

        {!isKeyboardOpen && (
          <FooterWithdraw
            totalCredit={totalCredit}
            enabledButton={enabledButton}
            onPress={goToVerifCode}
          />
        )}

        <ModalConfirm
          modalVisible={showModal}
          title={t('Withdrawal.DeleteBankAccount.ModalConfirm.Title') || ''}
          subtitle={
            t('Withdrawal.DeleteBankAccount.ModalConfirm.Subtitle') || ''
          }
          onPressClose={() => setShowModal(false)}
          onPressOk={deleteBankAccount}
        />

        <ModalLoading visible={isLoadingDelete} />
      </View>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
});
