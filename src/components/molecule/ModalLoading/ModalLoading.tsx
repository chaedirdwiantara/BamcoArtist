import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {ms, mvs} from 'react-native-size-matters';

interface ModalLoadingProps {
  visible: boolean;
}

export const ModalLoading = (props: ModalLoadingProps) => {
  const {visible} = props;

  return (
    <Modal statusBarTranslucent isVisible={visible} style={styles.root}>
      <Lottie
        source={require('../../../assets/animation/ssu-logo-loop.json')}
        autoPlay
        loop
        style={{
          padding: 0,
          margin: 0,
          width: ms(300),
          height: mvs(300),
          aspectRatio: 1 / 1,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});
