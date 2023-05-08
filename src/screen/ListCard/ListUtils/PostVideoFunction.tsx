import {useEffect} from 'react';
import {Video} from 'react-native-image-crop-picker';

export const uploadVideo = (
  uriVideo: Video | null,
  setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  setUploadVideo: (
    video: Video,
    setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  ) => Promise<void>,
  setPreventPost: React.Dispatch<React.SetStateAction<boolean>>,
  setModalConfirm: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (!uriVideo || uriVideo.duration == null) return;

    if (uriVideo.duration <= 15000) {
      setUploadVideo(uriVideo, setProgress);
      setPreventPost(true);
    } else {
      setModalConfirm(true);
    }
  }, [uriVideo, setProgress]);
};
