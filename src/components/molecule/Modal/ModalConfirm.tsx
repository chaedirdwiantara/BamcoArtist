import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ModalConfirmProps {
  title?: string;
  subtitle?: string;
  modalVisible: boolean;
  onPressClose?: () => void;
  onPressOk?: () => void;
  disabled?: boolean;
  yesText?: string;
  noText?: string;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (
  props: ModalConfirmProps,
) => {
  const {
    title,
    subtitle,
    modalVisible,
    onPressClose,
    onPressOk,
    disabled,
    yesText,
    noText,
  } = props;
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
              <Text style={styles.option}>{noText ? noText : 'No'}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled} onPress={onPressOk}>
              <Text style={styles.option}>{yesText ? yesText : 'Yes'}</Text>
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
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(15),
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
    fontSize: mvs(14),
    paddingHorizontal: widthPercentage(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
});
