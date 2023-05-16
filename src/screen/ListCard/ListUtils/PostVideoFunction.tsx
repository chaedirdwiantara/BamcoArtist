import {useEffect} from 'react';
import {Video} from 'react-native-image-crop-picker';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {CreatePostProps, PostList} from '../../../interface/feed.interface';
import {UploadVideoDataResponseType} from '../../../interface/uploadImage.interface';

export const useUploadVideo = (
  uriVideo: Video | null,
  allowToUpload: boolean,
  setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  setUploadVideo: (
    video: Video,
    setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  ) => Promise<void>,
  setAllowToPost: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (uriVideo && uriVideo.duration && allowToUpload) {
      if (uriVideo.duration <= 15000) {
        setUploadVideo(uriVideo, setProgress);
        setAllowToPost(true);
      }
    }
  }, [uriVideo, allowToUpload]);
};

export const usePostVideo = (
  dataVideo: UploadVideoDataResponseType | undefined,
  uriVideo: Video | null,
  setCreatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  inputText: string,
  valueFilter: string,
  dataAudience: string,
) => {
  useEffect(() => {
    const shouldCreatePost = dataVideo && uriVideo;

    if (shouldCreatePost) {
      const video = {
        targetType: 'video',
        coverImage: dataVideo.coverImage,
        encodeDashUrl: dataVideo.encodeDashUrl,
        encodeHlsUrl: dataVideo.encodeHlsUrl,
        duration: uriVideo.duration ?? 0,
      };

      setCreatePost({
        caption: inputText,
        category: valueFilter,
        isPremium: dataAudience === 'Feed.Exclusive',
        video,
      });
    }
  }, [dataVideo, uriVideo]);
};
