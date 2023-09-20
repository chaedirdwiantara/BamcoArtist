import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {height, heightResponsive, widthResponsive} from '../../../utils';

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
      {Platform.OS === 'ios' ? (
        <Lottie
          source={require('../../../assets/animation/loading-beamco-musician.json')}
          autoPlay
          loop
          style={{
            padding: 0,
            margin: 0,
            width: widthResponsive(250),
            height: heightResponsive(250),
            aspectRatio: 1 / 1,
          }}
        />
      ) : (
        <Lottie
          source={require('../../../assets/animation/loading-beamco-musician.json')}
          autoPlay
          loop
        />
      )}
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
