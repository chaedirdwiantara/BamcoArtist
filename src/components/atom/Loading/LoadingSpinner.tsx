import React from 'react';
import Lottie from 'lottie-react-native';
import {ms, mvs} from 'react-native-size-matters';

const LoadingSpinner = ({type}: {type?: string}) => {
  const src =
    type === 'profile'
      ? require('../../../assets/animation/loading-spinner-white.json')
      : require('../../../assets/animation/loading-spinner.json');

  return (
    <Lottie
      source={src}
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
