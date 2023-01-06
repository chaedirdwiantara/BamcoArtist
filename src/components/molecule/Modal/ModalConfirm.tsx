import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';

interface ModalConfirmProps {
  title?: string;
  subtitle?: string;
  modalVisible: boolean;
  onPressClose?: () => void;
  onPressOk?: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (
  props: ModalConfirmProps,
) => {
  const {title, subtitle, modalVisible, onPressClose, onPressOk} = props;
  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.root}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={onPressClose}>
              <Text style={styles.option}>{'No'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOk}>
              <Text style={styles.option}>{'Yes'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: Color.Dark[900],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
  },
  title: {
    fontSize: normalize(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: normalize(15),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    marginTop: heightPercentage(5),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: heightPercentage(25),
  },
  option: {
    fontSize: normalize(14),
    paddingHorizontal: widthPercentage(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
});
