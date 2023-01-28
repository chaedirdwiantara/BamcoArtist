import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {Gap, SquareImage} from '../../atom';
import {CloseCircleIcon, PlayIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';
import {ListDataSearchSongsNavigate} from '../../../interface/search.interface';

interface MusicPreviewProps {
  data: ListDataSearchSongsNavigate;
}

const MusicPreview: FC<MusicPreviewProps> = (props: MusicPreviewProps) => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <View>
        <SquareImage size={95} imgUri={data.imageUrl} />
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
          {data.title}
        </Text>
        <Text numberOfLines={1} style={styles.musicianName}>
          {data.musicianName}
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
    maxWidth: '100%',
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
