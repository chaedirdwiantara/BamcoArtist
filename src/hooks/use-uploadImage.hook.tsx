import {useState} from 'react';
import {InteractionManager} from 'react-native';
import {Image, Video} from 'react-native-image-crop-picker';
import {
  progressUploadVideo,
  uploadImage,
  uploadVideo,
} from '../api/uploadImage.api';
import {
  UploadImageResponseType,
  UploadVideoDataResponseType,
} from '../interface/uploadImage.interface';
import {ParamsProps} from '../interface/base.interface';
import {ProgressUploadDataResponseType} from '../interface/uploadImage.interface';

export const useUploadImageHook = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [dataImage, setDataImage] = useState<UploadImageResponseType>();
  const [dataVideo, setDataVideo] = useState<UploadVideoDataResponseType>();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isErrorVideo, setIsErrorVideo] = useState(false);
  const [uploadStatus, setUploadStatus] =
    useState<ProgressUploadDataResponseType>();

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

  const setUploadVideo = async (
    video: Video,
    setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  ) => {
    InteractionManager.runAfterInteractions(() => setIsLoadingVideo(true));
    try {
      const response = await uploadVideo(video, setProgress);
      setDataVideo(response.data);
    } catch (error) {
      setIsErrorVideo(true);
    } finally {
      setIsLoadingVideo(false);
    }
  };

  const getProgressUploadVideo = async (
    props: ParamsProps,
    setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
  ) => {
    try {
      const response = await progressUploadVideo(props, setProgress);
      setUploadStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoadingImage,
    isLoadingVideo,
    isErrorImage,
    isErrorVideo,
    dataImage,
    dataVideo,
    uploadStatus,
    setUploadStatus,
    setUploadImage,
    setUploadVideo,
    setIsLoadingVideo,
    setDataVideo,
    setIsErrorVideo,
    getProgressUploadVideo,
  };
};
