import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {widthPercentage} from '../../utils';
import PreferenceContent from '../../components/molecule/SettingContent/PreferenceContent';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';

export const PreferenceSettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {getListPreference, listGenre, listMood, isLoading} = useSettingHook();
  const {dataProfile, getProfileUser} = useProfileHook();

  useEffect(() => {
    getProfileUser();
    getListPreference();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <PreferenceContent
        onPressGoBack={onPressGoBack}
        moods={listMood}
        genres={listGenre}
        profile={dataProfile}
      />
      <ModalLoading visible={isLoading || !dataProfile} />
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
