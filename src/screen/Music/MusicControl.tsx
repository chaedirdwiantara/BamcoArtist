import React from 'react';
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

const MusicControl = () => {
  const {
    isPlay,
    isShuffle,
    repeat,
    setPlaySong,
    setPauseSong,
    setNextPrevTrack,
    setShufflePlayer,
    setRepeatPlayer,
  } = usePlayerHook();

  const shuffleOnpress = () => {
    setShufflePlayer(!isShuffle);
  };

  const repeatOnPress = () => {
    switch (repeat) {
      case 'off':
        setRepeatPlayer('all');
        break;

      case 'all':
        setRepeatPlayer('one');
        break;

      case 'one':
        setRepeatPlayer('off');
        break;

      default:
        break;
    }
  };

  const handlePlayPaused = () => {
    if (isPlay) {
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
        {isPlay ? <PauseIcon2 /> : <PlayIcon2 />}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextTrack} style={styles.touchableStyle}>
        <NextIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={repeatOnPress}
        style={[styles.touchableStyle, {alignItems: 'flex-end'}]}>
        {repeat === 'off' ? (
          <RepeatIcon fill={undefined} />
        ) : repeat === 'all' ? (
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
