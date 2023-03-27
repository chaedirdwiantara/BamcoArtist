import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../atom';
import Album from '../../../../screen/MusicianProfile/Album';

const Released = () => {
  return (
    <View>
      <Text style={styles.textComp}>Released This Year</Text>
      <Gap height={16} />
      {/* <Album
        title={''}
        data={dataAlbum}
        artistName={profile.fullname}
        errorText={noAlbumText}
        noTitle
      /> */}
    </View>
  );
};

export default Released;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
