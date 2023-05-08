import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {heightPercentage, width} from '../../../utils';
import Color from '../../../theme/Color';
import {CrackEggIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

interface Props {
  text: string;
  subtitle?: string;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  const {text, subtitle, containerStyle, icon, hideIcon, textStyle} = props;
  return (
    <View style={[styles.root, containerStyle]}>
      {hideIcon ? <></> : icon ? icon : <CrackEggIcon />}
      <Text style={[Typography.Button2, styles.text, textStyle]}>{text}</Text>
      {subtitle && (
        <Text style={[Typography.Caption, styles.subtitle]}>{subtitle}</Text>
      )}
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
  subtitle: {
    color: Color.Neutral[10],
    maxWidth: width * 0.8,
    textAlign: 'center',
    paddingTop: heightPercentage(4),
  },
});
