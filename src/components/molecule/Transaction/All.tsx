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
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {dataTransaction} from '../../../data/Action/transaction';
import AddonItem from '../../atom/Cart/AddonItem';
import {
  DataDropDownType,
  dropDownTransactionCategory,
  dropDownTransactionSort,
} from '../../../data/dropdown';
import {DropDownFilter} from '../V2';

const AllTransaction = () => {
  const {t} = useTranslation();
  const [tabActive, setTabActive] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] =
    useState<DataDropDownType>();
  const [selectedSort, setSelectedSort] = useState<DataDropDownType>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const tabs = [
    {
      id: 0,
      title: t('Transaction.Merch.All'),
    },
    {
      id: 1,
      title: t('Transaction.Merch.Unpaid'),
    },
    {
      id: 2,
      title: t('Transaction.Merch.Paid'),
    },
    {
      id: 3,
      title: t('Transaction.Merch.Review'),
    },
  ];

  const handleChangeTab = (tabId: number) => {
    setTabActive(tabId);
  };

  const getActiveTabTitle = (item?: any) => {
    if (tabActive !== 0) return tabs.find(tab => tab.id === tabActive)?.title;
    else return tabs.find(tab => tab.id === item.status)?.title;
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: widthResponsive(24),
        }}>
        <DropDownFilter
          labelCaption={
            selectedSort
              ? t(selectedSort.label)
              : t('Transaction.Dropdown.Sort.Placeholder')
          }
          dataFilter={dropDownTransactionSort}
          selectedMenu={setSelectedSort}
          leftPosition={widthResponsive(-50)}
        />

        <DropDownFilter
          labelCaption={
            selectedCategories
              ? t(selectedCategories.label)
              : t('Transaction.Dropdown.Category.Placeholder')
          }
          dataFilter={dropDownTransactionCategory}
          selectedMenu={setSelectedCategories}
          leftPosition={widthResponsive(-110)}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {dataTransaction.map(data => {
          if (data.status === tabActive && tabActive !== 0) {
            return (
              <CartBox
                type={data.type}
                seller={data.seller}
                sellerImage={data.sellerImage}
                editable={false}
                transaction={getActiveTabTitle()}
                arrival={data.estArrival}
                totalItem={data.items.length}
                totalPrice={data.items.reduce((accumulator, object) => {
                  return accumulator + object.totalPrice;
                }, 0)}
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
          } else if (tabActive === 0) {
            return (
              <CartBox
                type={data.type}
                seller={data.seller}
                sellerImage={data.sellerImage}
                editable={false}
                transaction={getActiveTabTitle(data)}
                arrival={data.estArrival}
                totalItem={data.items.length}
                totalPrice={data.items.reduce((accumulator, object) => {
                  return accumulator + object.totalPrice;
                }, 0)}
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

export default AllTransaction;

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
