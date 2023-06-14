import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  width,
  kFormatter,
  toCurrency,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import {
  listPrice,
  listWithdrawal,
  ListWithdrawalProps,
} from '../../../data/topUp';
import {CoinCard} from './CoinCard';
import {Button, Gap} from '../../atom';
import {TabFilter} from '../TabFilter';
import {TopNavigation} from '../TopNavigation';
import {WithdrawalCard} from './WithdrawalCard';
import {TransactionCard} from './TransactionCard';
import {color, font, typography} from '../../../theme/';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {ArrowLeftIcon, CoinDIcon} from '../../../assets/icon';

interface TopupCoinProps {
  onPressGoBack: () => void;
  onPressWithdrawal: () => void;
}

export const TopupCoinContent: React.FC<TopupCoinProps> = ({
  onPressGoBack,
  onPressWithdrawal,
}) => {
  const {t} = useTranslation();
  const {creditCount, getCreditCount} = useCreditHook();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [withdrawalList, setWithdrawalList] =
    useState<ListWithdrawalProps[]>(listWithdrawal);
  const [filter] = useState([
    {filterName: 'TopUp.Filter.Buy'},
    {filterName: 'TopUp.Filter.Transaction'},
    {filterName: 'TopUp.Filter.Withdrawal'},
  ]);

  useEffect(() => {
    getCreditCount();
  }, []);

  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  const onPressOpenWithdrawal = (index: number) => {
    let newList = [...withdrawalList];
    newList[index].isOpen = !newList[index].isOpen;
    setWithdrawalList(newList);
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

        {/* <Button
          label={t('TopUp.ButtonWithdraw')}
          textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
          containerStyles={styles.btnContainer}
          onPress={onPressWithdrawal}
        /> */}

        <TabFilter.Type1
          filterData={filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
          TouchableStyle={{width: width * 0.3}}
          translation={true}
        />

        {filter[selectedIndex].filterName === 'TopUp.Filter.Buy' ? (
          <View style={styles.containerListPrice}>
            {listPrice.map((val, i) => (
              <View key={i} style={styles.padding}>
                <CoinCard
                  totalCoin={val.totalCoin}
                  price={val.price}
                  initialCoin={val.initialCoin}
                  bonusCoin={val.bonusCoin}
                />
              </View>
            ))}
            <View style={styles.padding}>
              <CoinCard
                totalCoin={''}
                price={''}
                initialCoin={''}
                bonusCoin={''}
                showIconCoin={false}
                containerStyle={{backgroundColor: color.Dark[800]}}
              />
            </View>
          </View>
        ) : filter[selectedIndex].filterName === 'TopUp.Filter.Transaction' ? (
          <TransactionCard
            title="20 Credit have been purchased!"
            date="Dec 16, 2022"
          />
        ) : (
          <View style={styles.containerWithdrawal}>
            {withdrawalList.map((val, i) => (
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
  containerWithdrawal: {
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(40),
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: mvs(5),
    marginBottom: mvs(15),
  },
});
