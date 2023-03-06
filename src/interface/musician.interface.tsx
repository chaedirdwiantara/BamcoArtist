import {imageTypes, PaginationType} from './base.interface';

export type paramsTypeUuid = {
  uuid: string;
};

export type MusicianList = {
  point?: number;
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

export type ListImageType = {
  image: string;
  presetName: string;
};

export type ListPhotosType = {
  images: ListImageType[];
};

export type photos = {
  path: string | undefined;
  createdAt: string;
  images: imageTypes[];
};

export type FavoriteGenresType = {
  id: number;
  name: string;
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
  fans: number;
  totalRelease: number;
  totalPlaylist: number;
  rank: number;
  createdAt: string;
  updatedAt: string;
  isFollowed: boolean;
  banners: imageTypes[];
  photos: photos[];
  albums: [];
  merchs: [];
  favoriteGenres: FavoriteGenresType[];
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
