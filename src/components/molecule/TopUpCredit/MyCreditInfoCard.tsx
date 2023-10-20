import React from 'react';
import {mvs} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';
import {Gap} from '../../atom';
import {CoinDIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import {convertToHKD, toCurrency, width, widthPercentage} from '../../../utils';

interface TopUpCreditProps {
  creditCount: number;
  title1: string;
  title2: string;
}

export const MyCreditInfoCard: React.FC<TopUpCreditProps> = ({
  creditCount,
  title1,
  title2,
}) => {
  return (
    <View style={styles.containerCoin}>
      <View style={styles.containerCredit}>
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          {title1}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <CoinDIcon />
          <Gap width={widthPercentage(5)} />
          <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
            {toCurrency(creditCount, {withFraction: false})}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.containerCredit}>
        <Text style={[typography.Subtitle3, {color: color.Neutral[10]}]}>
          {title2}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              typography.Heading6,
              {color: color.Neutral[10], fontSize: mvs(13)},
            ]}>
            HKD
          </Text>
          <Gap width={widthPercentage(5)} />
          <Text
            style={[
              typography.Heading6,
              {color: color.Neutral[10], fontSize: mvs(13)},
            ]}>
            {convertToHKD(creditCount)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    borderWidth: mvs(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(15),
    marginVertical: mvs(22),
  },
  containerCredit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    borderWidth: mvs(1),
    borderColor: '#292F3C',
    marginVertical: mvs(10),
  },
});
