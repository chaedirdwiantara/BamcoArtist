import React from 'react';
import Video from 'react-native-video';
import {usePlayerStore} from '../store/player.store';

export const usePlayerHook = () => {
  const playerStore = usePlayerStore();

  const setPlayerRef = (ref: React.MutableRefObject<Video | null>) => {
    playerStore.setPlayerRef(ref);
  };

  const setMusicDataPlayer = ({
    title,
    artist,
    albumImg,
  }: {
    title: string;
    artist: string;
    albumImg: string | null;
  }) => {
    playerStore.setMusicData({title, artist, albumImg});
  };

  const showPlayer = () => {
    playerStore.setShow(true);
    setPlaySong();
  };

  const hidePlayer = () => {
    playerStore.setShow(false);
  };

  const setDurationPlayer = (duration: number) => {
    playerStore.setDuration(duration);
  };

  const setProgressPlayer = (progress: number) => {
    playerStore.setCurrentProgress(progress);
  };

  const setPlaySong = () => {
    playerStore.setPlay(true);
  };

  const setPauseSong = () => {
    playerStore.setPlay(false);
  };

  const seekPlayer = (second: number) => {
    playerStore.playerRef?.current?.seek(second);
  };

  return {
    playerRef: playerStore.playerRef,
    musicData: playerStore.musicData,
    visible: playerStore.show,
    duration: playerStore.duration,
    currentProgress: playerStore.currentProgress,
    isPlay: playerStore.play,
    setPlayerRef,
    setMusicDataPlayer,
    showPlayer,
    hidePlayer,
    setDurationPlayer,
    setProgressPlayer,
    setPlaySong,
    setPauseSong,
    seekPlayer,
  };
};
