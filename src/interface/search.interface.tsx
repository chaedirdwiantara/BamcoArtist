import {imageTypes} from './base.interface';

export type SearchProps = {
  keyword?: string;
  filterBy?: string;
  uuid?: string;
  page?: number;
};
export type ListDataSearchFans = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followersType: 'fans' | 'musician';
};

export type FollowersProps = {
  keyword?: string;
  uuid: string;
};

export type ListSearchFansResponseType = {
  code: number;
  data: ListDataSearchFans[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchMusician = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followers: number;
};

export type ListSearchMusicianResponseType = {
  code: number;
  data: ListDataSearchMusician[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchSongsNavigate = {
  id?: number;
  musicianName?: string;
  title?: string;
  description?: string;
  songWriter?: string[];
  imageUrl?: string;
  publishedDate?: string;
  copyright?: string;
  language?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  transcodedSongUrl: [
    {
      trackId: string;
      songId: number;
      sessionId: string;
      encodedDashUrl: string;
      encodedHlsUrl: string;
      quality: number;
      bitrate: string;
      presetName: string;
      encodeStatus: string;
    },
  ];
};

export type Transcode = {
  trackId: string;
  songId: number;
  sessionId: string;
  encodedDashUrl: string;
  encodedHlsUrl: string;
  quality: number;
  bitrate: string;
  presetName: 'highest' | 'high' | 'med' | 'low';
  encodeStatus: 'FINISHED' | 'ON_PROCESS';
};

export type ListDataSearchSongs = {
  id: number;
  musicianUUID: string;
  musicianName: string;
  title: string;
  description?: string;
  songWriter?: string[];
  imageUrl: imageTypes[];
  publishedDate?: string;
  likesCount?: 0;
  shareCount?: 0;
  listenerCount?: 0;
  lyrics: string;
  originalSongUrl: string;
  isAddedToThisPlaylist?: boolean;
  copyright?: string;
  language?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  songDuration: number;
  transcodedSongUrl: Transcode[];
  isLiked?: boolean;
};

export type ListSearchSongsResponseType = {
  code: number;
  data: ListDataSearchSongs[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchAlbums = {
  id: number;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: string[];
  genre: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  language: string;
  label: string[];
  createdAt: string;
  name?: string;
};

export type ListSearchAlbumsResponseType = {
  code: number;
  data: ListDataSearchAlbums[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchPlaylist = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  userUUID: string;
  likesCount: number;
  totalSongs: number;
  CreatedAt: string;
  UpdatedAt: string;
  playlistOwner: {
    UUID: string;
    fullname: string;
    image: string | null;
    username: string;
  };
};

export type ListSearchPlaylistsResponseType = {
  code: number;
  data: ListDataSearchPlaylist[];
  message: string;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  status: number;
};

export interface KeywordProps {
  keyword: string;
}
