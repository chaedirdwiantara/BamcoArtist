import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {SongDetailsContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';

type SongDetailProps = NativeStackScreenProps<RootStackParams, 'SongDetails'>;

export const SongDetailsScreen: React.FC<SongDetailProps> = ({
  route,
}: SongDetailProps) => {
  const songId = route.params.id;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {isLoadingSong, isErrorSong, dataDetailSong, getDetailSong} =
    useSongHook();

  //  ? Get Detail Song
  useFocusEffect(
    useCallback(() => {
      getDetailSong({id: songId.toString()});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAlbum = () => {
    navigation.navigate('Album');
  };

  const goToShowCredit = () => {
    navigation.navigate('ShowCredit');
  };

  return (
    <View style={styles.root}>
      {dataDetailSong && (
        <SongDetailsContent
          onPressGoBack={onPressGoBack}
          goToAlbum={goToAlbum}
          goToShowCredit={goToShowCredit}
          dataDetail={dataDetailSong}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
