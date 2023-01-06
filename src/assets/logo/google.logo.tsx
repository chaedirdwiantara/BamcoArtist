import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {color} from '../../theme';

const GoogleLogo = () => {
  return (
    <View style={styles.root}>
      <FastImage
        source={require('./logo-google.png')}
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
    backgroundColor: color.Neutral[10],
    width: ms(40),
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoogleLogo;
