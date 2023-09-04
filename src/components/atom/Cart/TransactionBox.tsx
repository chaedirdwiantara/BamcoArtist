import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import Gap from '../Gap/Gap';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {ArrowRightIcon, CalendarIcon} from '../../../assets/icon';
import Font from '../../../theme/Font';
import {mvs} from 'react-native-size-matters';

interface TransactionBoxProps {
  children: ReactNode;
  transaction?: string;
  date?: string;
  onPressDetail?: () => void;
  category?: string;
  isEmpty?: boolean;
  totalItem?: number;
  totalPrice?: number;
  orderNo: string;
  handlingFee: number;
  deliveryFee: number;
  discount: number;
  currencyCode: string;
}

const TransactionBox: React.FC<TransactionBoxProps> = props => {
  const {
    children,
    transaction,
    date,
    onPressDetail,
    isEmpty = false,
    totalItem,
    totalPrice,
    orderNo,
    handlingFee,
    deliveryFee,
    discount,
    currencyCode,
  } = props;

  return (
    <View style={[styles.root, {opacity: isEmpty ? 0.5 : 1}]}>
      <View
        style={[
          styles.rowCenter,
          {
            marginBottom: 10,
          },
        ]}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={onPressDetail}
            style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
            <View style={[styles.rowCenter]}>
              <View>
                <Text
                  style={[
                    Typography.Subtitle3,
                    {color: Color.Neutral[10], fontSize: normalize(12)},
                  ]}
                  numberOfLines={1}>
                  Order No :
                </Text>
                <Gap width={widthPercentage(4)} />
                <Text
                  style={[
                    Typography.Subtitle3,
                    {color: Color.Neutral[10], fontSize: normalize(12)},
                  ]}
                  numberOfLines={1}>
                  {orderNo}
                </Text>
              </View>

              <Gap width={widthPercentage(16)} />
              <ArrowRightIcon stroke={Color.Success[400]} />
            </View>
            <Text
              style={[
                Typography.Subtitle3,
                {color: Color.Neutral[10], fontSize: normalize(12)},
              ]}>
              {transaction}
            </Text>
          </TouchableOpacity>
          <View style={[styles.rowCenter, styles.arrival]}>
            <CalendarIcon stroke={Color.Neutral[10]} />

            <Gap width={widthPercentage(8)} />
            <Text
              style={[
                Typography.Caption,
                {color: Color.Dark[50], fontSize: normalize(12), flex: 1},
              ]}>
              {date}
            </Text>
          </View>
        </View>
      </View>

      {children}

      <View
        style={{
          flex: 1,
          marginBottom: heightResponsive(24),
          marginTop: heightResponsive(10),
        }}>
        <View style={styles.bottomPrice}>
          <Text style={[Typography.Caption, {color: Color.Neutral[10]}]}>
            Item total
          </Text>
          <Text style={[Typography.Caption, {color: Color.Pink.linear}]}>
            {currencyCode} {toCurrency(totalItem, {withFraction: false})}
          </Text>
        </View>
        {discount > 0 && (
          <>
            <View style={styles.bottomPrice}>
              <Text style={[Typography.Caption, {color: Color.Neutral[10]}]}>
                Handling fee
              </Text>
              <Text style={[Typography.Caption, {color: Color.Pink.linear}]}>
                - {currencyCode} {toCurrency(discount, {withFraction: false})}
              </Text>
            </View>
            <Gap height={heightPercentage(4)} />
          </>
        )}
        <Gap height={heightPercentage(4)} />
        <View style={styles.bottomPrice}>
          <Text style={[Typography.Caption, {color: Color.Neutral[10]}]}>
            Handling fee
          </Text>
          <Text style={[Typography.Caption, {color: Color.Pink.linear}]}>
            {currencyCode} {toCurrency(handlingFee, {withFraction: false})}
          </Text>
        </View>
        <Gap height={heightPercentage(4)} />
        {deliveryFee > 0 && (
          <>
            <View style={styles.bottomPrice}>
              <Text style={[Typography.Caption, {color: Color.Neutral[10]}]}>
                Handling fee
              </Text>
              <Text style={[Typography.Caption, {color: Color.Pink.linear}]}>
                {currencyCode} {toCurrency(deliveryFee, {withFraction: false})}
              </Text>
            </View>
            <Gap height={heightPercentage(4)} />
          </>
        )}
        <View style={styles.bottomPrice}>
          <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
            Total
          </Text>
          <Text style={[Typography.Subtitle3, {color: Color.Pink.linear}]}>
            {currencyCode} {toCurrency(totalPrice, {withFraction: false})}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionBox;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentage(24),
    paddingTop: heightPercentage(16),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  box: {
    justifyContent: 'space-between',
    marginBottom: heightPercentage(16),
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Color.Dark[500],
    paddingTop: heightPercentage(6),
    marginTop: heightPercentage(6),
  },
  arrival: {
    paddingVertical: heightPercentage(8),
    marginTop: heightPercentage(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.Dark[500],
  },
  concertDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentage(4),
  },
  badgeWrapper: {
    backgroundColor: Color.Pink.linear,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: heightResponsive(1),
    borderRadius: widthResponsive(4),
    marginRight: widthResponsive(6),
  },
  badgeText: {
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
    fontSize: mvs(8),
  },
  bottomPrice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
