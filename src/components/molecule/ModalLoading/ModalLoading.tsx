import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {ms, mvs} from 'react-native-size-matters';
import {height} from '../../../utils';

interface ModalLoadingProps {
  visible: boolean;
}

export const ModalLoading = (props: ModalLoadingProps) => {
  const {visible} = props;

  return (
    <Modal
      deviceHeight={height}
      statusBarTranslucent
      isVisible={visible}
      style={styles.root}>
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
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    margin: 0,
  },
});
