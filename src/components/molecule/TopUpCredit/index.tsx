import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';

import {
  width,
  toCurrency,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import {
  dataCreditDropdown,
  DataDropDownNumberType,
} from '../../../data/dropdown';
import {Button} from '../../atom';
import {CoinCard} from './CoinCard';
import {TabFilter} from '../TabFilter';
import {TopNavigation} from '../TopNavigation';
import {WithdrawalCard} from './WithdrawalCard';
import {TransactionCard} from './TransactionCard';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MyCreditInfoCard} from './MyCreditInfoCard';
import {EmptyState} from '../EmptyState/EmptyState';
import {color, font, typography} from '../../../theme';
import {useIapHook} from '../../../hooks/use-iap.hook';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {useWithdrawHook} from '../../../hooks/use-withdraw.hook';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ListWithdrawPropsType} from '../../../interface/withdraw.interface';
import {dateFormatSubscribe, dateLongMonth} from '../../../utils/date-format';
import {TransactionHistoryPropsType} from '../../../interface/credit.interface';

interface TopUpCreditProps {
  onPressGoBack: () => void;
  onPressWithdrawal: () => void;
  goToDetailTransaction: (data: TransactionHistoryPropsType) => void;
  goToCredit: (type: number) => void;
}

export const TopUpCreditContent: React.FC<TopUpCreditProps> = ({
  onPressGoBack,
  goToDetailTransaction,
  onPressWithdrawal,
  goToCredit,
}) => {
  const {t} = useTranslation();
  const {creditCount, getCreditCount, getTransactionHistory} = useCreditHook();
  const {
    iapProduct,
    endIap,
    getProductIap,
    purchaseProduct,
    loadIapListener,
    purchaseUpdateListener,
    purchaseErrorListener,
  } = useIapHook();
  const {getListWithdraw} = useWithdrawHook();
  const {data: dataHistory, isLoading} = useQuery({
    queryKey: ['transaction-history'],
    queryFn: () => getTransactionHistory(),
  });
  const {
    data: dataWithdraw,
    status: statusWithdraw,
    refetch: refetchWithdraw,
  } = useQuery({
    queryKey: ['list-withdraw'],
    queryFn: () => getListWithdraw({uuid: profileStorage()?.uuid}),
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listWithdrawal, setListWithdrawal] = useState<ListWithdrawPropsType[]>(
    [],
  );
  const [filter] = useState([
    {filterName: 'TopUp.Filter.Buy'},
    {filterName: 'TopUp.Filter.Transaction'},
    {filterName: 'TopUp.Filter.Withdrawal'},
  ]);

  useFocusEffect(
    useCallback(() => {
      refetchWithdraw();
    }, []),
  );

  // save withdraw to local state
  useFocusEffect(
    useCallback(() => {
      if (statusWithdraw === 'success' && dataWithdraw?.data) {
        setListWithdrawal(dataWithdraw?.data);
        // if back from request withdraw, tab active must be on Withdrawal tab
        const index = storage.getNumber('withdrawIndex') || 0;
        setSelectedIndex(index);

        // remove index after shown
        setTimeout(() => {
          storage.delete('withdrawIndex');
        }, 1000);
      }
    }, [statusWithdraw, dataWithdraw]),
  );

  useEffect(() => {
    getCreditCount();
  }, []);

  useEffect(() => {
    getProductIap();
    loadIapListener();

    return () => {
      endIap();
      purchaseUpdateListener?.remove();
      purchaseErrorListener?.remove();
    };
  }, []);

  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  const onPressOpenWithdrawal = (index: number) => {
    // add new prop to open withdraw card
    let newList = [...listWithdrawal];
    newList[index].isOpen = !newList[index].isOpen;
    setListWithdrawal(newList);
  };

  const onPressCardCoin = (productId: string) => {
    purchaseProduct(productId);
  };

  const resultDataDropdown = (selectedMenu: DataDropDownNumberType) => {
    const value = selectedMenu.value;
    goToCredit(value);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        type="user detail"
        title={t('TopUp.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        dropdownData={dataCreditDropdown}
        resultDataDropdown={resultDataDropdown}
        dropdownStyle={{marginRight: 0}}
      />

      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[typography.Subtitle1, styles.text]}>
            {t('TopUp.Subtitle1')}
          </Text>
          <Text style={[typography.Caption, styles.text]}>
            {t('TopUp.Subtitle2')}
          </Text>
          <Text style={[typography.Caption, styles.text]}>
            {t('TopUp.Subtitle3')}
          </Text>
        </View>

        <MyCreditInfoCard
          creditCount={Number(creditCount)}
          title1={t('TopUp.MyCoin')}
          title2={t('TopUp.Estimation')}
        />

        <Button
          label={t('TopUp.ButtonWithdraw')}
          textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
          containerStyles={styles.btnContainer}
          onPress={onPressWithdrawal}
        />

        <TabFilter.Type1
          filterData={filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
          TouchableStyle={{width: width * 0.3}}
          translation={true}
        />

        {filter[selectedIndex].filterName === 'TopUp.Filter.Buy' ? (
          <View style={styles.containerListPrice}>
            {iapProduct
              .sort((a, b) => parseInt(a.price) - parseInt(b.price))
              .map((val, i) => (
                <View key={i} style={styles.padding}>
                  <CoinCard
                    productId={val.productId}
                    price={val.localizedPrice}
                    onPress={() => onPressCardCoin(val.productId)}
                  />
                </View>
              ))}
            <View style={styles.padding}>
              <CoinCard
                productId={''}
                price={''}
                initialCoin={''}
                bonusCoin={''}
                showIconCoin={false}
                containerStyle={{backgroundColor: color.Dark[800]}}
              />
            </View>
          </View>
        ) : filter[selectedIndex].filterName === 'TopUp.Filter.Transaction' ? (
          <>
            {isLoading ? null : dataHistory && dataHistory.data.length > 0 ? (
              <View style={styles.containerContent}>
                {dataHistory &&
                  dataHistory.data.map((val, i) => (
                    <TransactionCard
                      key={i}
                      title={t('TopUp.Transaction.SuccessPurchased', {
                        credit: toCurrency(val.credit, {withFraction: false}),
                      })}
                      date={dateLongMonth(val.createdAt)}
                      onPress={() => goToDetailTransaction(val)}
                    />
                  ))}
              </View>
            ) : (
              <EmptyState
                text={t('TopUp.EmptyState.Transaction') || ''}
                hideIcon={true}
                containerStyle={styles.containerEmpty}
                textStyle={styles.emptyText}
              />
            )}
          </>
        ) : (
          <>
            {listWithdrawal.length > 0 ? (
              <View style={styles.containerContent}>
                {listWithdrawal.map((val, i) => (
                  <WithdrawalCard
                    key={i}
                    transactionAmount={toCurrency(val.amount, {
                      withFraction: false,
                    })}
                    conversionAmount={val.amountConversion}
                    idMusician={val.toBankNumber}
                    date={dateFormatSubscribe(val.requestDate)}
                    status={val.status}
                    notes={val.notes}
                    isOpen={val.isOpen}
                    onPress={() => onPressOpenWithdrawal(i)}
                  />
                ))}
              </View>
            ) : (
              <EmptyState
                text={t('TopUp.EmptyState.Withdrawal') || ''}
                hideIcon={true}
                containerStyle={styles.containerEmpty}
                textStyle={styles.emptyText}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  text: {
    color: color.Neutral[10],
    textAlign: 'center',
    marginTop: heightPercentage(20),
    width: width * 0.9,
  },
  containerListPrice: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightPercentage(20),
  },
  padding: {
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(5),
  },
  containerScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(20),
  },
  containerContent: {
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(40),
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: mvs(5),
    marginBottom: mvs(15),
  },
  containerEmpty: {
    alignSelf: 'center',
    marginTop: mvs(120),
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
