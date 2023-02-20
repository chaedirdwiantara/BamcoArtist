import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {ErrorIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface OTPErrorMsg {
  containerStyle?: object;
  otpSuccess?: boolean;
  valMessage?: string;
}

const RenderMessage: FC<OTPErrorMsg> = (props: OTPErrorMsg) => {
  const {t} = useTranslation();
  const {otpSuccess, valMessage, containerStyle} = props;
  return (
    <View style={[styles.messageContainer, containerStyle]}>
      <View style={styles.messageIcon}>
        {otpSuccess ? null : (
          <ErrorIcon width={16} height={16} fill={color.Error[400]} />
        )}
      </View>
      <Text
        style={[
          styles.textMessage,
          {
            color: otpSuccess ? color.Success[500] : color.Error[400],
          },
        ]}>
        {valMessage
          ? valMessage
          : otpSuccess
          ? t('OTP.Accepted')
          : t('OTP.Rejected')}
      </Text>
    </View>
  );
};

export default RenderMessage;

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: mvs(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  messageIcon: {
    alignSelf: 'center',
    marginRight: ms(4),
  },
  textMessage: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
  },
});
