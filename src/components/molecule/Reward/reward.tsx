import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Button, DottedLineAndroid, DottedLineIos, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {CoinIcon} from '../../../assets/icon';
import WalletRewardIcon from '../../../assets/icon/WalletReward.icon';

type Props = {
  points: number;
  voucherTitle: string;
  voucherAvail: number;
  onPress: () => void;
  containerStyle?: ViewStyle;
  redeemable: boolean;
  completed: boolean;
  freeCredit: number;
};

const VoucherReward: React.FC<Props> = ({
  points,
  voucherTitle,
  voucherAvail,
  onPress,
  containerStyle,
  redeemable,
  completed,
  freeCredit,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <WalletRewardIcon />
        <Gap width={16} />

        <View style={{flex: 1}}>
          <Text
            style={[
              styles.voucherTitleText,
              {
                color: redeemable
                  ? color.Pink[200]
                  : completed
                  ? color.Dark[100]
                  : color.Dark[100],
              },
            ]}
            numberOfLines={3}>
            {voucherTitle}
          </Text>
          <View style={styles.wrapperCoin}>
            <CoinIcon />
            <Text
              style={[
                styles.coinText,
                {
                  color: redeemable
                    ? color.Neutral[10]
                    : completed
                    ? color.Dark[100]
                    : color.Dark[100],
                },
              ]}>
              {freeCredit}
            </Text>
          </View>
        </View>
        {voucherAvail > 1 && (
          <View style={styles.voucherLeftContainer}>
            <Text style={styles.voucherLeft}>{voucherAvail} Left</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.dottedContainer}>
          {Platform.OS === 'ios' ? (
            <DottedLineIos color={color.Dark[10]} />
          ) : (
            <DottedLineAndroid color={color.Dark[10]} />
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.pointsText}>{`${points} Credit Bonus`}</Text>
          <Button
            label={
              redeemable ? 'Redeem' : completed ? 'Redeemed' : 'Need More Pts'
            }
            containerStyles={redeemable ? styles.btnClaim : styles.btnBorder}
            textStyles={redeemable ? styles.textButton : styles.footerText}
            disabled={redeemable ? false : true}
            onPress={onPress}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherReward;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1A2435',
    borderRadius: 8,
    paddingHorizontal: widthResponsive(16),
    paddingTop: widthResponsive(16),
    paddingBottom: widthResponsive(11),
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    color: color.Pink[200],
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(11),
  },
  eventContainer: {
    // Style for the event name container
  },
  voucherTitleText: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(14),
    lineHeight: widthResponsive(22),
    maxWidth: '80%',
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
    paddingHorizontal: widthResponsive(16),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  voucherLeftContainer: {
    backgroundColor: color.Dark[800],
    borderRadius: 4,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: widthResponsive(2),
  },
  voucherLeft: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    textAlign: 'right',
    color: color.Pink[200],
  },
  wrapperCoin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(14),
    fontWeight: '600',
    marginLeft: widthResponsive(4),
  },
  btnClaim: {
    aspectRatio: undefined,
    width: undefined,
    backgroundColor: color.Pink[200],
    paddingVertical: widthResponsive(4),
    paddingHorizontal: widthResponsive(8),
  },
  btnBorder: {
    aspectRatio: undefined,
    width: undefined,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: widthResponsive(4),
    // paddingHorizontal: widthResponsive(8),
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});
