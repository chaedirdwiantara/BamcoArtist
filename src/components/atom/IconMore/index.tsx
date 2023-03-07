import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../../theme';
import Gap from '../Gap/Gap';

const IconMore = () => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 3,
      }}>
      <View style={styles.dotStyle}></View>
      <Gap height={2.5} />
      <View style={styles.dotStyle}></View>
      <Gap height={2.5} />
      <View style={styles.dotStyle}></View>
    </View>
  );
};

export default IconMore;

const styles = StyleSheet.create({
  dotStyle: {
    width: 2.5,
    height: 2.5,
    borderRadius: 50,
    backgroundColor: color.Dark[50],
  },
});
