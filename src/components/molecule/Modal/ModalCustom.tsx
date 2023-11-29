import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';

interface ModalCustomProps {
  modalVisible: boolean;
  onPressClose?: () => void;
  children?: React.ReactNode;
}

export const ModalCustom: React.FC<ModalCustomProps> = (
  props: ModalCustomProps,
) => {
  const {children, modalVisible, onPressClose} = props;
  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.root}>{children}</View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
