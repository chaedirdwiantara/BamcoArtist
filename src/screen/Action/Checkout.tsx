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
import {heightPercentage, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import CartItem from '../../components/atom/Cart/CartItem';
import CartBox from '../../components/atom/Cart/CartBox';
import BottomPrice from '../../components/atom/Cart/BottomPrice';
import {LocationIcon} from '../../assets/icon';
import {ModalDelivery} from '../../components/atom/Checkout/ModalDelivery';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useFocusEffect} from '@react-navigation/native';
import {mvs} from 'react-native-size-matters';

type CheckoutProps = NativeStackScreenProps<RootStackParams, 'Checkout'>;

export const Checkout: React.FC<CheckoutProps> = ({
  navigation,
}: CheckoutProps) => {
  const {t} = useTranslation();
  const [showDelivery, setShowDelivery] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<string>('package');

  const {dataShippingInfo, getShippingInfo} = useSettingHook();

  useFocusEffect(
    useCallback(() => {
      getShippingInfo();
    }, []),
  );

  const handleShowDelivery = (type: string) => {
    setDeliveryType(type);
    setShowDelivery(!showDelivery);
  };

  const formatShipping = () => {
    if (dataShippingInfo) {
      const {
        fullname,
        phoneNumber,
        address,
        city,
        province,
        postalCode,
        country,
      } = dataShippingInfo;
      return (
        fullname +
        ' (' +
        phoneNumber +
        ') ' +
        address +
        ', ' +
        city +
        ', ' +
        province +
        ' (' +
        postalCode +
        ') ' +
        country
      );
    }
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
            marginTop: true ? heightPercentage(4) : heightPercentage(-1),
          }}
        />
        <Gap width={widthPercentage(10)} />
        {true ? (
          <Text>
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
              {/* {formatShipping()} */}
              Jackson Wong (010 8589 8800) Jianguo Rd, 朝阳区, 北京市 (3208)
              China
            </Text>
          </Text>
        ) : (
          <TouchableOpacity>
            <Text style={[Typography.Subtitle2, {color: Color.Success[400]}]}>
              {t('Checkout.AddShipping')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <CartBox
          editable={false}
          onPressDelivery={() => handleShowDelivery('package')}
          onPressAgent={() => handleShowDelivery('agent')}
          delivery>
          <CartItem editable={false} />
          <CartItem editable={false} />
        </CartBox>
        <CartBox
          editable={false}
          onPressDelivery={() => handleShowDelivery('package')}
          onPressAgent={() => handleShowDelivery('agent')}
          delivery>
          <CartItem editable={false} />
        </CartBox>
      </ScrollView>
      <BottomPrice
        onPressPromo={() => navigation.navigate('PromoCode')}
        onPressCheckout={() => navigation.navigate('Checkout')}
        summary
      />

      <ModalDelivery
        modalVisible={showDelivery}
        onPressClose={() => handleShowDelivery('')}
        type={deliveryType}
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
