import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Button, Gap} from '../../atom';
import {CopyIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ReferralProps {}

export const ReferAFriend: React.FC<ReferralProps> = ({}) => {
  const onPressSave = () => {};

  return (
    <View style={styles.root}>
      <ReferralImage
        width={widthPercentage(220)}
        height={widthPercentage(220)}
        style={{marginTop: heightPercentage(40), alignSelf: 'center'}}
      />
      <Text style={[typography.Heading6, styles.text]}>
        {'Refer & Earn 5% Commission for every transaction'}
      </Text>

      <Text style={[typography.Overline, styles.useUsername]}>
        {'Use your @username as referral code'}
      </Text>
      <View style={styles.containerUsername}>
        <Text style={[typography.Heading4, {color: color.Neutral[10]}]}>
          {'taylor88'}
        </Text>
        <Gap width={widthPercentage(5)} />
        <CopyIcon />
      </View>

      <View style={{alignSelf: 'center'}}>
        <Button
          label="Refer a friends using link"
          onPress={onPressSave}
          containerStyles={styles.button}
        />
        <Button
          type="border"
          label="Read Terms and Conditions"
          borderColor="transparent"
          textStyles={{color: color.Pink.linear}}
          containerStyles={{width: width * 0.9}}
          onPress={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  text: {
    maxWidth: width * 0.95,
    color: color.Neutral[10],
  },
  containerUsername: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  useUsername: {
    color: color.Neutral[10],
    marginTop: heightPercentage(20),
    marginBottom: heightPercentage(5),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(30),
    alignSelf: 'center',
    backgroundColor: color.Pink[200],
  },
});
