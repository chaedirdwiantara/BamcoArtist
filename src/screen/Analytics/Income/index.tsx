import {StyleSheet, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {DollarSign, PosCreditCard} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {Gap} from '../../../components';
import Color from '../../../theme/Color';
import TopCard from './TopCard';

const Income = () => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TopCard
          icon={<DollarSign />}
          bgIcon={Color.Success[400]}
          value="27.5K"
          text="Tip earned"
        />
        <Gap width={widthResponsive(10)} />
        <TopCard
          icon={<PosCreditCard />}
          bgIcon={Color.Pink.linear}
          value="5000"
          text="Subs earned"
        />
      </View>

      <View style={styles.container}></View>
    </>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(24),
    color: color.Neutral[10],
  },
  subtitle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(11),
    color: color.Neutral[10],
    marginLeft: widthResponsive(40),
  },
});
