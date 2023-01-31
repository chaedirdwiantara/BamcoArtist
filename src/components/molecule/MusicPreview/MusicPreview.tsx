import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {Gap, SquareImage} from '../../atom';
import {CloseCircleIcon, PauseIcon, PlayIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Slider} from '@miblanchard/react-native-slider';

interface MusicPreviewProps {
  targetId: string;
  targetType?: string;
  title: string;
  musician: string;
  coverImage: string;
  encodeDashUrl: string;
  encodeHlsUrl: string;
  startAt?: string;
  endAt?: string;
  hideClose?: boolean;
  onPress: () => void;
  closeOnPress: () => void;
  isPlay: boolean;
  playOrPause: () => void;
  pauseModeOn: boolean;
  currentProgress: number;
  duration: number;
  seekPlayer: (second: number) => void;
}

const MusicPreview: FC<MusicPreviewProps> = (props: MusicPreviewProps) => {
  const {
    targetId,
    targetType,
    title,
    musician,
    coverImage,
    encodeDashUrl,
    encodeHlsUrl,
    startAt,
    endAt,
    hideClose,
    onPress,
    closeOnPress,
    playOrPause,
    isPlay,
    pauseModeOn,
    currentProgress,
    duration,
    seekPlayer,
  } = props;

  return (
    <View style={styles.container}>
      <View>
        <SquareImage size={95} imgUri={coverImage} />
        {isPlay && Math.floor(currentProgress) !== Math.floor(duration) ? (
          <TouchableOpacity style={styles.iconOnPress} onPress={playOrPause}>
            <PauseIcon stroke={color.Neutral[10]} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconOnPress}
            onPress={pauseModeOn ? playOrPause : onPress}>
            <PlayIcon stroke={color.Neutral[10]} />
          </TouchableOpacity>
        )}
      </View>
      <Gap width={7} />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text numberOfLines={2} style={styles.songTitle}>
            {title}
          </Text>
          <Gap height={6} />
          <Text numberOfLines={1} style={styles.musicianName}>
            {musician}
          </Text>
        </View>
        <View style={styles.sliderStyle}>
          <Slider
            value={pauseModeOn ? currentProgress : 0}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={color.Success[400]}
            maximumTrackTintColor={color.Dark[400]}
            thumbTintColor={color.Success[400]}
            onSlidingComplete={e => {
              const seekDuration = e as number[];
              seekPlayer(seekDuration[0]);
            }}
            thumbStyle={{width: 8, height: 8}}
            containerStyle={{
              marginBottom: heightResponsive(-12),
              marginTop: heightResponsive(-25),
            }}
          />
          <View style={styles.progresTextContainer}>
            <Text style={styles.progresText}>
              {pauseModeOn
                ? new Date((currentProgress + 1) * 1000)
                    .toISOString()
                    .slice(14, 19)
                : '0:00'}
            </Text>
            <Text style={styles.progresText}>
              {new Date(duration * 1000).toISOString().slice(14, 19)}
            </Text>
          </View>
        </View>
      </View>
      {hideClose ? null : (
        <TouchableOpacity style={styles.closeIconButton} onPress={closeOnPress}>
          <CloseCircleIcon width={20} height={20} />
        </TouchableOpacity>
      )}
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
  sliderStyle: {
    width: '100%',
  },
  progresTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresText: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
});
