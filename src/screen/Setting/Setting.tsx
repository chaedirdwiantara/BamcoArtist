import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {SettingContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';

export const SettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataShippingInfo, getShippingInfo} = useSettingHook();

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getShippingInfo();
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressGoTo = (screenName: any, params: any) => {
    if (screenName === 'Account') {
      navigation.navigate(screenName, {data: dataProfile});
    } else if (screenName === 'ShippingInformation') {
      navigation.navigate(screenName, {data: dataShippingInfo});
    } else {
      navigation.navigate(screenName, {...params});
    }
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  return (
    <View style={styles.root}>
      <SettingContent
        onPressGoBack={onPressGoBack}
        onPressGoTo={onPressGoTo}
        handleWebview={handleWebview}
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
