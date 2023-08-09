import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color, font} from '../../../theme';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {width, widthResponsive} from '../../../utils';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {Button, EmptyState, TopNavigation} from '../../../components';
import {DataShippingProps} from '../../../interface/setting.interface';
import {ShippingCard} from '../../../components/molecule/ListCard/ShippingCard';

type ListAddressProps = NativeStackScreenProps<RootStackParams, 'ListAddress'>;
export const ListAddressScreen: React.FC<ListAddressProps> = ({
  navigation,
  route,
}: ListAddressProps) => {
  const {t} = useTranslation();
  const {from} = route.params;

  const {getShippingInfo} = useSettingHook();
  const {data: listAddress} = useQuery('list-addressShipping', () =>
    getShippingInfo(),
  );
  const [selectedAddress, setSelectedAddress] = useState<DataShippingProps>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAddNewAddress = () => {
    navigation.navigate('AddNewAddress', {from});
  };

  const setActiveAddress = (val: DataShippingProps) => {
    if (selectedAddress?.bookyayShipmentID !== val.bookyayShipmentID) {
      setSelectedAddress(val);
    } else {
      setSelectedAddress(undefined);
    }
  };

  const changeMainAddress = () => {};

  const goToEditAddress = () => {
    navigation.navigate('AddNewAddress', {from});
  };

  const removeAddress = () => {};

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Shipping.Title') || ''}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          paddingHorizontal: widthResponsive(15),
        }}
      />

      <TouchableOpacity style={styles.containerAdd} onPress={goToAddNewAddress}>
        <Text style={styles.addAddress}>
          {t('Setting.Shipping.AddNewAddress')}
        </Text>
      </TouchableOpacity>

      {listAddress ? (
        <ScrollView>
          {listAddress?.data.map((val, i) => (
            <ShippingCard
              key={i}
              id={val.bookyayShipmentID}
              value={selectedAddress}
              name={val.receiverFirstname + ' ' + val.receiverLastname}
              phoneNumber={val.phoneNumberCode + val.phoneNumber}
              address={val.address}
              isMainAddress={val.isDefault}
              onPressCard={() => setActiveAddress(val)}
              onPressEdit={goToEditAddress}
              onPressRemove={removeAddress}
              containerStyle={{marginBottom: mvs(15)}}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          text={t('Setting.Shipping.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      )}

      <Button
        label={t('Setting.Shipping.ChangeMainAddress') || ''}
        onPress={changeMainAddress}
        textStyles={{fontSize: mvs(13)}}
        containerStyles={
          !selectedAddress ? styles.buttonDisabled : styles.button
        }
        disabled={!selectedAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerAdd: {
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: mvs(20),
  },
  addAddress: {
    color: color.Pink.linear,
    fontFamily: font.InterRegular,
    fontSize: mvs(15),
    lineHeight: mvs(20),
    fontWeight: '400',
  },
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(14),
  },
  button: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginVertical: mvs(25),
    alignSelf: 'center',
  },
  buttonDisabled: {
    width: width * 0.9,
    aspectRatio: mvs(327 / 40),
    marginVertical: mvs(25),
    alignSelf: 'center',
    backgroundColor: color.Dark[50],
  },
});
