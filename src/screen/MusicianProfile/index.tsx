import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {MusicianDetail} from './MusicianDetail';
import {color} from '../../theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const uuid = route.params.id;

  const {isLoading, isError, dataDetailMusician, getDetailMusician} =
    useMusicianHook();

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getDetailMusician({id: uuid});
    }, []),
  );

  const onPressGoTo = (screenName: 'Setting' | 'CreateNewPlaylist') => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.root}>
      {dataDetailMusician && (
        <MusicianDetail profile={dataDetailMusician} uuid={uuid} />
      )}
    </View>
  );
};

export default MusicianProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
});
