import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {ArrowDownIcon, ArrowUpGreenIcon} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';

interface GrowthCardProps {
  number: string;
  numberDiffs: string;
  desc: string;
  progress: 'improve' | 'regression' | 'same';
  containerStyle?: ViewStyle;
  noOfLines?: number;
}

const GrowthCard: FC<GrowthCardProps> = (props: GrowthCardProps) => {
  const {number, desc, numberDiffs, progress, containerStyle, noOfLines} =
    props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.percentage}>
        <Text style={styles.textNum}>
          {number && number !== '' ? number : 0}
        </Text>
        <Gap width={4} />
        {progress === 'improve' ? (
          <ArrowUpGreenIcon />
        ) : progress === 'regression' ? (
          <ArrowDownIcon />
        ) : null}
        <Text
          style={[
            styles.numberDiffs,
            {
              color:
                progress === 'improve' ? color.Green[200] : color.Error[500],
            },
          ]}>
          {progress !== 'same' ? numberDiffs : ''}
        </Text>
      </View>
      <Gap height={4} />
      <Text style={styles.textDesc} numberOfLines={noOfLines ? noOfLines : 1}>
        {desc}
      </Text>
    </View>
  );
};

export default GrowthCard;

const styles = StyleSheet.create({
  container: {
    marginTop: widthResponsive(20),
    paddingVertical: widthResponsive(8),
    paddingHorizontal: widthResponsive(12),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
    width: '47%',
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
  },
  textDesc: {
    fontFamily: font.InterRegular,
    fontSize: mvs(9),
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
