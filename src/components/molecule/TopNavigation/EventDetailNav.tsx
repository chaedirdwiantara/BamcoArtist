import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {GiftIcon, TicketEventIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

type Props = {
  onPressGift: () => void;
  isGenerated?: boolean;
  onPressVoucher?: () => void;
};

const EventDetailNav = (props: Props) => {
  const {onPressGift, isGenerated, onPressVoucher} = props;
  const {t} = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {!isGenerated && (
        <>
          <TouchableOpacity onPress={onPressVoucher} style={styles.rowCenter}>
            <TicketEventIcon
              stroke="#FFF"
              width={widthResponsive(22)}
              height={heightResponsive(22)}
            />
            <View style={styles.talkBubble}>
              <View style={styles.talkBubbleSquare}>
                <Text style={[Typography.Overline, styles.claim]}>
                  {t('Event.Detail.Freebies')}
                </Text>
              </View>
              <View style={styles.talkBubbleTriangle} />
            </View>
          </TouchableOpacity>
          <Gap width={widthResponsive(18)} />
        </>
      )}

      <TouchableOpacity onPress={onPressGift} style={styles.rowCenter}>
        <GiftIcon
          stroke="#FFF"
          width={widthResponsive(18)}
          height={heightResponsive(18)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventDetailNav;

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: heightResponsive(-32),
    left: widthResponsive(-10),
  },
  talkBubbleSquare: {
    left: widthResponsive(-18),
    width: widthResponsive(80),
    height: heightResponsive(20),
    backgroundColor: '#00E570',
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
    borderBottomColor: '#00E570',
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
