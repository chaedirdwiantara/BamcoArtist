import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {ArrowRightIcon} from '../../../assets/icon';
import {height, widthPercentage} from '../../../utils';

export interface HorizontalCardProps {
  title: string;
  children: React.ReactNode;
  onPress: () => void;
  hideArrow?: boolean;
  containerStyle?: ViewStyle;
  containerTitleStyle?: ViewStyle;
}

const HorizontalCard: React.FC<HorizontalCardProps> = (
  props: HorizontalCardProps,
) => {
  const {
    title,
    children,
    onPress,
    hideArrow,
    containerStyle,
    containerTitleStyle,
  } = props;

  return (
    <View style={containerStyle}>
      {!hideArrow && (
        <TouchableOpacity
          style={[styles.containerContent, containerTitleStyle]}
          onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          <ArrowRightIcon
            stroke={color.Success[400]}
            style={{
              width: widthPercentage(22),
              height: widthPercentage(22),
            }}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  containerContent: {
    height: height * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(24),
  },
  title: {
    fontSize: mvs(15),
    fontFamily: font.InterSemiBold,
    color: color.Neutral[10],
  },
});
