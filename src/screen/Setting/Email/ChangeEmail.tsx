import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {ChangeEmailContent} from '../../../components/molecule/SettingContent/ChangeEmailContent';
import {OtpEmailScreen} from '../../../interface/setting.interface';

type ChangeEmailProps = NativeStackScreenProps<RootStackParams, 'ChangeEmail'>;

export const ChangeEmailScreen: React.FC<ChangeEmailProps> = ({
  navigation,
  route,
}: ChangeEmailProps) => {
  const {type, oldEmail} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onSuccess = (data: OtpEmailScreen) => {
    navigation.replace('OtpEmail', {
      email: data.email,
      type: data.type,
    });
  };

  return (
    <View style={styles.root}>
      <ChangeEmailContent
        oldEmail={oldEmail}
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
