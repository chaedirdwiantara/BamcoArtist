import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {FollowingList} from '../../components';
import {RootStackParams} from '../../navigations';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../../interface/musician.interface';
import {profileStorage} from '../../hooks/use-storage.hook';

type FollowingProps = NativeStackScreenProps<RootStackParams, 'Following'>;

export const FollowingScreen: React.FC<FollowingProps> = ({
  route,
}: FollowingProps) => {
  const selfUUID = profileStorage()?.uuid;
  const {uuid} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [search, setSearch] = useState<string>('');

  const {
    listFollowingMusician,
    setFollowMusician,
    setUnfollowMusician,
    getListFollowingMusician,
  } = useMusicianHook();

  useFocusEffect(
    useCallback(() => {
      getListFollowingMusician({
        uuid,
        keyword: search,
      });
    }, [search]),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToMusician = (musicianId: string) => {
    navigation.navigate('MusicianProfile', {id: musicianId});
  };

  return (
    <View style={styles.root}>
      <FollowingList
        search={search}
        setSearch={setSearch}
        setFollowMusician={(props?: FollowMusicianPropsType) =>
          setFollowMusician(props, {keyword: search}, true)
        }
        setUnfollowMusician={(props?: FollowMusicianPropsType) =>
          setUnfollowMusician(props, {keyword: search}, true)
        }
        dataList={listFollowingMusician.filter(val => val.uuid !== selfUUID)}
        onPressGoBack={onPressGoBack}
        goToMusician={goToMusician}
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
