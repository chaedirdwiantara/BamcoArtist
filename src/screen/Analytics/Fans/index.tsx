import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {BlitzIcon} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {Gap} from '../../../components';
import GrowthCard from './growthCard';

const Fans = () => {
  interface DataChart {
    value: number;
    hideDataPoint: boolean;
    label?: string;
  }
  interface Chart {
    maxValue: number;
    beFan: string;
    beFanCompare: string;
    beFanProgress: 'improve' | 'regression' | 'same';
    fansEarn: string;
    fansEarnCompare: string;
    fansEarnProgress: 'improve' | 'regression' | 'same';
    data: DataChart[];
  }

  const fansData: Chart = {
    maxValue: 100,
    beFan: '75%',
    beFanCompare: '4%',
    beFanProgress: 'improve',
    fansEarn: '25%',
    fansEarnCompare: '2%',
    fansEarnProgress: 'regression',
    data: [
      {
        value: 10,
        hideDataPoint: true,
        label: 'Jan',
      },
      {
        value: 23,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 75,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 65,
        hideDataPoint: true,
        label: '',
      },
      {
        value: 40,
        hideDataPoint: true,
        label: 'Feb',
      },
      {
        value: 96,
        hideDataPoint: true,
        label: '',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlitzIcon />
        <Gap width={widthResponsive(10)} />
        <Text style={styles.title}>Fans Growth</Text>
      </View>
      <View style={styles.cardContainer}>
        <GrowthCard
          number={fansData.beFan}
          desc={'Followers become a fans!'}
          numberDiffs={fansData.beFanCompare}
          progress={fansData.beFanProgress}
        />
        <GrowthCard
          number={fansData.fansEarn}
          desc={'Fans earned weekly'}
          numberDiffs={fansData.fansEarnCompare}
          progress={fansData.fansEarnProgress}
        />
      </View>
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
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
});
