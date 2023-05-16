import {Video} from 'react-native-image-crop-picker';
import create from 'zustand';

interface VideoStore {
  uriVideo: Video | null;
  allowToUpload: boolean;
  setUriVideo: (value: Video | null) => void;
  setAllowToUpload: (value: boolean) => void;
}

export const useVideoStore = create<VideoStore>(set => ({
  uriVideo: null,
  allowToUpload: false,
  setAllowToUpload: (value: boolean) => set({allowToUpload: value}),
  setUriVideo: (value: Video | null) => set({uriVideo: value}),
}));

interface DataVideoForPost {
  storedInputText: string;
  storedValueFilter: string;
  storedDataAudience: string;
  setStoredInputText: (value: string) => void;
  setStoredValueFilter: (value: string) => void;
  setStoredDataAudience: (value: string) => void;
}

export const useDataVideoForPost = create<DataVideoForPost>(set => ({
  storedInputText: '',
  storedValueFilter: '',
  storedDataAudience: '',
  setStoredInputText: (value: string) => set({storedInputText: value}),
  setStoredValueFilter: (value: string) => set({storedValueFilter: value}),
  setStoredDataAudience: (value: string) => set({storedDataAudience: value}),
}));
