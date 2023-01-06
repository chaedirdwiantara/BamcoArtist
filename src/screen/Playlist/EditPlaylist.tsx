import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {EditPlaylistContent} from '../../components';

interface PlaylistProps {
  props: {};
  route: any;
}

export const EditPlaylist: React.FC<PlaylistProps> = (props: PlaylistProps) => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToPlaylist = (param: any) => {
    navigation.navigate('Playlist', {...param});
  };

  return (
    <View style={styles.root}>
      <EditPlaylistContent
        playlist={params}
        onPressGoBack={onPressGoBack}
        goToPlaylist={goToPlaylist}
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
