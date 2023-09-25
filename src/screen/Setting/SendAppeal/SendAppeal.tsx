import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {SendAppealContent} from '../../../components';

type SendAppealProps = NativeStackScreenProps<RootStackParams, 'SendAppeal'>;
export const SendAppealScreen: React.FC<SendAppealProps> = ({
  navigation,
  route,
}: SendAppealProps) => {
  const {selectedViolation, type} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  return (
    <View style={styles.root}>
      <SendAppealContent
        type={type}
        selectedViolation={selectedViolation}
        onPressGoBack={onPressGoBack}
        goToHome={goToHome}
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
