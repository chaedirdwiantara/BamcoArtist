import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CartBox from '../../atom/Cart/CartBox';
import CartItem from '../../atom/Cart/CartItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {EventType} from '../../../interface/event.interface';

const ConcertTransaction = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <CartBox
          type={EventType.Concert}
          editable={false}
          onPressDetail={() => navigation.navigate('TransactionDetailTicket')}>
          <CartItem editable={false} />
        </CartBox>
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
