import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import Color from '../../../theme/Color';
import {CheckCircleIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

interface DetailStatusTrackProps {
  status: number;
}

const DetailStatusTrack: React.FC<DetailStatusTrackProps> = props => {
  const {status} = props;
  if (status === 2) {
    return (
      <ScrollView style={styles.root}>
        <Text style={styles.title}>Payment Status</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.circle} />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Courier - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your order is being delivered
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Seller - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your order have been processed by seller
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Bookyay - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              {/* <View style={styles.line} /> */}
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your payment have been verified. Your order will be forwarded to
              seller
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (status === 3) {
    return (
      <ScrollView style={styles.root}>
        <Text style={styles.title}>Payment Status</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Finish Order - 22 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Confirm order finished
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Shiping Destination - 21 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your order Arrived at destination
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Courier - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your order is being delivered
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Seller - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your order have been processed by seller
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <CheckCircleIcon
              width={widthPercentage(20)}
              height={heightPercentage(20)}
              bg1={Color.Pink.linear}
              bg2={Color.Pink.linear}
            />
            <Text style={[styles.text, {color: Color.Success[400]}]}>
              Bookyay - 20 Feb 2023, 02:15
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.lineContainer}>
              {/* <View style={styles.line} /> */}
            </View>
            <Text style={[styles.text, styles.desc]}>
              Your payment have been verified. Your order will be forwarded to
              seller
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>Payment Status</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.circle} />
          <Text style={[styles.text, {color: Color.Success[400]}]}>
            Seller - 20 Feb 2023, 02:15
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          <Text style={[styles.text, styles.desc]}>
            Your order have been processed by seller
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <CheckCircleIcon
            width={widthPercentage(20)}
            height={heightPercentage(20)}
            bg1={Color.Pink.linear}
            bg2={Color.Pink.linear}
          />
          <Text style={[styles.text, {color: Color.Success[400]}]}>
            Bookyay - 20 Feb 2023, 02:15
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.lineContainer}>
            {/* <View style={styles.line} /> */}
          </View>
          <Text style={[styles.text, styles.desc]}>
            Your payment have been verified. Your order will be forwarded to
            seller
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailStatusTrack;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(30),
  },
  row: {flexDirection: 'row'},
  container: {
    flex: 1,
  },
  circle: {
    height: heightPercentage(20),
    width: widthPercentage(20),
    borderWidth: 1.5,
    borderRadius: width,
    borderColor: Color.Pink.linear,
  },
  lineContainer: {
    width: widthPercentage(20),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    backgroundColor: Color.Pink.linear,
    width: 1.5,
    height: 'auto',
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(15),
    color: Color.Neutral[10],
    paddingBottom: heightPercentage(16),
  },
  desc: {
    paddingTop: heightPercentage(4),
    paddingBottom: heightPercentage(16),
  },
  text: {
    ...Typography.Subtitle3,
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(12),
    flex: 1,
  },
});
