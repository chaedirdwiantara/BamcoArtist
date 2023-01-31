import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  NextIcon,
  PauseIcon2,
  PlayIcon2,
  PreviousIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from '../../assets/icon';
import {heightResponsive, widthResponsive} from '../../utils';
import {color} from '../../theme';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {RepeatMode} from 'react-native-track-player';

const MusicControl = () => {
  const {
    isPlaying,
    isShuffle,
    repeat,
    setPlaySong,
    setPauseSong,
    setNextPrevTrack,
    setShufflePlayer,
    getRepeatPlayer,
    setRepeatPlayer,
  } = usePlayerHook();
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(repeat.Off);

  useEffect(() => {
    getRepeat();
  }, [setRepeatPlayer]);

  const getRepeat = () => {
    getRepeatPlayer().then(res => {
      setRepeatMode(res);
    });
  };

  const shuffleOnpress = () => {
    setShufflePlayer(!isShuffle);
  };

  const repeatOnPress = () => {
    switch (repeatMode) {
      case repeat.Off:
        setRepeatPlayer(repeat.Queue, getRepeat);
        break;

      case repeat.Queue:
        setRepeatPlayer(repeat.Track, getRepeat);
        break;

      case repeat.Track:
        setRepeatPlayer(repeat.Off, getRepeat);
        break;

      default:
        console.log('none');
        break;
    }
  };

  const handlePlayPaused = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const handleNextTrack = () => {
    setNextPrevTrack('next');
  };

  const handlePrevTrack = () => {
    setNextPrevTrack('prev');
  };

  return (
    <View style={styles.bottomIconWrapper}>
      <TouchableOpacity
        onPress={shuffleOnpress}
        style={[styles.touchableStyle, {alignItems: 'flex-start'}]}>
        <ShuffleIcon fill={isShuffle ? color.Success[400] : undefined} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePrevTrack} style={styles.touchableStyle}>
        <PreviousIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePlayPaused}
        style={[styles.touchableStyle, {width: widthResponsive(50)}]}>
        {isPlaying ? <PauseIcon2 /> : <PlayIcon2 />}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextTrack} style={styles.touchableStyle}>
        <NextIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={repeatOnPress}
        style={[styles.touchableStyle, {alignItems: 'flex-end'}]}>
        {repeatMode === repeat.Off ? (
          <RepeatIcon fill={undefined} />
        ) : repeatMode === repeat.Queue ? (
          <RepeatIcon fill={color.Success[400]} />
        ) : (
          <RepeatOneIcon fill={color.Success[400]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MusicControl;

const styles = StyleSheet.create({
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  touchableStyle: {
    alignItems: 'center',
    paddingVertical: heightResponsive(8),
  },
});
