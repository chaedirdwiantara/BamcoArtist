import {PaginationType} from './base.interface';

export type SongList = {
  played: boolean;
  id: number;
  title: string;
  musicianId: string;
  musicianName: string;
  imageUrl: string | null;
  songDuration: number;
  lyrics: string;
  transcodedSongUrl: string;
};

export type ListSongResponseType = {
  code: number;
  data: SongList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type FeaturingArtist = {
  ImageURL: string;
  ArtistsName: string;
};

export type DataAlbum = {
  ID: number;
  MusicianID: string;
  Title: string;
  Description: string;
  ImageURL: string;
  FeaturingArtist: FeaturingArtist[];
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

export type DataDetailSong = {
  id: number;
  musicianId: string;
  musicianName: string;
  albumId: number;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: string;
  publishedDate: string;
  isPublished: boolean;
  isFeaturing: boolean;
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
  relatedSong: RelatedSongs[];
};

export type DetailSongResponseType = {
  code: number;
  data: DataDetailSong;
  message: string;
  status: number;
};
