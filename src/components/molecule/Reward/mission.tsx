import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {CheckBoxIcon, CheckCircle2Icon, CupIcon} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Button, Gap} from '../../atom';

interface MissionProps {
  progress: number; // Range from 0 to 1
  total: number;
  missionTitle: string;
  onClaim: () => void;
  onGo: () => void;
  isClaimable: boolean;
  isCompleted: boolean;
  rewardCount: number;
}

const Mission: React.FC<MissionProps> = ({
  progress,
  total,
  missionTitle,
  onClaim,
  onGo,
  isClaimable,
  isCompleted,
  rewardCount,
}) => {
  const progressBar = progress / total;
  const progressText = `${progress}/${total}`;

  return (
    <View style={styles.voteTopContainer}>
      <View style={styles.progressBarContainer}>
        <View style={styles.captionContainer}>
          <Text style={styles.titleTxt}>{missionTitle}</Text>
          <View style={styles.rewardCountContainer}>
            <Text style={styles.rewardCountTxt}>{rewardCount}</Text>
            <Gap width={3} />
            <CupIcon />
          </View>
        </View>
        <Gap height={12} />
        <Progress.Bar
          progress={progressBar}
          width={null}
          height={widthResponsive(11)}
          borderWidth={0}
          color={color.Pink[200]}
          unfilledColor={color.Dark[300]}
          borderRadius={4}
          animated={true}
          animationType={'timing'}
        />
        {!isCompleted ? (
          <View style={styles.progressContainer}>
            <Text style={styles.progressTxt}>{progressText}</Text>
          </View>
        ) : (
          <View style={styles.progressContainer}>
            <CheckCircle2Icon width={10} height={10} />
            <Gap width={4} />
            <Text style={styles.progressTxt}>{'Completed'}</Text>
          </View>
        )}
      </View>

      {!isCompleted && (
        <View style={styles.btnContainer}>
          <Gap width={16} />
          {isClaimable ? (
            <Button
              label={'Claim'}
              containerStyles={styles.btnClaim}
              textStyles={styles.textButton}
              onPress={onClaim}
            />
          ) : (
            <Button
              label={'Go'}
              containerStyles={styles.btnGo}
              textStyles={styles.textGoButton}
              onPress={onGo}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  voteTopContainer: {
    flexDirection: 'row',
    backgroundColor: color.Dark[700],
    padding: widthResponsive(16),
    borderRadius: 4,
    marginBottom: widthResponsive(16),
  },
  progressBarContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },
  progressContainer: {
    position: 'absolute',
    top: widthResponsive(28),
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTxt: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: widthResponsive(12),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnClaim: {
    aspectRatio: undefined,
    width: widthResponsive(50),
    height: widthResponsive(40),
    backgroundColor: color.Pink[200],
  },
  btnGo: {
    width: widthResponsive(50),
    height: widthResponsive(40),
    aspectRatio: undefined,
    backgroundColor: color.Dark[800],
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
  textGoButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Pink[200],
  },
  textAreaProgress: {flexDirection: 'row', alignItems: 'center'},
  rewardCountContainer: {flexDirection: 'row', alignItems: 'center'},
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '600',
  },
  rewardCountTxt: {
    color: color.Warning[750],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});

export default Mission;
