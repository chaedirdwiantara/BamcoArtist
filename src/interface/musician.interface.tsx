import {imageTypes, PaginationType} from './base.interface';

export type paramsTypeUuid = {
  uuid: string;
};

export type MusicianList = {
  email: string;
  followers: number;
  fullname: string;
  imageProfileUrls: imageTypes[];
  isFollowed: boolean;
  username: string;
  uuid: string;
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
  imageProfileUrls: imageTypes[];
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
  banners: imageTypes[];
  photos: imageTypes[];
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
  imageUrl: imageTypes[];
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
