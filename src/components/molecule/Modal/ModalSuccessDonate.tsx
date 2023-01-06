import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import Modal from 'react-native-modal';
import {CheckGradientIcon} from '../../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Button} from '../../atom';

interface ModalSuccessProps {
  toggleModal: () => void;
  modalVisible: boolean;
  containerStyle?: ViewStyle;
}

export const ModalSuccessDonate: FC<ModalSuccessProps> = (
  props: ModalSuccessProps,
) => {
  const {toggleModal, modalVisible} = props;
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      style={styles.modalStyle}>
      <View style={styles.container}>
        <CheckGradientIcon style={styles.iconStyle} />
        <Text style={styles.textStyles}>
          Congratulations! Your Donation have been Sent!
        </Text>
        <Button
          label="Dismiss"
          containerStyles={styles.btnDonate}
          onPress={toggleModal}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    paddingHorizontal: widthResponsive(24),
    borderRadius: 4,
  },
  iconStyle: {
    marginTop: heightResponsive(32),
    marginBottom: heightResponsive(20),
  },
  textStyles: {
    fontFamily: font.InterMedium,
    fontSize: mvs(15),
    fontWeight: '500',
    color: color.Neutral[10],
    marginBottom: heightResponsive(20),
    textAlign: 'center',
  },
  btnDonate: {
    width: '100%',
    backgroundColor: color.Success[400],
    marginBottom: heightResponsive(32),
  },
});
