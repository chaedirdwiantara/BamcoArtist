import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ExportMusicIcon} from '../../assets/icon';
import {color, font} from '../../theme';
import {normalize} from '../../utils';

const Footer = () => {
  return (
    <View style={styles.container}>
      <ExportMusicIcon />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(12),
  },
});
