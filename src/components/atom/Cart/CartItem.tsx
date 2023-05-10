import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {TrashIcon, MinusIcon, AddIcon} from '../../../assets/icon';
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
import CheckBox from '../CheckBox';
import Gap from '../Gap/Gap';

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  editable?: boolean;
  detail?: boolean;
  qty?: number;
  isChecked?: boolean;
  onChecked?: () => void;
}

const CartItem: React.FC<CartItemProps> = props => {
  const {
    name,
    image,
    price,
    editable = true,
    detail = false,
    qty,
    isChecked = false,
    onChecked = () => null,
  } = props;
  return (
    <View
      style={[
        styles.row,
        styles.alignCenter,
        {paddingBottom: heightPercentage(16)},
      ]}>
      {editable && (
        <>
          <CheckBox handleOnPress={onChecked} active={isChecked} />
          <Gap width={widthPercentage(10)} />
        </>
      )}

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
        <View
          style={[
            styles.text,
            {paddingRight: editable ? widthResponsive(24) : 0},
          ]}>
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
              {justifyContent: detail ? 'flex-start' : 'space-between'},
            ]}>
            {detail && (
              <Text
                style={[
                  Typography.Subtitle3,
                  {color: Color.Dark[50], marginRight: widthPercentage(4)},
                ]}>
                {qty}x
              </Text>
            )}
            <Text
              style={[Typography.Subtitle3, {color: Color.Pink.linear}]}
              numberOfLines={1}>
              {toCurrency(price, {withFraction: false})} Credits
            </Text>
            {detail ? null : editable ? (
              <View style={[styles.row, styles.alignCenter]}>
                <TouchableOpacity>
                  <TrashIcon />
                </TouchableOpacity>
                <Gap width={widthResponsive(4)} />
                <TouchableOpacity>
                  <MinusIcon fill={Color.Dark[50]} style={{paddingTop: 4}} />
                </TouchableOpacity>
                <Text style={[Typography.Subtitle3, styles.qty]}>{qty}</Text>
                <TouchableOpacity>
                  <AddIcon stroke={Color.Neutral[10]} />
                </TouchableOpacity>
              </View>
            ) : (
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

export default CartItem;

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
