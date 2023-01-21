import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {ChangePNContent} from '../../../components/molecule/SettingContent/ChangePNContent';
import {OtpPhoneScreen} from '../../../interface/setting.interface';

type ChangePNProps = NativeStackScreenProps<
  RootStackParams,
  'ChangePhoneNumber'
>;

export const ChangePNScreen: React.FC<ChangePNProps> = ({
  navigation,
  route,
}: ChangePNProps) => {
  const {type, oldPhone} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onSuccess = (data: OtpPhoneScreen) => {
    navigation.replace('OtpPhoneNumber', {
      countryNumber: data.countryNumber ?? '',
      phoneNumber: data.phoneNumber,
      type: data.type,
    });
  };

  return (
    <View style={styles.root}>
      <ChangePNContent
        oldPhone={oldPhone}
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
