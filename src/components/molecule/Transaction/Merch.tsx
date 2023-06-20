import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CartBox from '../../atom/Cart/CartBox';
import CartItem from '../../atom/Cart/CartItem';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {dataTransaction} from '../../../data/Action/transaction';
import AddonItem from '../../atom/Cart/AddonItem';

const MerchTransaction = () => {
  const {t} = useTranslation();
  const [tabActive, setTabActive] = useState<number>(1);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const tabs = [
    {
      id: 0,
      title: t('Transaction.Merch.Unpaid'),
    },
    {
      id: 1,
      title: t('Transaction.Merch.ToShip'),
    },
    {
      id: 2,
      title: t('Transaction.Merch.Shipped'),
    },
    {
      id: 3,
      title: t('Transaction.Merch.Review'),
    },
  ];

  const handleChangeTab = (tabId: number) => {
    setTabActive(tabId);
  };

  const getActiveTabTitle = () => {
    return tabs.find(tab => tab.id === tabActive)?.title;
  };

  return (
    <View style={styles.root}>
      <View style={styles.tab}>
        {tabs.map(tab => {
          return (
            <TouchableOpacity
              style={[
                styles.tabItem,
                {borderBottomWidth: tabActive === tab.id ? 1.2 : 0},
              ]}
              onPress={() => handleChangeTab(tab.id)}>
              <Text
                style={[
                  styles.tabTitle,
                  {color: tabActive === tab.id ? Color.Pink.linear : '#ABBED6'},
                ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {dataTransaction.map(data => {
          if (data.status === tabActive) {
            return (
              <CartBox
                seller={data.seller}
                sellerImage={data.sellerImage}
                editable={false}
                transaction={getActiveTabTitle()}
                arrival={data.estArrival}
                onPressDetail={() =>
                  navigation.navigate('TransactionDetailMerch', {id: data.id})
                }>
                {data.items.map(item => (
                  <>
                    <CartItem
                      name={item.name}
                      image={item.image}
                      price={item.totalPrice}
                      qty={item.qty}
                      editable={false}
                    />
                    {item?.addons?.map(addon => (
                      <AddonItem
                        name={addon.name}
                        image={addon.image}
                        transaction
                      />
                    ))}
                  </>
                ))}
              </CartBox>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MerchTransaction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    paddingTop: heightPercentage(10),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabItem: {
    marginRight: widthPercentage(12),
    borderBottomColor: Color.Pink.linear,
    paddingBottom: heightPercentage(10),
  },
  tabTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(11.5),
  },
});
