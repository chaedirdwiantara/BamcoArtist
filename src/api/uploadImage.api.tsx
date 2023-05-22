import SsuAPI from './baseRinjani';
import {Image} from 'react-native-image-crop-picker';
import {
  ProgressUploadVideoResponseType,
  UploadImageResponseType,
  UploadVideoResponseType,
} from '../interface/uploadImage.interface';
import {ParamsProps} from '../interface/base.interface';

export const uploadImage = async (
  image: Image,
  syncUpload?: string,
): Promise<UploadImageResponseType> => {
  let formData = new FormData();
  formData.append('image', {
    uri: image.path,
    name: `${Date.now()}.jpg`,
    type: image.mime,
    syncUpload: syncUpload ? syncUpload : undefined,
  });

  const {data} = await SsuAPI().request<UploadImageResponseType>({
    url: '/musician-app/upload-image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, header) => {
      return formData;
    },
    data: formData,
  });

  return data;
};

export const uploadVideo = async (
  video: Image,
  setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<UploadVideoResponseType> => {
  let formData = new FormData();
  formData.append('file', {
    uri: video.path,
    name: `${Date.now()}.mp4`,
    type: video.mime,
  });

  const {data} = await SsuAPI().request<UploadVideoResponseType>({
    url: '/upload-video',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, header) => {
      return formData;
    },
    onUploadProgress: ({loaded, total}) => {
      setProgress(loaded / total);
    },
    // timeout: 60000,
    // maxContentLength: 1000000000000,
    data: formData,
  });

  return data;
};

export const progressUploadVideo = async (
  props: ParamsProps,
  setProgress: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<ProgressUploadVideoResponseType> => {
  const {data} = await SsuAPI().request<ProgressUploadVideoResponseType>({
    url: `/progress-upload-video/${props.uid}`,
    method: 'GET',
    onUploadProgress: ({loaded, total}) => {
      setProgress(loaded / total);
    },
  });

  return data;
};
