import React from 'react';
import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const AppleLogo = () => {
  return (
    <FastImage
      source={require('./logo-apple.png')}
      style={{
        width: ms(40),
        height: undefined,
        aspectRatio: 1 / 1,
        borderRadius: ms(100),
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    width: ms(40),
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppleLogo;
