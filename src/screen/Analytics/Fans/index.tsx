import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {BlitzIcon} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {Gap} from '../../../components';
import GrowthCard from './growthCard';

const Fans = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlitzIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>Fans Growth</Text>
      </View>
      <GrowthCard
        number={'80%'}
        desc={'Followers become a fans!'}
        numberDiffs={'5%'}
      />
    </View>
  );
};

export default Fans;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
});
