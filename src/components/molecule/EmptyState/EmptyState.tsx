import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {width} from '../../../utils';
import Color from '../../../theme/Color';
import {CrackEggIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

interface Props {
  text?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  const {text, containerStyle, icon} = props;
  return (
    <View style={[styles.root, containerStyle]}>
      {icon ? icon : <CrackEggIcon />}
      <Text style={[Typography.Button2, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: width * 0.8,
    fontSize: mvs(15),
    fontFamily: 'Inter-Medium',
  },
});
