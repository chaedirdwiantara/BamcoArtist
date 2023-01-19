import React from 'react';
import create from 'zustand';
import Video from 'react-native-video';
import {SongList} from '../interface/song.interface';

interface PlayerState {
  playerRef: React.MutableRefObject<Video | null>;
  show: boolean;
  duration: number;
  currentProgress: number;
  play: boolean;
  musicData: {
    id: number;
    title: string;
    artist: string;
    albumImg: string | null;
    musicUrl: string;
    musicianId: string;
  };
  playlist: SongList[];
  isShuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  setPlayerRef: (by: React.MutableRefObject<Video | null>) => void;
  setShow: (by: boolean) => void;
  setDuration: (by: number) => void;
  setCurrentProgress: (by: number) => void;
  setPlay: (by: boolean) => void;
  setMusicData: (by: {
    id: number;
    title: string;
    artist: string;
    albumImg: string | null;
    musicUrl: string;
    musicianId: string;
  }) => void;
  setPlaylist: (by: SongList[]) => void;
  setShuffle: (by: boolean) => void;
  setRepeat: (by: 'off' | 'one' | 'all') => void;
}

export const usePlayerStore = create<PlayerState>()(set => ({
  playerRef: React.createRef(),
  show: false,
  duration: 0,
  currentProgress: 0,
  play: false,
  musicData: {
    id: 0,
    title: '',
    artist: '',
    albumImg: '',
    musicUrl: '',
    musicianId: '',
  },
  playlist: [],
  isShuffle: false,
  repeat: 'off',
  setPlayerRef: by => set(state => ({playerRef: by})),
  setShow: by => set(state => ({show: by})),
  setDuration: by => set(state => ({duration: by})),
  setCurrentProgress: by => set(state => ({currentProgress: by})),
  setPlay: by => set(state => ({play: by})),
  setMusicData: by => set(state => ({musicData: by})),
  setPlaylist: by => set(state => ({playlist: by})),
  setShuffle: by => set(state => ({isShuffle: by})),
  setRepeat: by => set(state => ({repeat: by})),
}));
