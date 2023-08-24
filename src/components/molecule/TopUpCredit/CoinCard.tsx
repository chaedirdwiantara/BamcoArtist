import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {Gap} from '../../atom';
import {CoinIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import {
  getCoinFromProductId,
  heightPercentage,
  width,
  widthPercentage,
} from '../../../utils';

export interface CoinCardProps {
  price: string;
  productId: string;
  initialCoin?: string;
  bonusCoin?: string;
  showIconCoin?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

export const CoinCard: React.FC<CoinCardProps> = ({
  productId,
  price,
  initialCoin,
  bonusCoin,
  showIconCoin = true,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.root, containerStyle]} onPress={onPress}>
      <View style={styles.containerCoinIcon}>
        {showIconCoin && <CoinIcon />}
        <Gap width={widthPercentage(5)} />
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          {getCoinFromProductId({productId: productId})}
        </Text>
      </View>

      <View style={styles.containerBottomCoin}>
        <View>
          <Text style={[typography.Overline, {color: color.Dark[50]}]}>
            {initialCoin}
          </Text>
          <Text style={[typography.Overline, {color: color.Success[400]}]}>
            {bonusCoin}
          </Text>
        </View>
        <View>
          <Gap height={heightPercentage(10)} />
          <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.44,
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
    backgroundColor: color.Dark[600],
  },
  containerCoinIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottomCoin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentage(10),
  },
});
