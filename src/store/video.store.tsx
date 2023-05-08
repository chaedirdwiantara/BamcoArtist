import {Video} from 'react-native-image-crop-picker';
import create from 'zustand';

interface VideoStore {
  uriVideo: Video | null;
  setUriVideo: (value: Video | null) => void;
}

export const useVideoStore = create<VideoStore>(set => ({
  uriVideo: null,
  setUriVideo: (value: Video | null) => set({uriVideo: value}),
}));
