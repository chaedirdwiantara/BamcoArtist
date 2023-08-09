import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

interface DividerProps {
  text?: string;
  containerStyle?: ViewStyle;
  lineStyle?: ViewStyle;
}

const SsuDivider: FC<DividerProps> = ({text, containerStyle, lineStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.lineStyle, lineStyle]} />
      {text ? <Text style={styles.textStyle}>{text}</Text> : null}
      <View style={[styles.lineStyle, lineStyle]} />
    </View>
  );
};

export default SsuDivider;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  lineStyle: {
    flex: 1,
    height: mvs(1),
    backgroundColor: color.Dark[500],
  },
  textStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
    color: color.Neutral[10],
    paddingHorizontal: ms(8),
  },
});
