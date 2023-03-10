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
import {profileStorage} from '../../hooks/use-storage.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../../interface/musician.interface';

type FollowingProps = NativeStackScreenProps<RootStackParams, 'Following'>;

export const FollowingScreen: React.FC<FollowingProps> = ({
  route,
}: FollowingProps) => {
  const {uuid} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [search, setSearch] = useState<string>('');

  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();

  const fansUUID = uuid ? uuid : profileStorage()?.uuid;

  useFocusEffect(
    useCallback(() => {
      getListDataMusician({
        fansUUID,
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
        dataList={dataMusician}
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
