import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';

type Props = {
  progress: number;
  total: number;
  nextLvl: string;
  containerStyle?: ViewStyle;
};

const PointProgress: FC<Props> = ({
  progress,
  total,
  nextLvl,
  containerStyle,
}) => {
  const progressBar = progress / total;
  return (
    <View style={styles.container}>
      <Text style={styles.primerTxt}>Current Loyalty Points</Text>
      <Gap height={8} />
      <Progress.Bar
        progress={progressBar}
        width={null}
        height={widthResponsive(8)}
        borderWidth={0}
        color={color.Pink[11]}
        unfilledColor={color.Dark[300]}
        borderRadius={4}
        animated={true}
        animationType={'timing'}
      />
      <Gap height={8} />
      <View style={styles.descStyle}>
        <Text style={styles.primerTxt}>
          {`Points ${progress}`}
          <Text style={styles.scndTxt}>{`/${total}`}</Text>
        </Text>
        <Text style={styles.primerTxt}>
          Next lvl: <Text style={styles.scndTxt}>{nextLvl}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PointProgress;

const styles = StyleSheet.create({
  container: {},
  descStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primerTxt: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '700',
  },
  scndTxt: {
    color: color.Dark[100],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
  },
});
