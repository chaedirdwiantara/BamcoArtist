import {UploadImageResponseType} from '../interface/uploadImage.interface';
import SsuAPI from './base';

export const uploadImage = async (
  image: string,
): Promise<UploadImageResponseType> => {
  let formData = new FormData();
  formData.append('image', image);

  const {data} = await SsuAPI().request<UploadImageResponseType>({
    url: '/upload-image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return data;
};
