import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import {BoxStore, CheckCircleIcon, TruckIcon} from '../../../assets/icon';
import BagTick from '../../../assets/icon/BagTick.icon';
import Gap from '../Gap/Gap';
import Typography from '../../../theme/Typography';

interface TrackStatusProps {
  status: number;
}

const TrackStatus: React.FC<TrackStatusProps> = props => {
  const {status} = props;
  if (status === 2) {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <TruckIcon
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
          <BoxStore
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
          <BagTick
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
        </View>
        <Gap height={heightPercentage(20)} />
        <View style={styles.container}>
          <CheckCircleIcon
            width={widthPercentage(25)}
            height={heightPercentage(25)}
            bg1={Color.Success[400]}
            bg2={Color.Success[400]}
          />
          <View style={[styles.line, {backgroundColor: Color.Success[400]}]} />
          <CheckCircleIcon
            width={widthPercentage(25)}
            height={heightPercentage(25)}
            bg1={Color.Success[400]}
            bg2={Color.Success[400]}
          />
          <View style={styles.line} />
          <View style={styles.circle} />
        </View>
        <Gap height={heightPercentage(24)} />
        <Text style={styles.status}>To Ship</Text>
      </View>
    );
  }
  if (status === 3) {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <TruckIcon
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
          <BoxStore
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
          <BagTick
            width={widthPercentage(30)}
            height={heightPercentage(30)}
            stroke={Color.Neutral[10]}
          />
        </View>
        <Gap height={heightPercentage(20)} />
        <View style={styles.container}>
          <CheckCircleIcon
            width={widthPercentage(25)}
            height={heightPercentage(25)}
            bg1={Color.Success[400]}
            bg2={Color.Success[400]}
          />
          <View style={[styles.line, {backgroundColor: Color.Success[400]}]} />
          <CheckCircleIcon
            width={widthPercentage(25)}
            height={heightPercentage(25)}
            bg1={Color.Success[400]}
            bg2={Color.Success[400]}
          />
          <View style={styles.line} />
          <CheckCircleIcon
            width={widthPercentage(25)}
            height={heightPercentage(25)}
            bg1={Color.Success[400]}
            bg2={Color.Success[400]}
          />
        </View>
        <Gap height={heightPercentage(24)} />
        <Text style={styles.status}>To Ship</Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TruckIcon
          width={widthPercentage(30)}
          height={heightPercentage(30)}
          stroke={Color.Neutral[10]}
        />
        <BoxStore
          width={widthPercentage(30)}
          height={heightPercentage(30)}
          stroke={Color.Neutral[10]}
        />
        <BagTick
          width={widthPercentage(30)}
          height={heightPercentage(30)}
          stroke={Color.Neutral[10]}
        />
      </View>
      <Gap height={heightPercentage(20)} />
      <View style={styles.container}>
        <CheckCircleIcon
          width={widthPercentage(25)}
          height={heightPercentage(25)}
          bg1={Color.Success[400]}
          bg2={Color.Success[400]}
        />
        <View style={[styles.line, {backgroundColor: Color.Success[400]}]} />
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.circle} />
      </View>
      <Gap height={heightPercentage(24)} />
      <Text style={styles.status}>To Ship</Text>
    </View>
  );
};

export default TrackStatus;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(30),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    height: heightPercentage(25),
    width: widthPercentage(25),
    borderWidth: 1.5,
    borderRadius: width,
    borderColor: Color.Dark[50],
  },
  line: {
    flex: 1,
    backgroundColor: Color.Dark[50],
    height: 1.5,
  },
  status: {
    ...Typography.Subtitle3,
    color: Color.Neutral[10],
    textAlign: 'center',
  },
});
