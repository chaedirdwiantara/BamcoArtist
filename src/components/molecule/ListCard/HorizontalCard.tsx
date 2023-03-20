import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {height} from '../../../utils';
import {color, font} from '../../../theme';
import {ArrowRightIcon} from '../../../assets/icon';

export interface HorizontalCardProps {
  title: string;
  children: React.ReactNode;
  onPress: () => void;
  hideArrow?: boolean;
  containerStyle?: ViewStyle;
}

const HorizontalCard: React.FC<HorizontalCardProps> = (
  props: HorizontalCardProps,
) => {
  const {title, children, onPress, hideArrow, containerStyle} = props;

  return (
    <View style={containerStyle}>
      {!hideArrow && (
        <TouchableOpacity style={styles.containerContent} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          <ArrowRightIcon stroke={color.Pink[100]} />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  containerContent: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: mvs(15),
    fontFamily: font.InterSemiBold,
    color: color.Neutral[10],
  },
});
