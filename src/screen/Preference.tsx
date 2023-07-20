import React, {useEffect} from 'react';
import {View, StyleSheet, NativeModules, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {heightResponsive} from '../utils';
import {RootStackParams} from '../navigations';
import {storage} from '../hooks/use-storage.hook';
import {ImageSlider, SsuStatusBar} from '../components';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useSettingHook} from '../hooks/use-setting.hook';
import {UpdateProfilePropsType} from '../api/profile.api';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

export const PreferenceScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoadingStep,
    dataProfile,
    infoStep,
    getProfileUser,
    updateProfilePreference,
    setLastStepWizard,
    getLastStepWizard,
  } = useProfileHook();
  const {
    getListStepWizard,
    getListGenreSong,
    listStepWizard,
    listGenre,
    isLoading,
  } = useSettingHook();

  useEffect(() => {
    getListStepWizard();
    getProfileUser();
    getListGenreSong();
    getLastStepWizard();
  }, []);

  const goToHome = () => {
    storage.set('isPreference', false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Preference"
        data={listStepWizard}
        onPress={goToHome}
        onUpdateProfile={(props?: UpdateProfilePropsType) =>
          updateProfilePreference(props)
        }
        profile={dataProfile}
        isLoading={isLoading || isLoadingStep}
        setLastStepWizard={setLastStepWizard}
        genres={listGenre}
        infoStep={infoStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingTop:
      Platform.OS === 'ios'
        ? heightResponsive(barHeight + 10)
        : heightResponsive(barHeight + 20),
  },
});
