import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {ImageSlider, SsuStatusBar} from '../components';
import {useProfileHook} from '../hooks/use-profile.hook';
import {UpdateProfilePropsType} from '../api/profile.api';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {useSettingHook} from '../hooks/use-setting.hook';

export const PreferenceScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {updateProfilePreference} = useProfileHook();
  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {getListPreference, listPreference, isLoading} = useSettingHook();

  useEffect(() => {
    getListDataMusician();
    getListPreference();
  }, []);

  const goToScreenReferral = () => {
    navigation.navigate('Referral');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Preference"
        data={listPreference}
        onPress={goToScreenReferral}
        onUpdatePreference={(props?: UpdateProfilePropsType) =>
          updateProfilePreference(props)
        }
        setFollowMusician={(props?: FollowMusicianPropsType) =>
          setFollowMusician(props, {}, true)
        }
        setUnfollowMusician={(props?: FollowMusicianPropsType) =>
          setUnfollowMusician(props, {}, true)
        }
        dataList={dataMusician}
        isLoading={isLoading}
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
