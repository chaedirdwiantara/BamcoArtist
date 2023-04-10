import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button, CheckBox, Gap, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, width, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import {ArrowRightIcon, DiscountIcon} from '../../assets/icon';
import CartItem from '../../components/atom/Cart/CartItem';
import CartBox from '../../components/atom/Cart/CartBox';

type CartProps = NativeStackScreenProps<RootStackParams, 'Cart'>;

export const Cart: React.FC<CartProps> = ({navigation}: CartProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Cart.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View style={[styles.topContainer, styles.rowCenter]}>
        <View style={styles.rowCenter}>
          <CheckBox handleOnPress={() => null} active={false} />
          <Gap width={widthPercentage(10)} />
          <Text style={[Typography.Subtitle2, {color: Color.Neutral[10]}]}>
            {t('Cart.SelectAll')}
          </Text>
        </View>
        <View>
          <Text style={[Typography.Subtitle2, {color: Color.Success[400]}]}>
            {t('Cart.Delete')}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <CartBox>
          <CartItem />
          <CartItem />
        </CartBox>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.rowCenter, styles.promo]}
          onPress={() => navigation.navigate('PromoCode')}>
          <View style={[styles.rowCenter]}>
            <DiscountIcon
              height={heightPercentage(20)}
              width={widthPercentage(20)}
            />
            <Gap width={widthPercentage(5)} />
            <Text style={[Typography.Subtitle2, {color: Color.Neutral[10]}]}>
              Use Promo Code
            </Text>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>
        <View style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
          <View>
            <Text
              style={[
                Typography.Body4,
                {color: Color.Neutral[10], marginBottom: 6},
              ]}>
              Total Price
            </Text>
            <View style={[styles.rowCenter]}>
              <Text
                style={[
                  Typography.Heading6,
                  {color: Color.Success[400], maxWidth: widthPercentage(110)},
                ]}
                numberOfLines={1}>
                4,500
              </Text>
              <Gap width={widthPercentage(5)} />
              <Text style={[Typography.Heading6, {color: Color.Success[400]}]}>
                Credits
              </Text>
            </View>
          </View>
          <Button label={t('Cart.Checkout')} containerStyles={styles.button} />
        </View>
      </View>
    </View>
  );
};

export default Cart;

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
    paddingVertical: heightPercentage(16),
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  bottomContainer: {
    justifyContent: 'space-between',
    backgroundColor: Color.Dark[700],
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(24),
  },
  button: {
    width: width * 0.35,
    aspectRatio: heightPercentage(120 / 40),
  },
  promo: {
    justifyContent: 'space-between',
    marginBottom: heightPercentage(16),
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});
