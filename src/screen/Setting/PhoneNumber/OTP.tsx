import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {OtpPhoneNumber} from '../../../components/molecule/SettingContent/OtpPhoneNumber';

type OtpPNProps = NativeStackScreenProps<RootStackParams, 'OtpPhoneNumber'>;

export const OtpPNScreen: React.FC<OtpPNProps> = ({
  navigation,
  route,
}: OtpPNProps) => {
  const {countryNumber, phoneNumber, type} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onSuccess = (msg: string) => {
    navigation.pop(1);
    navigation.replace('PhoneNumber', {
      info: true,
      message: msg,
    });
  };

  return (
    <View style={styles.root}>
      <OtpPhoneNumber
        countryNumber={countryNumber}
        phoneNumber={phoneNumber}
        onPressGoBack={onPressGoBack}
        type={type}
        onSuccess={onSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
