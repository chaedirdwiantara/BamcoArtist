import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {
  widthPercentage,
  widthResponsive,
  heightResponsive,
  normalize,
  heightPercentage,
  toCurrency,
} from '../../../utils';
import Gap from '../Gap/Gap';

interface TransactionItemProps {
  name: string;
  image: string;
  price: number;
  qty?: number;
  isEmpty?: boolean;
  type: 'merch' | 'ticket';
  total: number;
  currencyCode: string;
}

const TransactionItem: React.FC<TransactionItemProps> = props => {
  const {name, image, price, qty, type, total, currencyCode} = props;
  return (
    <View
      style={[
        styles.row,
        styles.alignCenter,
        {paddingBottom: heightPercentage(16)},
      ]}>
      <View style={[styles.row]}>
        <FastImage
          source={{uri: image}}
          style={[
            {
              width: widthResponsive(85),
              aspectRatio: 1 / 1,
            },
          ]}
        />
        <Gap width={widthPercentage(10)} />
        <View style={[styles.text, {paddingRight: 0}]}>
          <Text
            style={[
              Typography.Subtitle3,
              {color: Color.Neutral[10], fontSize: normalize(12)},
            ]}
            numberOfLines={2}>
            {name}
          </Text>
          <Text
            style={[
              Typography.Subtitle3,
              {
                color: Color.Neutral[10],
                fontSize: normalize(10),
                textTransform: 'capitalize',
              },
            ]}
            numberOfLines={2}>
            {type}
          </Text>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              {justifyContent: 'space-between'},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  Typography.Subtitle3,
                  {color: Color.Pink.linear, fontSize: normalize(10)},
                ]}
                numberOfLines={1}>
                {currencyCode} {toCurrency(price, {withFraction: false})}
              </Text>
              <Gap width={widthPercentage(2)} />
              <Text
                style={[
                  Typography.Subtitle3,
                  {color: Color.Neutral[10], fontSize: normalize(10)},
                ]}>
                x{qty}
              </Text>
            </View>
            <Text
              style={[
                Typography.Subtitle3,
                {color: Color.Pink.linear, fontSize: normalize(10)},
              ]}
              numberOfLines={1}>
              {currencyCode} {toCurrency(total, {withFraction: false})}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(16),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  qty: {
    color: Color.Neutral[10],
    fontSize: normalize(12),
    width: widthResponsive(20),
    textAlign: 'center',
  },
  text: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: heightResponsive(1),
  },
});
