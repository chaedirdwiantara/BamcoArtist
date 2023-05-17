import {imageTypes} from './base.interface';

export type SongPropsTypeA = {
  id: number;
};

export type PaginationType = {
  page: number;
  perPage: number;
  total: number;
};

export type SongList = {
  musicianUUID: string;
  isAddedToThisPlaylist: boolean;
  played: boolean;
  id: number;
  title: string;
  musicianId: string;
  musicianName: string;
  imageUrl: imageTypes[];
  songDuration: number;
  lyrics: string;
  transcodedSongUrl: TranscodedSongType[];
  originalSongUrl: string;
  isLiked: boolean;
  album: {
    id: number;
  };
  musician: {
    name: string;
  };
};

export type TranscodedSongType = {
  id: number;
  songId: number;
  encodedDashUrl: string;
  encodedHlsUrl: string;
  quality: number;
  presetName: 'highest' | 'high' | 'med' | 'low';
  encodeStatus: 'FINISHED' | 'ON_PROCESS';
};

export type ListSongResponseType = {
  code: number;
  data: SongList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type FeaturingArtist = {
  isDeletedUser: boolean;
  name: string;
  uuid: string;
  fullname: string;
  imageProfile: string;
};

export type DataAlbum = {
  songWriter: string[];
  id: number;
  musicianId: string;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: FeaturingArtist[];
  genre: FeaturingArtist;
  subgenre: FeaturingArtist;
  likesCount: number;
  shareCount: number;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  label: string[];
};

export type RelatedSongs = {
  id: number;
  musicianId: string;
  musicianName: string;
  albumId: number;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: string;
  publishedDate: string;
  isPublished: true;
  isFeaturing: false;
  likesCount: number;
  shareCount: number;
  listenerCount: number;
  mood: string;
  genre: string;
  version: string;
  lyrics: string;
  copyright: string;
  originalSongUrl: string;
  transcodedSongUrl: string;
  drmFileUrl: string;
  drmKey: string;
  language: string;
  barcodeIsrc: string;
  songDuration: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Album: DataAlbum;
};

export type Featuring = {
  uuid: string;
  fullname: string;
  imageProfile: imageTypes[];
};

export type SongAlbum = {
  musician: {
    uuid: string;
    name: string;
    imageProfile: string;
  };
  releaseDate: any;
  id: number;
  musicianId: string;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: Featuring[];
  genre: string;
  subgenre: string;
  likesCount: number;
  shareCount: number;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  label: string[];
  type?: string;
};

export type TranscodedSongUrl = {
  trackId: string;
  songId: number;
  sessionId: string;
  encodedDashUrl: string;
  encodedHlsUrl: string;
  quality: number;
  bitrate: string;
  presetName: string;
  encodeStatus: string;
};

export type DataDetailSong = {
  genre: {
    id: number;
    name: string;
  };
  featuring: any;
  id: number;
  musicianUUID: string;
  musicianName: string;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: imageTypes[];
  publishedDate: string;
  isPublish: boolean;
  likesCount: number;
  shareCount: number;
  listenerCount: number;
  version: string;
  lyrics: string;
  copyright: string;
  originalSongURL: string;
  language: string;
  barcodeISRC: string;
  CreatedAt: string;
  isAddedToThisPlaylist: boolean;
  transcodedSongUrl: TranscodedSongUrl[];
  featuringArtists: FeaturingArtist[];
  album: SongAlbum;
};

export type DetailSongResponseType = {
  code: number;
  data: DataDetailSong;
  message: string;
  status: number;
};

export type Musician = {
  imageProfile: string;
  uuid: string;
  name: string;
  image: string;
};

export type DataDetailAlbum = {
  id: number;
  musician: Musician;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: FeaturingArtist[];
  genre: string;
  subgenre: string;
  likesCount: number;
  shareCount: number;
  mood: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  releaseDate: string;
  publishedDate: string;
  isPublished: boolean;
  language: string;
  label: string[];
  barcodeUpc: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalCountListener: number;
  releaseDateScheduled: string;
};

export type DetailAlbumResponseType = {
  code: number;
  data: DataDetailAlbum;
  message: string;
  status: number;
};

export type LikeSongResponseType = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};
