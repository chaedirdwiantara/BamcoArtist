import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../atom';

const Merch = () => {
  return (
    <View>
      <Text style={styles.textComp}>Merch</Text>
      <Gap height={16} />
    </View>
  );
};

export default Merch;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
