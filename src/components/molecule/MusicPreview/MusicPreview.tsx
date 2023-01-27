import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {Gap, SquareImage} from '../../atom';
import {
  CloseCircleIcon,
  CloseIcon,
  PauseIcon,
  PlayIcon,
} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';

const MusicPreview = () => {
  return (
    <View style={styles.container}>
      <View>
        <SquareImage size={95} />
        <TouchableOpacity style={styles.iconOnPress}>
          <PlayIcon stroke={color.Neutral[10]} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconOnPress}>
          <PauseIcon stroke={color.Neutral[10]} />
        </TouchableOpacity> */}
      </View>
      <Gap width={7} />
      <View>
        <Text numberOfLines={2} style={styles.songTitle}>
          The man who can't be moved
        </Text>
        <Text numberOfLines={1} style={styles.musicianName}>
          Kadal Jenal
        </Text>
      </View>
      <TouchableOpacity style={styles.closeIconButton}>
        <CloseCircleIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default MusicPreview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.Dark[500],
    flexDirection: 'row',
    borderRadius: 4,
    padding: ms(7),
  },
  iconOnPress: {
    position: 'absolute',
    top: 27,
    left: 27,
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(15),
    color: color.Neutral[10],
    maxWidth: '75%',
  },
  musicianName: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Dark[50],
    maxWidth: '75%',
  },
  closeIconButton: {
    position: 'absolute',
    right: ms(7),
    top: ms(7),
  },
});
