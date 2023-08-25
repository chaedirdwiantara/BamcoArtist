import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CoinDIcon, AddIcon, GiftIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';

const LiveTippingNav = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={styles.rowCenter}>
        <View style={styles.creditWrapper}>
          <CoinDIcon width={widthResponsive(10)} />
          <Gap width={widthResponsive(3)} />
          <Text
            style={[
              Typography.Overline,
              {color: Color.Neutral[10], fontWeight: '600'},
            ]}>
            121.000
          </Text>
        </View>
        <TouchableOpacity style={styles.plusWrapper}>
          <AddIcon width={widthResponsive(14)} height={heightResponsive(14)} />
        </TouchableOpacity>
      </View>
      <Gap width={widthResponsive(20)} />
      <View style={styles.rowCenter}>
        <GiftIcon
          stroke="#FFF"
          width={widthResponsive(18)}
          height={heightResponsive(18)}
        />
        <View style={styles.talkBubble}>
          <View style={styles.talkBubbleSquare}>
            <Text style={[Typography.Overline, styles.claim]}>Claim</Text>
          </View>
          <View style={styles.talkBubbleTriangle} />
        </View>
      </View>
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
});
