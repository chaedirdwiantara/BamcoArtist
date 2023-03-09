import React, {FC} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

interface TitleProps {
  text: string;
  textStyle?: TextStyle;
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
