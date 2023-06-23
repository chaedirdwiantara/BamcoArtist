import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {StarIcon, CoinIcon} from '../../../assets/icon';
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
import Font from '../../../theme/Font';
import {mvs} from 'react-native-size-matters';

interface AddonItemProps {
  name: string;
  image: string;
  price?: number;
  rating?: string | number;
  ratingQty?: number;
  qty?: number;
  cart?: boolean;
  transaction?: boolean;
}

const AddonItem: React.FC<AddonItemProps> = props => {
  const {name, image, price, rating, ratingQty, qty, cart, transaction} = props;
  return (
    <View
      style={[
        styles.row,
        styles.alignCenter,
        {
          paddingBottom: heightPercentage(16),
          paddingLeft: cart ? widthPercentage(34) : 0,
        },
      ]}>
      <View style={[styles.row]}>
        <FastImage
          source={{uri: image}}
          style={[
            {
              width: widthResponsive(70),
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
          <View
            style={[
              styles.row,
              styles.alignCenter,
              {justifyContent: cart ? 'flex-start' : 'space-between'},
            ]}>
            {cart || transaction ? (
              <Text
                style={[Typography.Subtitle3, {color: Color.Pink.linear}]}
                numberOfLines={1}>
                Free
              </Text>
            ) : (
              <View style={[styles.rowCenter, {height: '100%'}]}>
                <View style={styles.rowCenter}>
                  <CoinIcon
                    height={widthPercentage(14)}
                    width={widthPercentage(14)}
                  />
                  <Gap width={widthPercentage(4)} />
                  <Text style={[styles.subtitle, {marginBottom: 0}]}>
                    {toCurrency(price, {withFraction: false})}
                  </Text>
                </View>

                <View style={styles.tabSpacer} />

                <View style={styles.rowCenter}>
                  <StarIcon
                    width={widthPercentage(14)}
                    height={heightPercentage(14)}
                  />
                  <Gap width={widthPercentage(4)} />
                  <Text style={[styles.subtitle, {marginBottom: 0}]}>
                    {rating}
                  </Text>
                  <Gap width={widthPercentage(4)} />
                  <Text
                    style={[
                      styles.subtitle,
                      {marginBottom: 0, fontFamily: 'Inter-Regular'},
                    ]}>
                    ({ratingQty})
                  </Text>
                </View>
              </View>
            )}

            {qty && (
              <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                {qty} Product
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddonItem;

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
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: mvs(10),
    marginBottom: 8,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Dark[300],
    marginHorizontal: widthPercentage(5),
    height: '100%',
  },
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
});
