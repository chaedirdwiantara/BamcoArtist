import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {CreateNewPlaylistContent} from '../../components';

type CreateNewPlaylistProps = NativeStackScreenProps<
  RootStackParams,
  'CreateNewPlaylist'
>;

export const CreateNewPlaylist: React.FC<CreateNewPlaylistProps> = ({
  navigation,
  route,
}: CreateNewPlaylistProps) => {
  const {params} = route;

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToPlaylist = (id: number) => {
    navigation.navigate('Playlist', {id, name: ''});
  };

  return (
    <View style={styles.root}>
      <CreateNewPlaylistContent
        onPressGoBack={onPressGoBack}
        goToPlaylist={goToPlaylist}
        songAddedToPlaylist={params}
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
