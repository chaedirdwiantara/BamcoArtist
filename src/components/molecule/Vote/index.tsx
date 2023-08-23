import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';

const VoteCard = () => {
  return (
    <View>
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={70 / 100}
          width={null}
          height={widthResponsive(27)}
          borderWidth={0}
          color={color.Pink.linear}
          unfilledColor={color.DarkBlue[800]}
          borderRadius={4}
          animated={true}
          animationType={'timing'}
        />
        <View style={styles.progressBarText}>
          <Text style={styles.progressBarChild}>Sweet Child katanya</Text>
          <Text style={styles.progressBarChild}>70%</Text>
        </View>
      </View>
      <Gap height={12} />
      <View style={styles.desc}>
        <Text style={[styles.descText, {color: color.Pink[800]}]}>1 votes</Text>
        <Gap width={4} />
        <Text style={[styles.descText, {color: color.Dark[50]}]}>
          6 day left
        </Text>
      </View>
    </View>
  );
};

export default VoteCard;

const styles = StyleSheet.create({
  desc: {
    flexDirection: 'row',
  },
  descText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
  },
  progressBarContainer: {
    position: 'relative',
  },
  progressBarText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthResponsive(8),
  },
  progressBarChild: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
  },
});
