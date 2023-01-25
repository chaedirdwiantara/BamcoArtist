import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {EditPlaylistContent} from '../../components';
import {useBackHandler} from '../../utils/useBackHandler';

type EditPlaylistProps = NativeStackScreenProps<
  RootStackParams,
  'EditPlaylist'
>;

export const EditPlaylist: React.FC<EditPlaylistProps> = ({
  navigation,
  route,
}: EditPlaylistProps) => {
  const onPressGoBack = () => {
    navigation.goBack();
  };

  useBackHandler(() => {
    onPressGoBack();
    return true;
  });

  const goToPlaylist = (param: any) => {
    navigation.navigate('Playlist', {...param});
  };

  return (
    <View style={styles.root}>
      <EditPlaylistContent
        playlist={route.params}
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
