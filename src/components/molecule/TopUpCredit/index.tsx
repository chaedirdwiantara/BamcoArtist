import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  width,
  kFormatter,
  toCurrency,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import {ListWithdrawalProps} from '../../../data/topUp';
import {CoinCard} from './CoinCard';
import {Gap} from '../../atom';
import {TabFilter} from '../TabFilter';
import {TopNavigation} from '../TopNavigation';
import {WithdrawalCard} from './WithdrawalCard';
import {TransactionCard} from './TransactionCard';
import {EmptyState} from '../EmptyState/EmptyState';
import {color, font, typography} from '../../../theme';
import {useIapHook} from '../../../hooks/use-iap.hook';
import {dateLongMonth} from '../../../utils/date-format';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {ArrowLeftIcon, CoinDIcon} from '../../../assets/icon';
import {TransactionHistoryPropsType} from '../../../interface/credit.interface';

interface TopUpCreditProps {
  onPressGoBack: () => void;
  onPressWithdrawal: () => void;
  goToDetailTransaction: (data: TransactionHistoryPropsType) => void;
}

export const TopUpCreditContent: React.FC<TopUpCreditProps> = ({
  onPressGoBack,
  goToDetailTransaction,
  onPressWithdrawal,
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
  const {data: dataHistory, isLoading} = useQuery({
    queryKey: ['transaction-history'],
    queryFn: () => getTransactionHistory(),
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listWithdrawal, setListWithdrawal] = useState<ListWithdrawalProps[]>(
    [],
  );
  const [filter] = useState([
    {filterName: 'TopUp.Filter.Buy'},
    {filterName: 'TopUp.Filter.Transaction'},
    {filterName: 'TopUp.Filter.Withdrawal'},
  ]);

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
    let newList = [...listWithdrawal];
    newList[index].isOpen = !newList[index].isOpen;
    setListWithdrawal(newList);
  };

  const onPressCardCoin = (productId: string) => {
    purchaseProduct(productId);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('TopUp.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
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

        <View style={styles.containerCoin}>
          <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
            {t('TopUp.MyCoin')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <CoinDIcon />
            <Gap width={widthPercentage(5)} />
            <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
              {kFormatter(creditCount, 1)}
            </Text>
          </View>
        </View>

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
          // TODO: Need to be wired with API history withdrawal
          <>
            {listWithdrawal.length > 0 ? (
              <View style={styles.containerContent}>
                {listWithdrawal.map((val, i) => (
                  <WithdrawalCard
                    key={i}
                    transactionAmount={toCurrency(val.transactionAmount, {
                      withFraction: false,
                    })}
                    conversionAmount={
                      'HKD ' +
                      toCurrency(val.conversionAmount, {
                        withFraction: false,
                      })
                    }
                    idMusician={val.idMusician}
                    date={val.date}
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
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: heightPercentage(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
    marginVertical: heightPercentage(20),
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
