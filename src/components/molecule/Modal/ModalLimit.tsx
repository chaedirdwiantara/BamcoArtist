import React from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Button} from '../../atom';
import {color} from '../../../theme';
import Font from '../../../theme/Font';
import SsuSheet from '../../atom/SsuSheet';
import {heightPercentage, normalize, width} from '../../../utils';

interface ModalLimitProps {
  text: string;
  modalVisible: boolean;
  onPressClose: () => void;
}

export const ModalLimit: React.FC<ModalLimitProps> = ({
  text,
  modalVisible,
  onPressClose,
}) => {
  const {t} = useTranslation();

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{t('Modal.Limit.Title')}</Text>
        <View style={styles.separator} />
        <View
          style={{
            width: width * 0.9,
            marginBottom: heightPercentage(20),
          }}>
          <Text style={styles.subtitle1}>{text}</Text>
        </View>
        <Button
          type="border"
          label={t('Btn.Close')}
          containerStyles={styles.btnCancel}
          textStyles={{color: color.Success[400]}}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <Modal isVisible={modalVisible} style={{margin: 0}}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SsuSheet children={children()} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(28),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  separator: {
    backgroundColor: '#2B3240',
    width: width,
    height: mvs(1),
    marginVertical: heightPercentage(30),
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnCancel: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  subtitle1: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(14),
    color: color.Neutral[10],
  },
});
