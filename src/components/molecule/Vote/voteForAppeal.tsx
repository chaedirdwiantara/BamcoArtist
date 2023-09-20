import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Button, Gap} from '../../atom';
import {CheckCircle2Icon} from '../../../assets/icon';
import {PollingOptions} from '../../../interface/feed.interface';

interface VoteForAppealProps {
  pollingOptions: PollingOptions[];
  pollTimeLeft: string;
  pollCount: number;
}

const VoteForAppeal: FC<VoteForAppealProps> = (props: VoteForAppealProps) => {
  const {pollingOptions, pollTimeLeft, pollCount} = props;
  return (
    <View>
      {pollingOptions?.map((item, i) => (
        <>
          {i !== 0 && <Gap height={6} />}
          <View style={styles.voteTopContainer}>
            <View style={styles.progressBarContainer}>
              <Progress.Bar
                progress={item.percent / 100}
                width={null}
                height={widthResponsive(27)}
                borderWidth={0}
                color={color.Pink[200]}
                unfilledColor={color.DarkBlue[800]}
                borderRadius={4}
                animated={true}
                animationType={'timing'}
              />
              <View style={styles.progressBarText}>
                <View style={styles.textAreaProgress}>
                  <Text style={styles.progressBarChild}>{item.text}</Text>
                  <Gap width={4} />
                  {item.isVoted && <CheckCircle2Icon width={14} height={14} />}
                </View>
                <Text
                  style={styles.progressBarChild}>{`${item.percent}%`}</Text>
              </View>
            </View>
          </View>
        </>
      ))}
      <Gap height={12} />
      <View style={styles.desc}>
        <Text style={[styles.descText, {color: color.Pink[800]}]}>
          {pollCount} votes
        </Text>
        <Gap width={4} />
        <Text style={[styles.descText, {color: color.Dark[50]}]}>
          {pollTimeLeft ?? 'Failed to get data'}
        </Text>
      </View>
    </View>
  );
};

export default VoteForAppeal;

const styles = StyleSheet.create({
  desc: {
    flexDirection: 'row',
  },
  descText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
  },
  voteTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
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
  buttonContainer: {
    width: undefined,
    aspectRatio: undefined,
    paddingVertical: widthResponsive(6),
    paddingHorizontal: widthResponsive(15),
    backgroundColor: color.Pink[200],
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '700',
  },
  textAreaProgress: {flexDirection: 'row', alignItems: 'center'},
});
