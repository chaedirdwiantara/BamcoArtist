import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {widthPercentage} from '../../utils';
import {RootStackParams} from '../../navigations';
import {SendReportContent} from '../../components';

type SendAppealProps = NativeStackScreenProps<RootStackParams, 'SendAppeal'>;
export const SendAppealScreen: React.FC<SendAppealProps> = ({
  navigation,
  route,
}: SendAppealProps) => {
  const {title} = route.params;
  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <SendReportContent title={title} onPressGoBack={onPressGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
});
