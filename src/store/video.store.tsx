import {Video} from 'react-native-image-crop-picker';
import create from 'zustand';
import {VideoResponseType} from '../interface/feed.interface';

interface VideoStore {
  uriVideo: Video | null;
  allowToUpload: boolean;
  allowToUpdate: boolean;
  setUriVideo: (value: Video | VideoResponseType | null) => void;
  setAllowToUpload: (value: boolean) => void;
  setAllowToUpdate: (value: boolean) => void;
}

export const useVideoStore = create<VideoStore>(set => ({
  uriVideo: null,
  allowToUpload: false,
  allowToUpdate: false,
  setAllowToUpload: (value: boolean) => set({allowToUpload: value}),
  setAllowToUpdate: (value: boolean) => set({allowToUpdate: value}),
  setUriVideo: (value: Video | VideoResponseType | null) => {
    if (value !== null) {
      if (
        'path' in value &&
        'size' in value &&
        'width' in value &&
        'height' in value &&
        'mime' in value
      ) {
        set({uriVideo: value});
      }
      if ('encodeHlsUrl' in value) {
        const timeString = value.duration;
        const [minutes, seconds] = timeString.split(':').map(Number);
        const timeInMs = (minutes * 60 + seconds) * 1000;
        const video: Video = {
          path: value.encodeHlsUrl,
          size: 500000,
          width: 200,
          height: 320,
          mime: 'video/mp4/editable',
          duration: timeInMs,
          sourceURL: value.coverImage[0].image,
          localIdentifier: value.encodeDashUrl,
        };
        set({uriVideo: video});
      }
    } else {
      set({uriVideo: value});
    }
  },
}));

interface DataVideoForPost {
  storedInputText: string;
  storedValueFilter: string;
  storedDataAudience: string;
  storedIdForUpdate: string;
  setStoredInputText: (value: string) => void;
  setStoredValueFilter: (value: string) => void;
  setStoredDataAudience: (value: string) => void;
  setStoredIdForUpdate: (value: string) => void;
}

export const useDataVideoForPost = create<DataVideoForPost>(set => ({
  storedInputText: '',
  storedValueFilter: '',
  storedDataAudience: '',
  storedIdForUpdate: '',
  setStoredInputText: (value: string) => set({storedInputText: value}),
  setStoredValueFilter: (value: string) => set({storedValueFilter: value}),
  setStoredDataAudience: (value: string) => set({storedDataAudience: value}),
  setStoredIdForUpdate: (value: string) => set({storedIdForUpdate: value}),
}));
