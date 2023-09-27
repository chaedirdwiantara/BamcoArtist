import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {CoinDIcon} from '../../../assets/icon';
import {kFormatter3, width, widthPercentage} from '../../../utils';

interface CardTotalCreditProps {
  creditCount: number;
  containerStyles?: ViewStyle;
}

export const CardTotalCredit: React.FC<CardTotalCreditProps> = ({
  creditCount,
  containerStyles,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.containerCoin, containerStyles]}>
      <Text style={styles.textMyCredit}>{t('TopUp.MyCoin')}</Text>
      <View style={{flexDirection: 'row'}}>
        <CoinDIcon
          style={{
            width: widthPercentage(18),
            height: mvs(18),
          }}
        />
        <Gap width={widthPercentage(5)} />
        <Text style={styles.amountMyCredit}>{kFormatter3(creditCount)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCoin: {
    width: width * 0.9,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: mvs(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(13),
    marginVertical: mvs(20),
    backgroundColor: color.Dark[600],
  },
  textMyCredit: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Neutral[10],
  },
  amountMyCredit: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(14),
    color: color.Neutral[10],
  },
});
