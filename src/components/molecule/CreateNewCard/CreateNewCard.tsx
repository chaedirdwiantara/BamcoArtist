import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {SquareImage} from '../../atom';
import {color, font} from '../../../theme';
import Typography from '../../../theme/Typography';
import {normalize, widthPercentage, widthResponsive} from '../../../utils';

interface ListProps {
  num: string;
  text: string;
  containerStyles?: ViewStyle;
  onPress?: () => void;
}

export const CreateNewCard: React.FC<ListProps> = ({
  num,
  text,
  containerStyles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPress}>
      {num ? <Text style={styles.numStyle}>{num}</Text> : null}
      <SquareImage type="add" size={widthResponsive(44)} />
      <Text style={[Typography.Subtitle1, styles.labelStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  numStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthResponsive(30),
    color: color.Dark[100],
  },
  labelStyle: {
    fontSize: Platform.OS === 'ios' ? mvs(15) : mvs(14),
    color: color.Neutral[10],
    marginLeft: widthPercentage(12),
  },
});
