import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Button, Gap} from '../../atom';
import {CopyIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface ReferralProps {}

export const ReferAFriend: React.FC<ReferralProps> = ({}) => {
  const {t} = useTranslation();
  const onPressSave = () => {};

  return (
    <View style={styles.root}>
      <ReferralImage
        width={widthPercentage(220)}
        height={widthPercentage(220)}
        style={{marginTop: heightPercentage(40), alignSelf: 'center'}}
      />
      <Text style={[typography.Heading6, styles.text]}>
        {t('Setting.Referral.ReferFriend.Text1')}
      </Text>

      <Text style={[typography.Overline, styles.useUsername]}>
        {t('Setting.Referral.ReferFriend.Text2')}
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
          label={t('Setting.Referral.ReferFriend.Btn1')}
          onPress={onPressSave}
          containerStyles={styles.button}
        />
        <Button
          type="border"
          label={t('Setting.Referral.ReferFriend.Btn2')}
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
