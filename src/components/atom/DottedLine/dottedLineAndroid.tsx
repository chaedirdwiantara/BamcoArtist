import React from 'react';
import {View, StyleSheet, DimensionValue} from 'react-native';

type Props = {
  length?: DimensionValue;
  color?: string;
};

const DottedLineAndroid: React.FC<Props> = ({
  length = '100%',
  color = '#000',
}) => {
  return <View style={[styles.line, {width: length, borderColor: color}]} />;
};

const styles = StyleSheet.create({
  line: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    // borderRadius: 1,
  },
});

export default DottedLineAndroid;
