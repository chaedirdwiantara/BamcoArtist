import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CoinDIcon, AddIcon, GiftIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

type Props = {
  credit: number | string;
  onPressCredit: () => void;
  onPressGift: () => void;
  isNewGift?: boolean;
  onSwipe?: boolean;
};

const LiveTippingNav = (props: Props) => {
  const {credit, onPressCredit, onPressGift, isNewGift, onSwipe} = props;
  const {t} = useTranslation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isTop, setIsTop] = useState(true);

  const startAnimation = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsTop(!isTop);
    });
  };

  useEffect(() => {
    startAnimation(onSwipe ? 1 : 0);
  }, [onSwipe]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [heightResponsive(0), heightResponsive(40)],
    extrapolate: 'clamp',
  });

  const rotateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={styles.rowCenter}>
        <View style={styles.creditWrapper}>
          {onSwipe && (
            <View style={styles.containerAnimation}>
              <Animated.View
                style={[
                  {
                    transform: [{translateY}, {rotateY}],
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <CoinDIcon width={widthResponsive(10)} />
                {/* <Text
                  style={[
                    Typography.Overline,
                    {color: Color.Neutral[10], fontWeight: '600'},
                  ]}>
                  -1
                </Text> */}
              </Animated.View>
            </View>
          )}

          <CoinDIcon width={widthResponsive(10)} />
          <Gap width={widthResponsive(3)} />
          <Text
            style={[
              Typography.Overline,
              {color: Color.Neutral[10], fontWeight: '600'},
            ]}>
            {credit}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressCredit} style={styles.plusWrapper}>
          <AddIcon width={widthResponsive(14)} height={heightResponsive(14)} />
        </TouchableOpacity>
      </View>
      <Gap width={widthResponsive(20)} />
      <TouchableOpacity onPress={onPressGift} style={styles.rowCenter}>
        <GiftIcon
          stroke="#FFF"
          width={widthResponsive(18)}
          height={heightResponsive(18)}
        />
        {isNewGift && (
          <View style={styles.talkBubble}>
            <View style={styles.talkBubbleSquare}>
              <Text style={[Typography.Overline, styles.claim]}>
                {t('ClaimReward.Claim')}
              </Text>
            </View>
            <View style={styles.talkBubbleTriangle} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LiveTippingNav;

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: heightResponsive(-34),
    left: widthResponsive(-10),
  },
  talkBubbleSquare: {
    width: widthResponsive(40),
    height: heightResponsive(20),
    backgroundColor: Color.Error[600],
    borderRadius: 4,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: widthResponsive(10),
    top: widthResponsive(-8),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: widthResponsive(10),
    borderRightWidth: widthResponsive(10),
    borderBottomWidth: widthResponsive(20),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Color.Error[600],
  },
  creditWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.Pink.linear,
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: heightResponsive(4),
    paddingLeft: widthResponsive(8),
    paddingRight: widthResponsive(14),
    backgroundColor: '#4A244B',
  },
  plusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.Success[700],
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    right: widthResponsive(-10),
    padding: widthResponsive(3),
    backgroundColor: '#214D35',
  },
  rowCenter: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  claim: {
    color: Color.Neutral[10],
    fontWeight: '700',
    fontSize: mvs(8),
  },
  containerAnimation: {
    position: 'absolute',
    bottom: 0,
    left: widthResponsive(8),
  },
});
