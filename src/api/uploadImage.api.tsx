import SsuAPI from './baseMusician';
import {Image} from 'react-native-image-crop-picker';
import {UploadImageResponseType} from '../interface/uploadImage.interface';

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
    url: '/upload-image',
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
