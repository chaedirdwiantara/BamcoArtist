import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const FacebookLogo = () => {
  return (
    <View style={styles.root}>
      <FastImage
        source={require('./logo-facebook.png')}
        style={{
          width: '50%',
          height: '50%',
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#3B5999',
    width: ms(40),
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FacebookLogo;
