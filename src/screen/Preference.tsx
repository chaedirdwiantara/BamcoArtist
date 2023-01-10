import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {dataFavourites} from '../data/preference';
import {ImageSlider, SsuStatusBar} from '../components';
import {useProfileHook} from '../hooks/use-profile.hook';
import {UpdateProfilePropsType} from '../api/profile.api';

export const PreferenceScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {updateProfilePreference} = useProfileHook();

  const goToScreenReferral = () => {
    navigation.navigate('Referral');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Preference"
        data={dataFavourites}
        onPress={goToScreenReferral}
        onUpdatePreference={(props?: UpdateProfilePropsType) =>
          updateProfilePreference(props)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
