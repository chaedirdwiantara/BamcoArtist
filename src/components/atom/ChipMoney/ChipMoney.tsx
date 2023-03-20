import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import CoinIcon from '../../../assets/icon/Coin.icon';
import {kFormatter, normalize} from '../../../utils';

interface ChipMoneyProps {
  balance: number;
}

export const ChipMoney: React.FC<ChipMoneyProps> = (props: ChipMoneyProps) => {
  const {balance} = props;

  return (
    <View style={[styles.root]}>
      <CoinIcon />
      <Text style={styles.text}>{kFormatter(balance)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Success[400],
    borderRadius: 4,
    paddingHorizontal: ms(10),
    paddingVertical: mvs(5),
  },
  text: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Font.InterSemiBold,
    paddingLeft: ms(6),
  },
});
