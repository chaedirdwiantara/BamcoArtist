import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {useTranslation} from 'react-i18next';
import {slideIndexStore} from '../../../store/reward.store';
import {
  BadgeDiamondIcon,
  BadgeGoldIcon,
  BadgePlatinumIcon,
  BadgeSilverIcon,
} from '../../../assets/icon';

type Props = {
  progress: number;
  total: number;
  currentLvl: string;
  nextLvl: string;
  isMax: boolean;
  containerStyle?: ViewStyle;
};

const PointProgress: FC<Props> = ({
  progress,
  total,
  currentLvl,
  nextLvl,
  isMax,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const {storedSlideIndex} = slideIndexStore();

  const lvlOnNum =
    currentLvl === 'Bronze'
      ? 0
      : currentLvl === 'Silver'
      ? 1
      : currentLvl === 'Gold'
      ? 2
      : currentLvl === 'Platinum'
      ? 3
      : 4;

  const iconNextRank = () => {
    return (
      <View style={styles.nextRank}>
        <View style={styles.nxtLvlCtr}>
          <Text style={styles.nxtLvlTxt}>{nextLvl}</Text>
        </View>
        {nextLvl === 'Silver' ? (
          <BadgeSilverIcon width={25} height={25} />
        ) : nextLvl === 'Gold' ? (
          <BadgeGoldIcon width={25} height={25} />
        ) : nextLvl === 'Platinum' ? (
          <BadgePlatinumIcon width={25} height={25} />
        ) : nextLvl === 'Diamond' ? (
          <BadgeDiamondIcon width={25} height={25} />
        ) : null}
      </View>
    );
  };

  const iconUpdateStateRank = () => {
    return (
      <View style={styles.nextRank}>
        <View style={styles.nxtLvlCtr}>
          <Text style={styles.nxtLvlTxt}>
            {storedSlideIndex === 0
              ? 'Silver'
              : storedSlideIndex === 1
              ? 'Gold'
              : storedSlideIndex === 2
              ? 'Platinum'
              : storedSlideIndex === 3
              ? 'Diamond'
              : ''}
          </Text>
        </View>
        {storedSlideIndex === 0 ? (
          <BadgeSilverIcon width={25} height={25} />
        ) : storedSlideIndex === 1 ? (
          <BadgeGoldIcon width={25} height={25} />
        ) : storedSlideIndex === 2 ? (
          <BadgePlatinumIcon width={25} height={25} />
        ) : storedSlideIndex === 3 ? (
          <BadgeDiamondIcon width={25} height={25} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Progress.Bar
        progress={isMax ? 1 : progress / total}
        width={null}
        height={widthResponsive(10)}
        borderWidth={2}
        borderColor={color.Dark[300]}
        color={color.Pink[11]}
        unfilledColor={color.Dark[300]}
        borderRadius={30}
        animated={true}
        animationType={'timing'}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressTxt}>
          {lvlOnNum === storedSlideIndex
            ? `${progress} / ${total}`
            : storedSlideIndex !== undefined && lvlOnNum > storedSlideIndex
            ? 'You have completed this level'
            : storedSlideIndex !== undefined && lvlOnNum < storedSlideIndex
            ? 'Complete Previous Level to Unlock'
            : ''}
        </Text>
      </View>
      {storedSlideIndex !== undefined ? iconUpdateStateRank() : iconNextRank()}
    </View>
  );
};

export default PointProgress;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
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
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progressTxt: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: widthResponsive(12),
  },
  nextRank: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: -1,
  },
  nxtLvlCtr: {
    position: 'absolute',
    alignSelf: 'center',
    width: widthResponsive(50),
  },
  nxtLvlTxt: {
    position: 'absolute',
    top: -18,
    left: 0,
    right: 0,
    color: color.Neutral[10],
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    zIndex: 1,
  },
});
