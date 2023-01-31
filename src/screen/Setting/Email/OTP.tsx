import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {OtpEmail} from '../../../components/molecule/SettingContent/OtpEmail';

type OtpEmailProps = NativeStackScreenProps<RootStackParams, 'OtpEmail'>;

export const OtpEmailScreen: React.FC<OtpEmailProps> = ({
  navigation,
  route,
}: OtpEmailProps) => {
  const {email, type} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onSuccess = (msg: string) => {
    navigation.pop(1);
    navigation.replace('Email', {
      info: true,
      message: msg,
    });
  };

  return (
    <View style={styles.root}>
      <OtpEmail
        email={email}
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
