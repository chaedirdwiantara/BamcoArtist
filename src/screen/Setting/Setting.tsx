import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {SettingContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {usePlayerStore} from '../../store/player.store';
import {useProfileHook} from '../../hooks/use-profile.hook';

export const SettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataProfile, getProfileUser} = useProfileHook();
  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, []),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const onPressGoTo = (screenName: any, params: any) => {
    if (screenName === 'Account') {
      navigation.navigate(screenName, {
        data: dataProfile?.data,
        fromScreen: 'setting',
      });
    } else if (screenName === 'ShippingInformation') {
      navigation.navigate('ListAddress', {from: ''});
    } else {
      navigation.navigate(screenName, {...params});
    }
  };

  return (
    <View style={styles.root}>
      <SettingContent onPressGoBack={onPressGoBack} onPressGoTo={onPressGoTo} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
