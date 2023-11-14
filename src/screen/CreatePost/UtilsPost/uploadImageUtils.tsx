import {Image, Video} from 'react-native-image-crop-picker';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {useEffect} from 'react';
import {CreatePostProps, PostList} from '../../../interface/feed.interface';
import {dummySongImg} from '../../../data/image';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {dataVoteProps} from '../../../interface/vote.interface';
import {DataDropDownNumberType} from '../../../data/dropdown';

export const useTriggerUploadImage = (
  active: boolean,
  showIcon: 'All' | 'ImageVideo' | 'Music' | 'Vote',
  uri: Image[],
  musicData: ListDataSearchSongs | undefined,
  updateOn: boolean,
  uriVideo: Video | null,
  updateToUpload: boolean,
  dataUpdatePostProps: PostList | undefined,
  inputText: string,
  valueFilter: string | undefined,
  dataAudience: string,
  userId: string,
  show: boolean,
  dataVote: dataVoteProps[],
  pollDuration: DataDropDownNumberType,
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
    if (active) {
      //? TEXT ONLY POST
      if (showIcon == 'All') {
        //? CREATE post text only
        if (!updateOn) {
          setCreatePost({
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
          });
        }
        // ? UPDATE post text only
        else if (updateOn) {
          setUpdatePost({
            id: dataUpdatePostProps?.id,
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
          });
        }
      }
      // ? IMAGE/VIDEO POST
      if (showIcon === 'ImageVideo') {
        // ? UPLOAD IMAGE before create/update image post
        if (uri[0]?.mime !== 'video/mp4') {
          for (let i = 0; i < uri.length; i++) {
            setUploadImage(uri[i], 'medium');
          }
        } else {
          // ? UPDATE VIDEO post
          if (updateOn && uriVideo) {
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
        }
      }
      // ? MUSIC POST
      if (showIcon === 'Music') {
        // ? CREATE music post
        if (!updateOn) {
          setCreatePost({
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
            quoteToPost:
              musicData !== undefined &&
              musicData?.transcodedSongUrl !== undefined
                ? {
                    targetId: musicData.id?.toString(),
                    targetType: 'song',
                    title: musicData.title,
                    musician: musicData.musicianName,
                    coverImage:
                      musicData.imageUrl.length !== 0
                        ? musicData.imageUrl[1].image
                        : dummySongImg,
                    encodeDashUrl:
                      musicData.transcodedSongUrl[0].encodedDashUrl,
                    encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
                    startAt: '00:00',
                    endAt: musicData.songDuration.toString(),
                  }
                : undefined,
          });
        }
        // ? UPDATE music type
        if (updateOn) {
          setUpdatePost({
            id: userId,
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
            quoteToPost:
              musicData !== undefined &&
              musicData?.transcodedSongUrl !== undefined
                ? {
                    targetId: musicData.id?.toString(),
                    targetType: 'song',
                    title: musicData.title,
                    musician: musicData.musicianName,
                    coverImage:
                      musicData.imageUrl.length !== 0
                        ? musicData.imageUrl[1].image
                        : dummySongImg,
                    encodeDashUrl:
                      musicData.transcodedSongUrl[0].encodedDashUrl,
                    encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
                  }
                : undefined,
          });
        }
      }
      // ? VOTE POST
      if (showIcon === 'Vote') {
        // ? CREATE vote post
        if (!updateOn) {
          setCreatePost({
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
            isPolling: true,
            pollingOptions: dataVote,
            pollDuration: Number(pollDuration.value),
          });
        }
        // ? UPDATE vote post
        else {
          setUpdatePost({
            id: dataUpdatePostProps?.id,
            caption: inputText,
            category: valueFilter ? valueFilter : 'highlight',
            isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
            isPolling: true,
            pollingOptions: dataVote,
            pollDuration: Number(pollDuration.value),
          });
        }
      }
    }
  }, [
    active,
    // uri,
    // musicData,
    // updateOn,
    // uriVideo,
    // updateToUpload,
    // voteCompleted,
  ]);
};
