import {useState} from 'react';
import {uploadImage} from '../api/uploadImage.api';
import {UploadImageResponseType} from '../interface/uploadImage.interface';

interface uriProps {
  assets: string[];
  path: string;
}

export const useUploadImageHook = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [dataImage, setDataImage] = useState<UploadImageResponseType>();
  const [isErrorImage, setIsErrorImage] = useState(false);

  const setUploadImage = async (image: uriProps) => {
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
