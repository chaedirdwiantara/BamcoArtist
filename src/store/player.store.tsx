import React from 'react';
import create from 'zustand';
import Video from 'react-native-video';
import {SongList} from '../interface/song.interface';
import {Track} from 'react-native-track-player';

interface PlayerState {
  playerRef: React.MutableRefObject<Video | null>;
  show: boolean;
  duration: number;
  currentProgress: number;
  play: boolean;
  currentTrack: Track | null;
  playlist: SongList[];
  isShuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  withoutBottomTab: boolean;
  setPlayerRef: (by: React.MutableRefObject<Video | null>) => void;
  setShow: (by: boolean) => void;
  setDuration: (by: number) => void;
  setCurrentProgress: (by: number) => void;
  setPlay: (by: boolean) => void;
  setCurrentTrack: (by: Track | null) => void;
  setPlaylist: (by: SongList[]) => void;
  setShuffle: (by: boolean) => void;
  setRepeat: (by: 'off' | 'one' | 'all') => void;
  setWithoutBottomTab: (by: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()(set => ({
  playerRef: React.createRef(),
  show: false,
  duration: 0,
  currentProgress: 0,
  play: false,
  currentTrack: null,
  playlist: [],
  isShuffle: false,
  repeat: 'off',
  withoutBottomTab: false,
  setPlayerRef: by => set(state => ({playerRef: by})),
  setShow: by => set(state => ({show: by})),
  setDuration: by => set(state => ({duration: by})),
  setCurrentProgress: by => set(state => ({currentProgress: by})),
  setPlay: by => set(state => ({play: by})),
  setCurrentTrack: by => set(state => ({currentTrack: by})),
  setPlaylist: by => set(state => ({playlist: by})),
  setShuffle: by => set(state => ({isShuffle: by})),
  setRepeat: by => set(state => ({repeat: by})),
  setWithoutBottomTab: by => set(state => ({withoutBottomTab: by})),
}));

export const useDogStore = create(() => ({paw: true, snout: true, fur: true}));
