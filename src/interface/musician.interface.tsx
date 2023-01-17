import {PaginationType} from './base.interface';

export type paramsTypeUuid = {
  uuid: string;
};

export type MusicianList = {
  point: number;
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  isFollowed: boolean;
  imageProfileUrl: string | null;
  followers: number;
};

export type ListMusicianResponseType = {
  code: number;
  data: MusicianList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type DataDetailMusician = {
  uuid: string;
  username: string;
  fullname: string;
  imageProfileUrl: string;
  email: string;
  registrationType: string;
  phoneNumber: number;
  genre: string[];
  labels: string;
  bio: string;
  about: string;
  members: string[];
  website: string;
  originCountry: string;
  originCity: string;
  locationCountry: string;
  locationCity: string;
  yearsActiveFrom: string;
  yearsActiveTo: string;
  socialMedia: [];
  followers: number;
  createdAt: string;
  updatedAt: string;
  isFollowed: boolean;
  banner: string;
  photos: string[];
  albums: [];
  merchs: [];
};

export type DetailMusicianResponseType = {
  code: number;
  data: DataDetailMusician;
  message: string;
  status: number;
};

export type FollowMusicianResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type FollowMusicianPropsType = {
  musicianID: string;
};

export type AlbumData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  featuringArtist: string[];
  genre: string;
  subgenre: string;
  likesCount: number;
  shareCount: number;
  mood: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  isPublished: boolean;
  language: string;
  label: string[];
  barcodeUpc: string;
  createdAt: string;
  updatedAt: string;
};

export type AlbumByIdResponseType = {
  code: number;
  data: AlbumData[];
  message: string;
  meta: PaginationType;
  status: number;
};
