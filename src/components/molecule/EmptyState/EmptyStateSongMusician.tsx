import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {heightResponsive, width} from '../../../utils';
import Color from '../../../theme/Color';

interface Props {
  text: string;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyStateSongMusician: React.FC<Props> = (props: Props) => {
  const {text} = props;
  return (
    <View style={[styles.root]}>
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightResponsive(250),
  },
  text: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: width * 0.84,
    fontSize: mvs(12),
    fontFamily: 'Inter-Regular',
    lineHeight: mvs(14),
  },
});
