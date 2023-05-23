import {useEffect} from 'react';
import {Video} from 'react-native-image-crop-picker';
import {CreatePostProps} from '../../../interface/feed.interface';
import {UploadVideoDataResponseType} from '../../../interface/uploadImage.interface';

export const useUploadVideo = (
  uriVideo: Video | null,
  allowToUpload: boolean,
  allowToUpdate: boolean,
  setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  setUploadVideo: (
    video: Video,
    setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  ) => Promise<void>,
) => {
  useEffect(() => {
    if (uriVideo && uriVideo.duration && allowToUpload) {
      if (uriVideo.duration <= 15000) {
        setUploadVideo(uriVideo, setProgress);
      }
    } else if (uriVideo && uriVideo.duration && allowToUpdate) {
      if (uriVideo.duration <= 15000) {
        setUploadVideo(uriVideo, setProgress);
      }
    }
  }, [uriVideo, allowToUpload, allowToUpdate]);
};

export const usePostVideo = (
  dataVideo: UploadVideoDataResponseType | undefined,
  uriVideo: Video | null,
  setCreatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  inputText: string,
  valueFilter: string,
  dataAudience: string,
  allowToPost: boolean,
  storedIdForUpdate: string,
  allowToUpdate: boolean,
  setUpdatePost: (props?: CreatePostProps | undefined) => Promise<void>,
) => {
  useEffect(() => {
    const shouldCreatePost = dataVideo && uriVideo;

    if (allowToPost) {
      if (shouldCreatePost) {
        const video = {
          targetType: 'video',
          coverImage: dataVideo.coverImage,
          encodeDashUrl: dataVideo.encodeDashUrl,
          encodeHlsUrl: dataVideo.encodeHlsUrl,
          duration: uriVideo.duration ?? 0,
        };
        if (allowToUpdate) {
          setUpdatePost({
            id: storedIdForUpdate,
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive',
            video,
          });
        } else {
          setCreatePost({
            caption: inputText,
            category: valueFilter,
            isPremium: dataAudience === 'Feed.Exclusive',
            video,
          });
        }
      }
    }
  }, [allowToPost]);
};
