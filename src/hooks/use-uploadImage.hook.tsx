import {useState} from 'react';
import {Image} from 'react-native-image-crop-picker';
import {uploadImage} from '../api/uploadImage.api';
import {UploadImageResponseType} from '../interface/uploadImage.interface';

export const useUploadImageHook = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [dataImage, setDataImage] = useState<UploadImageResponseType>();
  const [isErrorImage, setIsErrorImage] = useState(false);

  const setUploadImage = async (image: Image) => {
    setIsLoadingImage(true);
    try {
      const response = await uploadImage(image);
      setDataImage(response);
    } catch (error) {
      setIsErrorImage(true);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return {
    isLoadingImage,
    isErrorImage,
    dataImage,
    setUploadImage,
  };
};
