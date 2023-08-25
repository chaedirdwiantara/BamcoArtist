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
  const {title, selectedViolation} = route.params;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.root}>
      <SendAppealContent
        selectedViolation={selectedViolation}
        title={title}
        onPressGoBack={onPressGoBack}
        goToSetting={goToSetting}
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
