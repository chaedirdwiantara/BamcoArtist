import React from 'react';
import Modal from 'react-native-modal';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import SsuSheet from '../../atom/SsuSheet';
import {color, typography} from '../../../theme';
import {heightPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';
import DeliveryItem from './DeliveryItem';
import Color from '../../../theme/Color';
import {dataCourier, dataDelivery} from '../../../data/Action/delivery';

interface ModalDeliveryProps {
  modalVisible: boolean;
  onPressClose: () => void;
  type: string;
  onSelectDelivery: (data: any) => void;
  onSelectCourier: (data: any) => void;
}

export const ModalDelivery: React.FC<ModalDeliveryProps> = ({
  modalVisible,
  onPressClose,
  type,
  onSelectDelivery,
  onSelectCourier,
}) => {
  const {t} = useTranslation();

  const children = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View style={styles.containerTitle}>
          <Text
            style={[
              typography.Heading4,
              {color: color.Neutral[10], textAlign: 'center'},
            ]}>
            {type === 'package' ? t('Checkout.Delivery') : t('Checkout.Agent')}
          </Text>
        </View>
        <View style={styles.border} />
        {type === 'package' ? (
          <View>
            {dataDelivery.map(data => {
              return (
                <>
                  <DeliveryItem
                    title={data.name}
                    time={data.estimated}
                    price={data.price}
                    onPress={() => onSelectDelivery(data)}
                  />
                  <View style={styles.border} />
                </>
              );
            })}
          </View>
        ) : (
          <View>
            {dataCourier.map(data => {
              return (
                <>
                  <DeliveryItem
                    title={data.name}
                    time={data.estimated}
                    price={data.price}
                    onPress={() => onSelectCourier(data)}
                  />
                  <View style={styles.border} />
                </>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal isVisible={modalVisible} style={{margin: 0}}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SsuSheet children={children()} containerStyle={{paddingHorizontal: 0}} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentage(16),
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Color.Dark[500],
    paddingTop: heightPercentage(14),
    marginTop: heightPercentage(14),
  },
});
