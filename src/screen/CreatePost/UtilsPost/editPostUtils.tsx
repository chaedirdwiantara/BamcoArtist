import {useEffect} from 'react';
import {PostList, VideoResponseType} from '../../../interface/feed.interface';
import {
  ListDataSearchSongs,
  Transcode,
} from '../../../interface/search.interface';
import {Image, Video} from 'react-native-image-crop-picker';
import {TFunction} from 'i18next';

export const editPostUtils = (
  dataUpdatePostProps: PostList | undefined,
  updateOn: boolean,
  setUpdateOn: (value: React.SetStateAction<boolean>) => void,
  setUserId: (value: React.SetStateAction<string>) => void,
  setLabel: (value: React.SetStateAction<string | undefined>) => void,
  setValueFilter: (value: React.SetStateAction<string | undefined>) => void,
  setInputText: (value: React.SetStateAction<string>) => void,
  setDataAudience: (value: React.SetStateAction<string>) => void,
  setMusicData: (
    value: React.SetStateAction<ListDataSearchSongs | undefined>,
  ) => void,
  setUriVideo: (value: VideoResponseType | Video | null) => void,
  setUri: (value: React.SetStateAction<Image[]>) => void,
  t: TFunction<'translation', undefined, 'translation'>,
) => {
  useEffect(() => {
    if (dataUpdatePostProps !== undefined && !updateOn) {
      setUpdateOn(true);
      setUserId(dataUpdatePostProps.id);
      setLabel(dataUpdatePostProps.category);
      setValueFilter(dataUpdatePostProps.category);
      setInputText(dataUpdatePostProps.caption);
      setDataAudience(
        (dataUpdatePostProps.isPremiumPost
          ? t('Feed.Exclusive')
          : t('Feed.Public')) || '',
      );
      if (dataUpdatePostProps.images.length !== 0) {
        let dataForSet = [];
        for (let i = 0; i < dataUpdatePostProps.images.length; i++) {
          dataForSet.push({
            path: dataUpdatePostProps.images[i][3]?.image,
            sourceURL: dataUpdatePostProps.images[i][3]?.image,
            mime: 'image/jpeg',
          });
        }
        //@ts-ignore
        setUri(dataForSet);
      }
      if (dataUpdatePostProps.quoteToPost.encodeHlsUrl !== null) {
        let transcode: Transcode = {
          trackId: dataUpdatePostProps.quoteToPost.targetId,
          songId: Number(dataUpdatePostProps.quoteToPost.targetId),
          sessionId: dataUpdatePostProps.quoteToPost.targetId,
          encodedDashUrl: dataUpdatePostProps.quoteToPost.encodeDashUrl,
          encodedHlsUrl: dataUpdatePostProps.quoteToPost.encodeHlsUrl,
          quality: 1,
          bitrate: '320k',
          presetName: 'high',
          encodeStatus: 'FINISHED',
        };
        let dataMusicProps: ListDataSearchSongs = {
          id: Number(dataUpdatePostProps.quoteToPost.targetId),
          musicianUUID: dataUpdatePostProps.musician.uuid,
          musicianName: dataUpdatePostProps.musician.fullname,
          title: dataUpdatePostProps.quoteToPost.title,
          imageUrl: dataUpdatePostProps.quoteToPost.coverImage,
          lyrics:
            dataUpdatePostProps.quoteToPost.lyrics !== undefined
              ? dataUpdatePostProps.quoteToPost.lyrics
              : '',
          originalSongUrl: dataUpdatePostProps.quoteToPost.originalSongUrl
            ? dataUpdatePostProps.quoteToPost.originalSongUrl
            : '',
          songDuration: 60,
          transcodedSongUrl: [transcode, transcode],
          musicianId: '',
          album: {id: -1},
        };
        setMusicData(dataMusicProps);
      }
      //* step to edit/update video
      if (dataUpdatePostProps.video.encodeHlsUrl.length > 0) {
        setUriVideo(dataUpdatePostProps.video);
      }
    }
  }, [dataUpdatePostProps, updateOn]);
};
