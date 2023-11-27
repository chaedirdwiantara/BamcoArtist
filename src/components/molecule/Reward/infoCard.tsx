import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {widthResponsive} from '../../../utils';
import {
  BadgeBronzeIcon,
  BadgeDiamondIcon,
  BadgeGoldIcon,
  BadgePlatinumIcon,
  BadgeSilverIcon,
} from '../../../assets/icon';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  caption: string;
  angle?: number;
  containerStyle?: ViewStyle;
  titleTxtStyle?: ViewStyle;
  captionTxtStyle?: ViewStyle;
  badgeType: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
};

const InfoCard: FC<Props> = ({
  title,
  caption,
  angle,
  containerStyle,
  titleTxtStyle,
  captionTxtStyle,
  badgeType,
}) => {
  const bgColor =
    badgeType === 'bronze'
      ? ['#C59F69', '#8E7144']
      : badgeType === 'silver'
      ? ['#A29E97', '#6C6E6F']
      : badgeType === 'gold'
      ? ['#DBB65E', '#A48334']
      : badgeType === 'platinum'
      ? ['#80A4AA', '#406368']
      : ['#9E7BD6', '#6D4AA8'];

  return (
    <LinearGradient
      useAngle
      colors={bgColor}
      angle={angle}
      style={[styles.container, containerStyle]}>
      {badgeType === 'bronze' ? (
        <BadgeBronzeIcon />
      ) : badgeType === 'silver' ? (
        <BadgeSilverIcon />
      ) : badgeType === 'gold' ? (
        <BadgeGoldIcon />
      ) : badgeType === 'platinum' ? (
        <BadgePlatinumIcon />
      ) : (
        // ! REMEMBER TO FIX THIS ICON
        <BadgeDiamondIcon />
      )}
      <Gap width={16} />
      <View style={styles.txtContainer}>
        <Text style={[styles.titleStyle, titleTxtStyle]}>{title}</Text>
        <Text style={[styles.captionStyle, captionTxtStyle]}>{caption}</Text>
      </View>
    </LinearGradient>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtContainer: {flex: 1},
  titleStyle: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(12),
    fontWeight: '600',
    color: color.Neutral[10],
  },
  captionStyle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
