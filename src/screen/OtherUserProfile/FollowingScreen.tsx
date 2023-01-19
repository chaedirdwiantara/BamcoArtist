import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {FollowingList} from '../../components';
import {RootStackParams} from '../../navigations';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../../interface/musician.interface';

export const FollowingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();

  useFocusEffect(
    useCallback(() => {
      getListDataMusician({fansUUID: profileStorage()?.uuid});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <FollowingList
        setFollowMusician={(props?: FollowMusicianPropsType) =>
          setFollowMusician(props, {}, true)
        }
        setUnfollowMusician={(props?: FollowMusicianPropsType) =>
          setUnfollowMusician(props, {}, true)
        }
        dataList={dataMusician}
        onPressGoBack={onPressGoBack}
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
