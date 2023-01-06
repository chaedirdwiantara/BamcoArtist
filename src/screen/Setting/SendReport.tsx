import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {widthPercentage} from '../../utils';
import {SendReportContent} from '../../components';

interface SendReportProps {
  props: {};
  route: any;
}

export const SendReportScreen: React.FC<SendReportProps> = (
  props: SendReportProps,
) => {
  const {title} = props.route?.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
