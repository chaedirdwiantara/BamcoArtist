import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Button, Gap, SsuToast} from '../../atom';
import {CopyIcon, TickCircleIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';

interface ReferralProps {
  username: string;
  handleWebview: (title: string, url: string) => void;
}

export const ReferAFriend: React.FC<ReferralProps> = ({
  username,
  handleWebview,
}) => {
  const {t} = useTranslation();
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(username || '');
    setToastVisible(true);
  };

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

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
      <TouchableOpacity
        style={styles.containerUsername}
        onPress={copyToClipboard}>
        <Text style={[typography.Heading4, {color: color.Neutral[10]}]}>
          {username}
        </Text>
        <Gap width={widthPercentage(5)} />
        <CopyIcon />
      </TouchableOpacity>

      <View style={{alignSelf: 'center'}}>
        <Button
          label={t('Setting.Referral.ReferFriend.Btn1')}
          onPress={copyToClipboard}
          containerStyles={styles.button}
        />
        <Button
          type="border"
          label={t('Setting.Referral.ReferFriend.Btn2')}
          borderColor="transparent"
          textStyles={{color: color.Success[400]}}
          containerStyles={{width: width * 0.9}}
          onPress={() =>
            handleWebview(
              'Terms Conditions',
              'https://www.thebeam.co/termsandcondition',
            )
          }
        />
      </View>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {t('General.LinkCopied')}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
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
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
