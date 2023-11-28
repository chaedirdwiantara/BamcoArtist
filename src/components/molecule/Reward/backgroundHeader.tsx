import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {
  BadgeBronzeMIcon,
  BadgeDiamondMIcon,
  BadgeGoldMIcon,
  BadgePlatinumMIcon,
  BadgeSilverMIcon,
  CupIcon,
} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {widthResponsive} from '../../../utils';

type Props = {
  rankTitle: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
};

const BackgroundHeader: FC<Props> = ({rankTitle, points}) => {
  const Bronze = '../../../assets/image/Bg1.png';
  const Silver = '../../../assets/image/Bg2.png';
  const Gold = '../../../assets/image/Bg2.png';
  const Platinum = '../../../assets/image/Bg2.png';
  const Diamond = '../../../assets/image/Bg2.png';
  return (
    <ImageBackground
      style={styles.bgContainer}
      source={
        rankTitle === 'bronze'
          ? require(Bronze)
          : rankTitle === 'silver'
          ? require(Silver)
          : rankTitle === 'gold'
          ? require(Gold)
          : rankTitle === 'platinum'
          ? require(Platinum)
          : require(Diamond)
      }
      // resizeMode="stretch"
    >
      <View style={styles.topStyle}>
        <Gap height={45} />
        <Text style={styles.scndTxt}>Your rank</Text>
        <Text style={styles.primTxt}>
          {rankTitle.charAt(0).toUpperCase() + rankTitle.slice(1)}
        </Text>
      </View>
      <View style={styles.midStyle}>
        {rankTitle === 'bronze' ? (
          <BadgeBronzeMIcon />
        ) : rankTitle === 'silver' ? (
          <BadgeSilverMIcon />
        ) : rankTitle === 'gold' ? (
          <BadgeGoldMIcon />
        ) : rankTitle === 'platinum' ? (
          <BadgePlatinumMIcon />
        ) : (
          <BadgeDiamondMIcon />
        )}
      </View>
      <View style={styles.bottomStyle}>
        <View style={styles.pointStyle}>
          <CupIcon width={18} height={18} />
          <Gap width={5} />
          <Text style={styles.primTxt}>{points}</Text>
        </View>
        <Text style={styles.scndTxt}>Your Loyalty Point</Text>
        <Gap height={65} />
      </View>
    </ImageBackground>
  );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
  bgContainer: {width: '100%', height: widthResponsive(400)},
  topStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  midStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  pointStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  primTxt: {
    color: color.Neutral[20],
    textAlign: 'center',
    fontSize: mvs(20),
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
  },
  scndTxt: {
    color: color.Neutral[20],
    textAlign: 'center',
    fontSize: mvs(10),
    fontWeight: '500',
  },
});
