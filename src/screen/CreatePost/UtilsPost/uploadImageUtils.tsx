import {Image, Video} from 'react-native-image-crop-picker';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {useEffect} from 'react';
import {CreatePostProps, PostList} from '../../../interface/feed.interface';
import {UploadVideoDataResponseType} from '../../../interface/uploadImage.interface';
import {dummySongImg} from '../../../data/image';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

export const useTriggerUploadImage = (
  active: boolean,
  uri: Image[],
  musicData: ListDataSearchSongs | undefined,
  updateOn: boolean,
  uriVideo: Video | null,
  updateToUpload: boolean,
  dataUpdatePostProps: PostList | undefined,
  dataVideo: UploadVideoDataResponseType | undefined,
  inputText: string,
  valueFilter: string | undefined,
  dataAudience: string,
  userId: string,
  show: boolean,
  setCreatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  setUpdatePost: (props?: CreatePostProps | undefined) => Promise<void>,
  setUploadImage: (
    image: Image,
    syncUpload?: string | undefined,
  ) => Promise<void>,
  setStoredIdForUpdate: (value: string) => void,
  setStoredInputText: (value: string) => void,
  setStoredValueFilter: (value: string) => void,
  setStoredDataAudience: (value: string) => void,
  setAllowToUpdate: (value: boolean) => void,
  setWithoutBottomTab: (by: boolean) => void,
  navigation: NativeStackNavigationProp<RootStackParams>,
) => {
  useEffect(() => {
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps === undefined &&
      dataVideo === undefined
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
      });
    }

    // ? for UPDATE POST text only
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps !== undefined &&
      !uriVideo
    ) {
      setUpdatePost({
        id: dataUpdatePostProps.id,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
      });
    }

    if (active == true && uri.length !== 0 && uri[0]?.mime !== 'video/mp4') {
      for (let i = 0; i < uri.length; i++) {
        setUploadImage(uri[i], 'medium');
      }
    }

    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === false &&
      dataVideo === undefined
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        quoteToPost:
          musicData !== undefined && musicData?.transcodedSongUrl !== undefined
            ? {
                targetId: musicData.id?.toString(),
                targetType: 'song',
                title: musicData.title,
                musician: musicData.musicianName,
                coverImage:
                  musicData.imageUrl.length !== 0
                    ? musicData.imageUrl[1].image
                    : dummySongImg,
                encodeDashUrl: musicData.transcodedSongUrl[0].encodedDashUrl,
                encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
                startAt: '00:00',
                endAt: musicData.songDuration.toString(),
              }
            : undefined,
      });
    }

    // ? for EDIT UPLOAD MUSIC only
    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === true &&
      !uriVideo
    ) {
      setUpdatePost({
        id: userId,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        quoteToPost:
          musicData !== undefined && musicData?.transcodedSongUrl !== undefined
            ? {
                targetId: musicData.id?.toString(),
                targetType: 'song',
                title: musicData.title,
                musician: musicData.musicianName,
                coverImage:
                  musicData.imageUrl.length !== 0
                    ? musicData.imageUrl[1].image
                    : dummySongImg,
                encodeDashUrl: musicData.transcodedSongUrl[0].encodedDashUrl,
                encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
              }
            : undefined,
      });
    }

    // ? for EDIT UPLOAD VIDEO only
    if (active == true && updateOn && uriVideo) {
      if (!updateToUpload) {
        const video = {
          targetType: 'video',
          coverImage: uriVideo.sourceURL ?? '',
          encodeDashUrl: uriVideo.localIdentifier ?? '',
          encodeHlsUrl: uriVideo.path,
          duration: uriVideo.duration ?? 0,
        };

        setUpdatePost({
          id: userId,
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          isPremium: dataAudience === 'Feed.Exclusive',
          video,
        });
      } else {
        setStoredIdForUpdate(userId);
        setStoredInputText(inputText);
        setStoredValueFilter(valueFilter ? valueFilter : 'highlight');
        setStoredDataAudience(dataAudience);
        setAllowToUpdate(true);
        show && setWithoutBottomTab(false);
        navigation.goBack();
      }
    }
  }, [active, uri, musicData, updateOn, uriVideo, updateToUpload]);
};
