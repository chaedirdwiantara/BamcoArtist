import React from 'react';
import Lottie from 'lottie-react-native';
import {ms, mvs} from 'react-native-size-matters';

const LoadingSpinner = () => {
  return (
    <Lottie
      source={require('../../../assets/animation/loading-spinner.json')}
      autoPlay
      loop
      style={{
        padding: 0,
        margin: 0,
        width: ms(70),
        height: mvs(70),
        aspectRatio: 1 / 1,
      }}
    />
  );
};

export default LoadingSpinner;
