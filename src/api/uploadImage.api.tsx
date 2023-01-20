import SsuAPI from './baseMusician';
import {Platform} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import {UploadImageResponseType} from '../interface/uploadImage.interface';

export const uploadImage = async (
  image: Image,
): Promise<UploadImageResponseType> => {
  let formData = new FormData();
  formData.append('image', {
    uri: Platform.OS === 'android' ? image.path : image.sourceURL,
    name: `${Date.now()}.jpg`,
    type: image.mime,
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
