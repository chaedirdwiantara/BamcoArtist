import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Gap, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {formatShipping, heightPercentage, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import CartItem from '../../components/atom/Cart/CartItem';
import CartBox from '../../components/atom/Cart/CartBox';
import BottomPrice from '../../components/atom/Cart/BottomPrice';
import {LocationIcon} from '../../assets/icon';
import {ModalDelivery} from '../../components/atom/Checkout/ModalDelivery';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useFocusEffect} from '@react-navigation/native';
import {mvs} from 'react-native-size-matters';
import {ModalSuccessCheckout} from '../../components/molecule/Modal/ModalSuccessCheckout';
import {dataCart} from '../../data/Action/cart';
import {dataCourier} from '../../data/Action/delivery';

type CheckoutProps = NativeStackScreenProps<RootStackParams, 'Checkout'>;

export const Checkout: React.FC<CheckoutProps> = ({
  navigation,
}: CheckoutProps) => {
  const {t} = useTranslation();
  const [carts, setCarts] = useState(dataCart);
  const [ownerId, setOwnerId] = useState<string>('');
  const [showDelivery, setShowDelivery] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<string>('package');
  const [successCheckout, setSuccessCheckout] = useState<boolean>(false);

  const {dataShippingInfo, getShippingInfo} = useSettingHook();

  useFocusEffect(
    useCallback(() => {
      getShippingInfo();
    }, []),
  );

  const handleShowDelivery = (type: string, id?: string) => {
    setDeliveryType(type);
    setShowDelivery(!showDelivery);
    setOwnerId(id ?? '');
  };

  const handleSelectDelivery = (delivery: any) => {
    const newCart = carts;
    const index = newCart.findIndex(data => data.id === ownerId);
    newCart[index].coDelivery = delivery;
    newCart[index].coCourier = dataCourier[0] as any;

    setCarts([...newCart]);
    setShowDelivery(!showDelivery);
  };

  const handleSelectCourier = (courier: any) => {
    const newCart = carts;
    const index = newCart.findIndex(data => data.id === ownerId);
    newCart[index].coCourier = courier;

    setCarts([...newCart]);
    setShowDelivery(!showDelivery);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Checkout.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View style={[styles.topContainer]}>
        <LocationIcon
          width={widthPercentage(20)}
          height={widthPercentage(20)}
          style={{
            marginTop: dataShippingInfo
              ? heightPercentage(4)
              : heightPercentage(-1),
          }}
        />
        <Gap width={widthPercentage(10)} />
        {dataShippingInfo ? (
          <Text style={{flex: 1}}>
            <Text
              style={[
                Typography.Subtitle2,
                {color: Color.Neutral[50], lineHeight: mvs(20)},
              ]}>
              Send to
            </Text>
            <Gap width={widthPercentage(4)} />
            <Text
              style={[
                Typography.Subtitle2,
                {color: Color.Neutral[10], lineHeight: mvs(20)},
              ]}>
              {formatShipping(dataShippingInfo)}
            </Text>
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShippingInformation', {
                data: dataShippingInfo,
                from: 'checkout',
              })
            }>
            <Text style={[Typography.Subtitle2, {color: Color.Success[400]}]}>
              {t('Checkout.AddShipping')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {carts.map(data => {
          return (
            <CartBox
              seller={data.seller}
              sellerImage={data.sellerImage}
              delivery
              editable={false}
              onPressDelivery={() => handleShowDelivery('package', data.id)}
              onPressAgent={() => handleShowDelivery('agent', data.id)}
              coDelivery={data.coDelivery}
              coCourier={data.coCourier}>
              {data.items.map(item => (
                <CartItem
                  name={item.name}
                  image={item.image}
                  price={item.totalPrice}
                  qty={item.qty}
                  editable={false}
                />
              ))}
            </CartBox>
          );
        })}
      </ScrollView>
      <BottomPrice
        onPressPromo={() => navigation.navigate('PromoCode')}
        onPressCheckout={() => setSuccessCheckout(true)}
        summary
      />

      <ModalDelivery
        modalVisible={showDelivery}
        onPressClose={() => handleShowDelivery('')}
        type={deliveryType}
        onSelectDelivery={data => handleSelectDelivery(data)}
        onSelectCourier={data => handleSelectCourier(data)}
      />

      <ModalSuccessCheckout
        modalVisible={successCheckout}
        toggleModal={() => {
          setSuccessCheckout(false);
          navigation.navigate('Transaction');
        }}
      />
    </View>
  );
};

export default Checkout;

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
});
