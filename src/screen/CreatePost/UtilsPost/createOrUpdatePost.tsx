import {useEffect} from 'react';
import {Image} from 'react-native-image-crop-picker';
import {CreatePostProps, PostList} from '../../../interface/feed.interface';
import {UploadVideoDataResponseType} from '../../../interface/uploadImage.interface';

export const createOrUpdate = (
  active: boolean,
  uri: Image[],
  dataResponseImg: string[],
  dataUpdatePostProps: PostList | undefined,
  dataVideo: UploadVideoDataResponseType | undefined,
  inputText: string,
  valueFilter: string | undefined,
  dataAudience: string,
  setCreatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  setUpdatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  setActive: (value: React.SetStateAction<boolean>) => void,
) => {
  useEffect(() => {
    if (active && uri.length !== 0 && dataResponseImg.length === uri.length) {
      if (dataUpdatePostProps === undefined && dataVideo === undefined) {
        setCreatePost({
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Feed.Exclusive',
        });
      } else if (dataUpdatePostProps) {
        setUpdatePost({
          id: dataUpdatePostProps.id,
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Feed.Exclusive',
        });
      }
      setActive(false);
    }
  }, [dataResponseImg, uri, active]);
};
