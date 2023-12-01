import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {color, font} from '../../../theme';
import {width, widthPercentage} from '../../../utils';

interface ModalInfoSendGift {
  modalVisible: boolean;
  credit: number;
  type: 'success' | 'failed';
  onPressClose: () => void;
}

export const ModalInfoSendGift: FC<ModalInfoSendGift> = (
  props: ModalInfoSendGift,
) => {
  const {t} = useTranslation();
  const {modalVisible, type, credit, onPressClose} = props;

  const imageUrl =
    type === 'success'
      ? require('../../../assets/image/gift-claimed.png')
      : require('../../../assets/image/alert.png');

  const titleText =
    type === 'success'
      ? 'Rewards.DetailVoucher.ModalSuccess.Title'
      : 'Rewards.DetailVoucher.ModalFailed.Title';

  const subtitleText =
    type === 'success'
      ? 'Rewards.DetailVoucher.ModalSuccess.Subtitle'
      : 'Rewards.DetailVoucher.ModalFailed.Subtitle';

  const children = () => {
    return (
      <View style={styles.card}>
        <Image source={imageUrl} />
        <Text style={styles.title}>{t(titleText, {credit})}</Text>
        <Text style={styles.subtitle}>{t(subtitleText)}</Text>
        <TouchableOpacity onPress={onPressClose}>
          <Text style={styles.btn}>{t('Btn.Dismiss')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {modalVisible && (
        <ModalCustom modalVisible={modalVisible} children={children()} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(25),
  },
  title: {
    textAlign: 'center',
    fontFamily: font.InterSemiBold,
    fontSize: mvs(15),
    color: color.Neutral[10],
    marginTop: mvs(15),
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(11),
    color: '#BDBDBD',
    marginTop: mvs(5),
  },
  btn: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Pink[200],
    marginTop: mvs(25),
  },
});
