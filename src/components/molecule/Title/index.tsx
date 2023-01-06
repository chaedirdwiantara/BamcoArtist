import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';

interface TitleProps {
  text: string;
  textStyle?: ViewStyle;
}

const Title: FC<TitleProps> = (props: TitleProps) => {
  const {textStyle, text} = props;
  return <Text style={[styles.titleStyle, textStyle]}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  titleStyle: {
    color: color.Success[500],
    fontFamily: font.InterRegular,
    fontWeight: '700',
    fontSize: mvs(13),
  },
});
