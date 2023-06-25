import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../components';

interface GrowthCardProps {
  number: string;
  numberDiffs: string;
  desc: string;
  containerStyle?: ViewStyle;
}

const GrowthCard: FC<GrowthCardProps> = (props: GrowthCardProps) => {
  const {number, desc, containerStyle, numberDiffs} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.percentage}>
        <Text style={styles.textNum}>{number ?? 0}</Text>
        <Gap width={8} />
        <Text style={styles.numberDiffs}>{numberDiffs}</Text>
      </View>
      <Gap height={2} />
      <Text style={styles.textDesc}>{desc}</Text>
    </View>
  );
};

export default GrowthCard;

const styles = StyleSheet.create({
  container: {
    marginTop: widthResponsive(20),
    paddingVertical: widthResponsive(10),
    paddingHorizontal: widthResponsive(12),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  percentage: {flexDirection: 'row', alignItems: 'center'},
  textNum: {
    fontFamily: font.InterRegular,
    fontSize: mvs(18),
    fontWeight: '600',
    color: color.Neutral[10],
  },
  numberDiffs: {
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
    color: color.Green[200],
  },
  textDesc: {
    fontFamily: font.InterRegular,
    fontSize: mvs(9),
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
