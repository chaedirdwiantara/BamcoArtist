import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Button, Circle, DottedLine, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {DrinkRewardIcon} from '../../../assets/icon';

type Props = {
  points: number;
  voucherTitle: string;
  voucherSubtitle: string;
  voucherDesc?: string;
  voucherAvail: number;
  onPress: () => void;
  containerStyle?: ViewStyle;
  claimable: boolean;
  redeemable: boolean;
  completed: boolean;
};

const VoucherReward: React.FC<Props> = ({
  points,
  voucherTitle,
  voucherSubtitle,
  voucherDesc,
  voucherAvail,
  onPress,
  containerStyle,
  claimable,
  redeemable,
  completed,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.absoluteTextContainer}>
          {voucherAvail > 1 && (
            <View style={styles.voucherLeftContainer}>
              <Text style={styles.voucherLeft}>{voucherAvail} Left</Text>
            </View>
          )}
        </View>
        <DrinkRewardIcon />
        <Gap height={3} />
        <Text style={styles.pointsText}>{`${points} Points`}</Text>
        <Text style={styles.voucherTitleText} numberOfLines={1}>
          {voucherTitle}
        </Text>
        <Text style={styles.voucherText} numberOfLines={1}>
          {voucherSubtitle}
        </Text>
        {voucherDesc && (
          <Text style={styles.voucherDesc} numberOfLines={1}>
            {voucherDesc}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.dottedContainer}>
          <DottedLine color={color.Dark[10]} />
        </View>
        <View style={styles.footer}>
          {claimable ? (
            <Button
              label={'Claim Voucher'}
              containerStyles={styles.btnClaim}
              textStyles={styles.textButton}
              onPress={onPress}
            />
          ) : redeemable ? (
            <Button
              label={'Redeem or Share'}
              containerStyles={styles.btnClaim}
              textStyles={styles.textButton}
              onPress={onPress}
            />
          ) : completed ? (
            <View style={{paddingVertical: widthResponsive(4)}}>
              <Text style={styles.footerText}>Redeemed</Text>
            </View>
          ) : (
            <View style={{paddingVertical: widthResponsive(4)}}>
              <Text style={styles.footerText} numberOfLines={1}>
                Need More Pts
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default VoucherReward;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    width: '100%',
    backgroundColor: '#1A2435',
    borderRadius: 8,
    paddingHorizontal: widthResponsive(16),
    paddingTop: widthResponsive(16),
    paddingBottom: widthResponsive(11),
  },
  pointsText: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
  },
  eventContainer: {
    // Style for the event name container
  },
  voucherTitleText: {
    color: color.Pink[200],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
    lineHeight: widthResponsive(22),
  },
  voucherText: {
    color: color.Neutral[10],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
  },
  voucherDesc: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(12),
    lineHeight: widthResponsive(20),
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A2435',
    borderRadius: 8,
  },
  footer: {
    paddingVertical: widthResponsive(10),
    paddingHorizontal: widthResponsive(8),
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: font.InterSemiBold,
    color: color.Dark[200],
    fontSize: mvs(12),
    fontWeight: '600',
  },
  dottedContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(5),
  },
  absoluteTextContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  voucherLeftContainer: {
    backgroundColor: color.Dark[800],
    borderRadius: 4,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: widthResponsive(2),
    alignSelf: 'flex-end',
    marginTop: widthResponsive(9),
    marginRight: widthResponsive(9),
  },
  voucherLeft: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    textAlign: 'right',
    color: color.Pink[200],
  },
  btnClaim: {
    aspectRatio: undefined,
    width: '100%',
    backgroundColor: color.Pink[200],
    paddingVertical: widthResponsive(4),
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});
