import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color, font} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {useIapHook} from '../../hooks/use-iap.hook';
import {dateLongMonth} from '../../utils/date-format';
import {usePlayerStore} from '../../store/player.store';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {toCurrency, width, widthPercentage} from '../../utils';
import {EmptyState, TabFilter, TopNavigation} from '../../components';
import {CoinCard} from '../../components/molecule/TopUpCredit/CoinCard';
import {TransactionHistoryPropsType} from '../../interface/credit.interface';
import {TransactionCard} from '../../components/molecule/TopUpCredit/TransactionCard';

type CreditProps = NativeStackScreenProps<RootStackParams, 'Credit'>;

export const CreditScreen: React.FC<CreditProps> = ({
  navigation,
  route,
}: CreditProps) => {
  const {type} = route.params;
  const {t} = useTranslation();
  const {setWithoutBottomTab, show} = usePlayerStore();
  const {getTransactionHistory} = useCreditHook();
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

  const [selectedIndex, setSelectedIndex] = useState<number>(type);
  const [filter] = useState([
    {filterName: 'TopUp.Credit'},
    {filterName: 'TopUp.Filter.Transaction'},
  ]);

  useEffect(() => {
    getProductIap();
    loadIapListener();

    return () => {
      endIap();
      purchaseUpdateListener?.remove();
      purchaseErrorListener?.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  const onPressCardCoin = (productId: string) => {
    purchaseProduct(productId);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToDetailTransaction = (dataDetail: TransactionHistoryPropsType) => {
    navigation.navigate('DetailHistoryTransaction', {dataDetail});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('TopUp.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
      />

      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
        TouchableStyle={{width: width * 0.5, marginTop: mvs(5)}}
        translation={true}
      />

      {filter[selectedIndex].filterName === 'TopUp.Credit' ? (
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
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  containerListPrice: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: mvs(20),
  },
  padding: {
    paddingHorizontal: widthPercentage(5),
    paddingVertical: mvs(5),
  },
  containerContent: {
    marginTop: mvs(10),
    marginBottom: mvs(40),
  },
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
