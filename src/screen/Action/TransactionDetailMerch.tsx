import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  Avatar,
  Button,
  ButtonGradient,
  Gap,
  ModalConfirm,
  TopNavigation,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, normalize, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import CartItem from '../../components/atom/Cart/CartItem';
import {mvs} from 'react-native-size-matters';
import {ModalReview} from '../../components/molecule/Modal/ModalReview';
import {dataTransaction} from '../../data/Action/transaction';
import {ModalSuccessCheckout} from '../../components/molecule/Modal/ModalSuccessCheckout';

type TransactionDetailMerchProps = NativeStackScreenProps<
  RootStackParams,
  'TransactionDetailMerch'
>;

export const TransactionDetailMerch: React.FC<TransactionDetailMerchProps> = ({
  navigation,
  route,
}: TransactionDetailMerchProps) => {
  const {t} = useTranslation();
  const [createReview, setCreateReview] = useState<boolean>(false);
  const [finishOrder, setFinishOrder] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const detail = dataTransaction.find(data => data.id === route.params.id);

  const handleFinishOrder = () => {
    setFinishOrder(false);
    setTimeout(() => {
      setIsFinish(true);
    }, 1000);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Transaction.Detail.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* Product Detail */}
        <View style={styles.container}>
          <View style={styles.rowCenterBetween}>
            <Text style={styles.heading}>
              {t('Transaction.Detail.Product')}
            </Text>
            <View style={styles.rowCenterBetween}>
              <Avatar imgUri={detail?.sellerImage ?? ''} />
              <Gap width={widthPercentage(6)} />
              <Text
                style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}
                numberOfLines={1}>
                {detail?.seller}
              </Text>
            </View>
          </View>
          <Gap height={heightPercentage(16)} />
          <View>
            {detail?.items.map(item => (
              <CartItem
                detail
                name={item.name}
                image={item.image}
                price={item.totalPrice}
                qty={item.qty}
                editable={false}
              />
            ))}
          </View>
          <Text>
            <Text style={styles.title}>Total</Text>
            <Gap width={widthPercentage(6)} />
            <Text style={styles.textPink}>5,500 Credits</Text>
          </Text>
        </View>

        {/* Purchase Information */}
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>
              {t('Transaction.Detail.Purchase.Title')}
            </Text>
            <Text style={styles.textPink}>To Ship</Text>
          </View>
          <Gap height={heightPercentage(12)} />
          <View style={styles.rowBetween}>
            <Text style={styles.desc}>
              {t('Transaction.Detail.Purchase.Date')}
            </Text>
            <Text style={styles.desc}>20 Feb 2023, 02:15 PM</Text>
          </View>
          <Gap height={heightPercentage(4)} />
          <View style={styles.rowBetween}>
            <Text style={styles.desc}>
              {t('Transaction.Detail.Purchase.Cancel')}
            </Text>
            <Text style={styles.desc}>20 Feb 2023, 02:15 PM</Text>
          </View>
        </View>

        {/* Shipping Information */}
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>
              {t('Transaction.Detail.Shipping.Title')}
            </Text>
          </View>
          <Gap height={heightPercentage(12)} />
          <View style={styles.rowBetween}>
            <Text style={[styles.desc, {flex: 1}]}>
              {t('Transaction.Detail.Shipping.Address')}
            </Text>
            <Text style={[styles.desc, {flex: 2}]}>
              Jackson Wong (010 8589 8800)88 Jianguo Rd, 朝阳区, 北京市 (3208)
              China
            </Text>
          </View>
          <Gap height={heightPercentage(4)} />
          <View style={styles.rowBetween}>
            <Text style={[styles.desc, {flex: 1}]}>
              {t('Transaction.Detail.Shipping.Estimation')}
            </Text>
            <Text style={[styles.desc, {flex: 2}]}>20 Feb 2023, 02:15 PM</Text>
          </View>
        </View>

        {/* Payment Detail */}
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>
              {t('Transaction.Detail.Payment.Title')}
            </Text>
          </View>
          <Gap height={heightPercentage(12)} />
          <View style={styles.rowBetween}>
            <Text style={styles.textPrice}>
              {t('Transaction.Detail.Payment.Total')}
            </Text>
            <Text style={styles.textPrice}>2750 Credits</Text>
          </View>
          <Gap height={heightPercentage(4)} />
          <View style={styles.rowBetween}>
            <Text style={styles.textPrice}>
              {t('Transaction.Detail.Payment.Delivery')}
            </Text>
            <Text style={styles.textPrice}>400 Credits</Text>
          </View>
          <Gap height={heightPercentage(4)} />
          <View style={styles.rowBetween}>
            <Text style={styles.textPrice}>
              {t('Transaction.Detail.Payment.Promo')}
            </Text>
            <Text style={styles.textPrice}>400 Credits</Text>
          </View>
          <Gap height={heightPercentage(4)} />
          <View style={styles.rowBetween}>
            <Text style={styles.textPrice}>
              {t('Transaction.Detail.Payment.Tax')}
            </Text>
            <Text style={styles.textPrice}>2%</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <Text style={[styles.heading]}>
              {t('Transaction.Detail.Total')}
            </Text>
            <Text style={[styles.heading]}>5500 Credits</Text>
          </View>
        </View>

        {/* Button */}
        <View style={[styles.container, {borderBottomWidth: 0}]}>
          <Gap height={heightPercentage(40)} />

          {detail?.status !== 3 && (
            <>
              <ButtonGradient
                label={t('Transaction.Finish')}
                textStyles={{fontSize: mvs(14)}}
                gradientStyles={{width: '100%'}}
                disabled={detail?.status !== 2 ? true : false}
                onPress={() => setFinishOrder(true)}
              />
              <Gap height={heightPercentage(8)} />
            </>
          )}

          {detail?.status === 3 && (
            <>
              <Button
                label={t('Review.Title')}
                type={'contained'}
                textStyles={{fontSize: mvs(14)}}
                containerStyles={{width: '100%'}}
                onPress={() => setCreateReview(true)}
              />
              <Gap height={heightPercentage(8)} />
            </>
          )}

          <Button
            label={t('Transaction.Track')}
            type={'border'}
            textStyles={{fontSize: mvs(14), color: Color.Success[400]}}
            containerStyles={{width: '100%'}}
            onPress={() => navigation.navigate('Track')}
          />
          <Gap height={heightPercentage(8)} />
          {detail?.status === 0 && (
            <>
              <Button
                label={t('Transaction.Cancel')}
                type={'border'}
                textStyles={{fontSize: mvs(14), color: Color.Error[500]}}
                containerStyles={{borderColor: 'transparent', width: '100%'}}
                disabled={true}
                onPress={() => null}
              />
              <Gap height={heightPercentage(8)} />
            </>
          )}

          <Gap height={heightPercentage(20)} />
        </View>
      </ScrollView>

      <ModalConfirm
        modalVisible={finishOrder}
        title={t('Transaction.Order.Title') || ''}
        subtitle={t('Transaction.Order.Confirm') || ''}
        onPressClose={() => setFinishOrder(false)}
        onPressOk={handleFinishOrder}
      />

      <ModalSuccessCheckout
        title={t('Transaction.Order.Finish') || ''}
        buttonText={t('Btn.Dismiss') || ''}
        modalVisible={isFinish}
        toggleModal={() => {
          setIsFinish(false);
        }}
      />

      <ModalReview
        modalVisible={createReview}
        onPressClose={() => setCreateReview(false)}
      />
    </View>
  );
};

export default TransactionDetailMerch;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: heightPercentage(16),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  heading: {
    ...Typography.Heading6,
    color: Color.Neutral[10],
    fontSize: normalize(14),
  },
  title: {
    ...Typography.Subtitle3,
    color: Color.Dark[50],
  },
  desc: {
    ...Typography.Subtitle3,
    color: Color.Neutral[10],
  },
  textPrice: {
    ...Typography.Subtitle3,
    color: Color.Neutral[30],
  },
  textPink: {
    ...Typography.Subtitle3,
    color: Color.Pink.linear,
  },
  button: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Dark[50],
  },
});
