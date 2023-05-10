import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import {Button} from '../Button/Button';
import {ArrowRightIcon, DiscountIcon} from '../../../assets/icon';
import Gap from '../Gap/Gap';
import Typography from '../../../theme/Typography';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

interface BottomPriceProps {
  onPressPromo?: () => void;
  onPressCheckout: () => void;
  summary?: boolean;
  promo?: any;
}

const BottomPrice: React.FC<BottomPriceProps> = props => {
  const {t} = useTranslation();
  const {onPressPromo, onPressCheckout, summary, promo} = props;
  return (
    <View style={styles.bottomContainer}>
      {summary ? (
        <View style={styles.summaryContainer}>
          <Text
            style={[
              Typography.Subtitle1,
              {color: Color.Neutral[10], marginBottom: 6},
            ]}>
            Summary
          </Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Subtotal ( 2 Products )</Text>
            <Text style={styles.summaryItemText}>5,500 Credits</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>
              Shipping Fee ( 2 Products )
            </Text>
            <Text style={styles.summaryItemText}>800 Credits</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Promo code</Text>
            <Text style={styles.summaryItemText}>1,000 Credits</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Tax</Text>
            <Text style={styles.summaryItemText}>2%</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.rowCenter, styles.promo]}
          onPress={onPressPromo}>
          <View style={[styles.rowCenter]}>
            <DiscountIcon
              height={heightPercentage(20)}
              width={widthPercentage(20)}
            />
            <Gap width={widthPercentage(5)} />
            <Text
              numberOfLines={1}
              style={[Typography.Subtitle2, {color: Color.Neutral[10]}]}>
              {promo ? promo.title : 'Use Promo Code'}
            </Text>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>
      )}

      <View style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
        <View>
          <Text
            style={[
              Typography.Body4,
              {color: Color.Neutral[10], marginBottom: 6},
            ]}>
            Total Price
          </Text>
          <View style={[styles.rowCenter]}>
            <Text
              style={[
                Typography.Heading6,
                {color: Color.Success[400], maxWidth: widthPercentage(110)},
              ]}
              numberOfLines={1}>
              4,500
            </Text>
            <Gap width={widthPercentage(5)} />
            <Text style={[Typography.Heading6, {color: Color.Success[400]}]}>
              Credits
            </Text>
          </View>
        </View>
        <Button
          onPress={onPressCheckout}
          label={t('Cart.Checkout')}
          containerStyles={styles.button}
        />
      </View>
    </View>
  );
};

export default BottomPrice;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    backgroundColor: Color.Dark[700],
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(24),
  },
  button: {
    width: width * 0.35,
    aspectRatio: heightPercentage(120 / 40),
  },
  promo: {
    justifyContent: 'space-between',
    marginBottom: heightPercentage(16),
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  summaryContainer: {
    marginBottom: heightPercentage(18),
    paddingBottom: heightPercentage(10),
    borderBottomWidth: 1,
    borderBottomColor: Color.Dark[500],
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentage(4),
  },
  summaryItemText: {
    color: Color.Neutral[30],
    fontSize: mvs(13),
  },
});
