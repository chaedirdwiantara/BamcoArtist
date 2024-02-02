import React from 'react';
import {Modal, Platform, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {widthResponsive} from '../../../utils';

interface ModalLoadingProps {
  visible: boolean;
}

export const ModalLoading = (props: ModalLoadingProps) => {
  const {visible} = props;

  return (
    <>
      {visible && (
        <Modal statusBarTranslucent transparent visible={visible}>
          <View style={styles.root}>
            <Lottie
              source={require('../../../assets/animation/loading-beamco-musician.json')}
              autoPlay
              loop
              style={{
                height: '100%',
                width: widthResponsive(250),
                alignSelf: 'center',
              }}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    margin: 0,
  },
});
