import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {SignInGuestContent, SsuStatusBar} from '../components';

export const SignInGuestScreen: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToScreen = (screenName: 'Login' | 'Signup' | 'MainTab') => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <SignInGuestContent onPress={screenName => goToScreen(screenName)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
