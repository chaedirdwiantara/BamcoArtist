import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {Button, SsuInput} from '../../atom';
import {GiftIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ReferralProps {}

export const UseReferralContent: React.FC<ReferralProps> = ({}) => {
  const [refCode, setRefCode] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onPressSave = () => {};

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <ReferralImage
          width={widthPercentage(220)}
          height={widthPercentage(220)}
          style={{marginTop: heightPercentage(40)}}
        />
        <Text style={[typography.Heading5, styles.text]}>
          {'Get 5% Sunny Side Up Credits every transaction'}
        </Text>

        <SsuInput.InputText
          value={refCode}
          isError={error}
          placeholder={'Referral Code'}
          errorMsg={'Referral code invalid'}
          leftIcon={<GiftIcon />}
          fontColor={color.Neutral[10]}
          borderColor={color.Pink.linear}
          onChangeText={(newText: string) => setRefCode(newText)}
          containerStyles={{width: '90%', marginTop: heightPercentage(20)}}
        />
      </View>

      <Button
        label="Submit"
        onPress={onPressSave}
        containerStyles={styles.button}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    paddingHorizontal: widthPercentage(12),
  },
  text: {
    maxWidth: width * 0.9,
    color: color.Neutral[10],
    textAlign: 'center',
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(30),
    alignSelf: 'center',
    backgroundColor: color.Pink[200],
  },
});
