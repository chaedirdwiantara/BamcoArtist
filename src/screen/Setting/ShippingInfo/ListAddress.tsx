import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  SsuToast,
  EmptyState,
  ModalConfirm,
  TopNavigation,
} from '../../../components';
import {RootStackParams} from '../../../navigations';
import {width, widthResponsive} from '../../../utils';
import {color, font, typography} from '../../../theme';
import {storage} from '../../../hooks/use-storage.hook';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {DataShippingProps} from '../../../interface/setting.interface';
import {deleteShipping, updateShipping} from '../../../api/setting.api';
import {ShippingCard} from '../../../components/molecule/ListCard/ShippingCard';
import {TextConfirmProps} from '../../../components/molecule/SettingContent/AddShippingAddress';

type ListAddressProps = NativeStackScreenProps<RootStackParams, 'ListAddress'>;
export const ListAddressScreen: React.FC<ListAddressProps> = ({
  navigation,
  route,
}: ListAddressProps) => {
  const {t} = useTranslation();
  const {from} = route.params;

  const {getShippingInfo} = useSettingHook();
  const {data: listAddress, refetch} = useQuery('list-addressShipping', () =>
    getShippingInfo(),
  );
  const [selectedAddress, setSelectedAddress] = useState<DataShippingProps>();
  const [deleteAddress, setDeleteAddress] = useState<DataShippingProps>();
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<string>('');
  const [textToast, setTextToast] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [textConfirm, setTextConfirm] = useState<TextConfirmProps>({
    title: '',
    subtitle: '',
  });

  useFocusEffect(
    useCallback(() => {
      // fetch when go back from add address
      refetch();

      // set flag new address, if it contains an id
      const newId = storage.getString('newIdShipping');
      newId && setNewAddress(newId);
      // remove flag new address, if go out from this screen
      storage.delete('newIdShipping');

      // show toast add/update success from add address screen
      const type = storage.getString('toastType');
      if (type) {
        setToastVisible(true);
        type === 'add'
          ? setTextToast('Setting.Shipping.ToastAddAddress')
          : setTextToast('Setting.Shipping.ToastChangeAddress');

        // remove toast after shown
        storage.delete('toastType');
      }
    }, [toastVisible]),
  );

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAddNewAddress = (id?: string) => {
    const dataAddress = listAddress?.data.filter(
      val => val.bookyayShipmentID === id,
    )[0];
    const params = id !== undefined ? {from, data: dataAddress} : {from};
    navigation.navigate('AddNewAddress', params);
  };

  const setActiveAddress = (val: DataShippingProps) => {
    if (selectedAddress?.bookyayShipmentID !== val.bookyayShipmentID) {
      // change the state of the main address
      // by changing the default value to the opposite
      const data = {
        ...val,
        isDefault: !val.isDefault,
      };
      setSelectedAddress(data);
    } else {
      setSelectedAddress(undefined);
    }
  };

  const changeMainAddress = async (val?: DataShippingProps) => {
    setShowModal(false);
    try {
      await updateShipping(val);
      setTextToast('Setting.Shipping.ToastMainAddress');
      InteractionManager.runAfterInteractions(() => setToastVisible(true));

      // unselect after change to main address
      setSelectedAddress(undefined);
    } catch (error) {}
  };

  const removeAddress = async (val: DataShippingProps) => {
    setShowModal(false);
    try {
      await deleteShipping(val);
      setTextToast('Setting.Shipping.ToastDeleteAddress');
      InteractionManager.runAfterInteractions(() => setToastVisible(true));

      // unselect after change to remove address
      setDeleteAddress(undefined);
    } catch (error) {}
  };

  const openModalConfirm = (val: string) => {
    if (val === 'delete') {
      setTextConfirm({
        title: 'Setting.Shipping.DeleteAddress',
        subtitle: 'Setting.Shipping.ConfirmDeleteAddress',
      });
    } else {
      setTextConfirm({
        title: 'Setting.Shipping.ChangeMainAddress',
        subtitle: 'Setting.Shipping.ConfirmChangeMainAddress',
      });
    }
    setShowModal(true);
  };

  const onPressConfirm = () => {
    if (textConfirm.title === 'Setting.Shipping.DeleteAddress') {
      deleteAddress !== undefined && removeAddress(deleteAddress);
    } else {
      changeMainAddress(selectedAddress);
    }
  };

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

      <TouchableOpacity
        style={styles.containerAdd}
        onPress={() => goToAddNewAddress(undefined)}>
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
              onPressEdit={() => goToAddNewAddress(val.bookyayShipmentID)}
              onPressRemove={() => {
                setDeleteAddress(val);
                openModalConfirm('delete');
              }}
              containerStyle={{marginBottom: mvs(15)}}
              disabled={val.isDefault}
              newAddress={newAddress}
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
        onPress={() => openModalConfirm('main')}
        textStyles={{fontSize: mvs(13)}}
        containerStyles={
          !selectedAddress ? styles.buttonDisabled : styles.button
        }
        disabled={!selectedAddress}
      />

      <ModalConfirm
        modalVisible={showModal}
        title={t(textConfirm.title) || ''}
        subtitle={t(textConfirm.subtitle) || ''}
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={ms(21)}
              height={mvs(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={ms(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {t(textToast)}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
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
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: mvs(22),
    height: mvs(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: ms(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
