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
} from '../../../utils';
import CheckBox from '../CheckBox';
import Gap from '../Gap/Gap';

interface CartItemProps {
  editable?: boolean;
}

const CartItem: React.FC<CartItemProps> = props => {
  const {editable = true} = props;
  return (
    <View
      style={[
        styles.row,
        styles.alignCenter,
        {paddingBottom: heightPercentage(16)},
      ]}>
      {editable && (
        <>
          <CheckBox handleOnPress={() => null} active={false} />
          <Gap width={widthPercentage(10)} />
        </>
      )}

      <View style={[styles.row]}>
        <FastImage
          source={{uri: 'https://picsum.photos/200'}}
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
            Blackpink In Your Area 2023 Anniversary World Tour Jacket
          </Text>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              {justifyContent: 'space-between'},
            ]}>
            <Text
              style={[
                Typography.Subtitle3,
                {color: Color.Pink.linear, fontSize: normalize(12)},
              ]}
              numberOfLines={1}>
              2,750 Credits
            </Text>
            {editable ? (
              <View style={[styles.row, styles.alignCenter]}>
                <TouchableOpacity>
                  <TrashIcon />
                </TouchableOpacity>
                <Gap width={widthResponsive(4)} />
                <TouchableOpacity>
                  <MinusIcon fill={Color.Dark[50]} style={{paddingTop: 4}} />
                </TouchableOpacity>
                <Text style={[Typography.Subtitle3, styles.qty]}>1</Text>
                <TouchableOpacity>
                  <AddIcon stroke={Color.Neutral[10]} />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                1 Product
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
