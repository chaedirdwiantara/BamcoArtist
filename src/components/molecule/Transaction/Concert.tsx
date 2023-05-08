import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CartBox from '../../atom/Cart/CartBox';
import CartItem from '../../atom/Cart/CartItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {EventType} from '../../../interface/event.interface';
import {dataConcert} from '../../../data/Action/concert';

const ConcertTransaction = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {dataConcert.map(data => {
          return (
            <CartBox
              seller={data.seller}
              sellerImage={data.sellerImage}
              type={EventType.Concert}
              editable={false}
              onPressDetail={() =>
                navigation.navigate('TransactionDetailTicket', {id: data.id})
              }
              date={data.date}
              category={data.category}>
              <CartItem
                name={data.item.name}
                image={data.item.image}
                price={data.item.totalPrice}
                qty={data.item.qty}
                editable={false}
              />
            </CartBox>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ConcertTransaction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
