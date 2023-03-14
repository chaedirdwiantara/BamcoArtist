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
  isAddedToThisPlaylist: boolean;
  played: boolean;
  id: number;
  title: string;
  musicianId: string;
  musicianName: string;
  imageUrl?: imageTypes[];
  songDuration: number;
  lyrics: string;
  transcodedSongUrl: TranscodedSongType[];
  originalSongUrl: string;
  isLiked: boolean;
  album: {
    id: number;
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

export type FeaturingArtists = {
  Uuid: string;
  ImageURL: string;
  ArtistsName: string;
};

export type DataAlbum = {
  ID: number;
  MusicianID: string;
  Title: string;
  Description: string;
  ImageURL: string;
  FeaturingArtist: FeaturingArtists[];
  PublishedDate: string;
  IsPublished: boolean;
  Genre: string;
  Subgenre: string;
  LikesCount: number;
  ShareCount: number;
  Mood: string;
  CopyrightProducer: string[];
  CopyrightVisual: string[];
  CopyrightFans: string[];
  ProductionYear: string;
  Language: string;
  Label: string[];
  AlbumType: string;
  BarcodeUPC: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
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
  featuringArtists: FeaturingArtists[];
  album: SongAlbum;
};

export type DetailSongResponseType = {
  code: number;
  data: DataDetailSong;
  message: string;
  status: number;
};

export type Musician = {
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
  featuringArtist: FeaturingArtists[];
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
