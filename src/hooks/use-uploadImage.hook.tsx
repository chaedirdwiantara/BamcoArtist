import {useState} from 'react';
import {InteractionManager} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import {uploadImage, uploadVideo} from '../api/uploadImage.api';
import {
  UploadImageResponseType,
  UploadVideoDataResponseType,
} from '../interface/uploadImage.interface';

export const useUploadImageHook = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [dataImage, setDataImage] = useState<UploadImageResponseType>();
  const [dataVideo, setDataVideo] = useState<UploadVideoDataResponseType>();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isErrorVideo, setIsErrorVideo] = useState(false);

  const setUploadImage = async (image: Image, syncUpload?: string) => {
    InteractionManager.runAfterInteractions(() => setIsLoadingImage(true));
    try {
      const response = await uploadImage(
        image,
        syncUpload ? syncUpload : undefined,
      );
      setDataImage(response);
    } catch (error) {
      setIsErrorImage(true);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const setUploadVideo = async (video: Image) => {
    InteractionManager.runAfterInteractions(() => setIsLoadingVideo(true));
    try {
      const response = await uploadVideo(video);
      setDataVideo(response.data);
    } catch (error) {
      setIsErrorVideo(true);
    } finally {
      setIsLoadingVideo(false);
    }
  };

  return {
    isLoadingImage,
    isLoadingVideo,
    isErrorImage,
    isErrorVideo,
    dataImage,
    dataVideo,
    setUploadImage,
    setUploadVideo,
    setIsLoadingVideo,
    setDataVideo,
    setIsErrorVideo,
  };
};
