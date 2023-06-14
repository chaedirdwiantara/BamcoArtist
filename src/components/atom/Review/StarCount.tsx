import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StarIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {heightPercentage, widthPercentage} from '../../../utils';
import Typography from '../../../theme/Typography';
import Gap from '../Gap/Gap';

const totalPersentase = ({total, part}: {total: number; part: number}) => {
  return (part / total) * 100;
};

const TotalStar = ({
  total,
  part,
  star,
}: {
  total: number;
  part: number;
  star: number;
}) => {
  return (
    <View style={styles.container}>
      <StarIcon width={widthPercentage(12)} height={heightPercentage(12)} />
      <Gap width={widthPercentage(6)} />
      <Text style={styles.text}>{star}</Text>
      <Gap width={widthPercentage(6)} />
      <View style={styles.progress}>
        <View
          style={[
            styles.progressInner,
            {
              width: `${totalPersentase({total, part})}%`,
            },
          ]}></View>
      </View>
      <Gap width={widthPercentage(6)} />
      <Text style={[styles.text, styles.textRight]}>{part}</Text>
    </View>
  );
};

const StarCount = () => {
  return (
    <View>
      <TotalStar total={1200} part={1150} star={5} />
      <TotalStar total={1200} part={48} star={4} />
      <TotalStar total={1200} part={2} star={3} />
      <TotalStar total={1200} part={0} star={2} />
      <TotalStar total={1200} part={0} star={1} />
    </View>
  );
};

export default StarCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: heightPercentage(10),
  },
  progressInner: {
    height: heightPercentage(4),
    backgroundColor: '#FABE2C',
  },
  progress: {
    flex: 1,
    backgroundColor: Color.Dark[300],
    height: heightPercentage(4),
    borderRadius: 1,
    position: 'relative',
  },
  text: {
    ...Typography.Subtitle2,
    color: Color.Neutral[10],
  },
  textRight: {
    minWidth: widthPercentage(40),
  },
});
