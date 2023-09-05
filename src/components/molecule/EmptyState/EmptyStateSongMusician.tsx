import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {heightResponsive, width} from '../../../utils';
import Color from '../../../theme/Color';

interface Props {
  title?: string;
  text: string;
  height?: number;
}

export const EmptyStateSongMusician: React.FC<Props> = (props: Props) => {
  const {title = '', text, height = 250} = props;
  return (
    <View style={[styles.root, {height: heightResponsive(height)}]}>
      {title !== '' && <Text style={[styles.title]}>{title}</Text>}
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: width * 0.84,
    fontSize: mvs(12),
    fontFamily: 'Inter-Regular',
    lineHeight: mvs(14),
  },
  title: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: width * 0.84,
    fontSize: mvs(14),
    fontFamily: 'Inter-Medium',
    lineHeight: mvs(20),
  },
});
