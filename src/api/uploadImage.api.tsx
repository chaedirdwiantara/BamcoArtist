import {UploadImageResponseType} from '../interface/uploadImage.interface';
import SsuAPI from './base';

export const uploadImage = async (
  image: any,
): Promise<UploadImageResponseType> => {
  let formData = new FormData();
  formData.append('image', {
    uri: image.path,
    name: image.filename,
    type: image.mime,
    size: image.size,
    lastModifiedDate: JSON.parse(image.modificationDate),
    uid: image.modificationDate,
  });

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
