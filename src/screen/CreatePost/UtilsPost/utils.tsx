import {ListDataSearchSongs} from '../../../interface/search.interface';

export const convertCategoryValue = (input: string): string => {
  switch (input) {
    case 'coming_up':
      return 'Home.Tab.TopPost.Category.ComingUp';
    case 'otr':
      return 'Home.Tab.TopPost.Category.Tour';
    case 'day_in_life':
      return 'Home.Tab.TopPost.Category.DailyLife';
    case 'behind_the_scene':
      return 'Home.Tab.TopPost.Category.BTS';
    case 'highlight':
      return 'Home.Tab.TopPost.Category.Highlight';
    case 'backstage':
      return 'Home.Tab.TopPost.Category.Backstage';
    default:
      return input;
  }
};

export const createAddMusicObject = (
  dataMusic: (ListDataSearchSongs | undefined)[],
) => {
  const {transcodedSongUrl} = dataMusic[0] || {};

  const {
    songId = 1,
    encodedDashUrl = '',
    encodedHlsUrl = '',
    quality = 1,
    presetName = 'low',
    encodeStatus = 'ON_PROCESS',
  } = transcodedSongUrl ? transcodedSongUrl[1] : {};

  const transcode = {
    id: songId,
    songId,
    encodedDashUrl,
    encodedHlsUrl,
    quality,
    presetName,
    encodeStatus,
  };

  const songData = dataMusic[0];

  const {
    id: songIdValue = 1,
    title = '',
    musicianUUID = '',
    musicianName = '',
    imageUrl = [],
    songDuration = 60,
    lyrics = '',
    originalSongUrl = '',
    isLiked = false,
    publishedDate = '',
    likesCount = 0,
    shareCount = 0,
    listenerCount = 0,
  } = songData || {};

  const addMusic = {
    isAddedToThisPlaylist: true,
    played: true,
    id: songIdValue,
    title,
    musicianId: musicianUUID,
    musicianName,
    imageUrl,
    songDuration,
    lyrics,
    transcodedSongUrl: [transcode, transcode],
    originalSongUrl,
    isLiked,
    album: {id: -1},
    musician: {name: musicianName},
    musicianUUID,
    publishedDate,
    likesCount,
    shareCount,
    listenerCount,
  };

  return addMusic;
};
