import {StyleSheet, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';

interface ToastProps {
  modalVisible: boolean;
  onBackPressed?: () => void;
  children?: React.ReactNode;
  modalStyle?: ViewStyle;
  modalOnHide?: () => void;
}

const SsuToast: FC<ToastProps> = (props: ToastProps) => {
  const {modalVisible, onBackPressed, children, modalStyle, modalOnHide} =
    props;
  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          onBackButtonPress={onBackPressed}
          onBackdropPress={onBackPressed}
          backdropOpacity={0.1}
          propagateSwipe={true}
          children={children}
          style={modalStyle}
          onModalHide={modalOnHide}
        />
      )}
    </>
  );
};

export default SsuToast;

const styles = StyleSheet.create({});
