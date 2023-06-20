import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CheckBox, Gap, TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import CartItem from '../../components/atom/Cart/CartItem';
import CartBox from '../../components/atom/Cart/CartBox';
import BottomPrice from '../../components/atom/Cart/BottomPrice';
import {dataCart} from '../../data/Action/cart';
import {dataPromo} from '../../data/Action/promo';
import AddonItem from '../../components/atom/Cart/AddonItem';

type CartProps = NativeStackScreenProps<RootStackParams, 'Cart'>;

export const Cart: React.FC<CartProps> = ({navigation, route}: CartProps) => {
  const {t} = useTranslation();

  const [carts, setCarts] = useState(dataCart);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [promo, setPromo] = useState<any>();

  useEffect(() => {
    if (route.params)
      setPromo(dataPromo.find(data => data.id === route.params?.promoId));
  }, [route]);

  const selectItem = (ownerId: string, itemId: string) => {
    const newCart = carts;
    const index = newCart.findIndex(data => data.id === ownerId);
    let selectedItem: Array<boolean> = [];
    newCart[index].items.map(item => {
      if (item.id === itemId) {
        item.isSelected = item.isSelected ? false : true;
      }

      selectedItem.push(item.isSelected);
    });
    newCart[index].isSelected = selectedItem.includes(false) ? false : true;

    let selectedOwner: Array<boolean> = [];
    newCart.map(data => {
      selectedOwner.push(data.isSelected);
    });

    setIsSelectedAll(!selectedOwner.includes(false));

    setCarts([...newCart]);
  };

  const selectOwnerItem = (ownerId: string) => {
    const newCart = carts;
    const index = newCart.findIndex(data => data.id === ownerId);

    newCart[index].isSelected = newCart[index].isSelected ? false : true;
    newCart[index].items.map(item => {
      item.isSelected = newCart[index].isSelected ? true : false;
    });

    let selectedOwner: Array<boolean> = [];
    newCart.map(data => {
      selectedOwner.push(data.isSelected);
    });

    setIsSelectedAll(!selectedOwner.includes(false));

    setCarts([...newCart]);
  };

  const selectAllItem = () => {
    const newCart = carts;
    let selectedItem: Array<boolean> = [];
    newCart.map(data => {
      selectedItem.push(data.isSelected);
      data.isSelected = isSelectedAll ? false : true;
      data.items.map(item => {
        selectedItem.push(item.isSelected);
        item.isSelected = isSelectedAll ? false : true;
      });
    });
    setIsSelectedAll(!isSelectedAll);

    setCarts([...newCart]);
  };

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
          <CheckBox handleOnPress={selectAllItem} active={isSelectedAll} />
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
        {carts.map(data => {
          return (
            <CartBox
              seller={data.seller}
              sellerImage={data.sellerImage}
              onChecked={() => selectOwnerItem(data.id)}
              isChecked={data.isSelected}>
              {data.items.map(item => (
                <>
                  <CartItem
                    name={item.name}
                    image={item.image}
                    price={item.totalPrice}
                    qty={item.qty}
                    onChecked={() => selectItem(data.id, item.id)}
                    isChecked={item.isSelected}
                  />
                  {item?.addons?.map(addon => (
                    <AddonItem name={addon.name} image={addon.image} cart />
                  ))}
                </>
              ))}
            </CartBox>
          );
        })}
      </ScrollView>
      <BottomPrice
        onPressPromo={() => navigation.navigate('PromoCode')}
        onPressCheckout={() => navigation.navigate('Checkout')}
        promo={promo}
      />
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
});
