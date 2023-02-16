import {nameValue} from './base.interface';

export type RegistrationType =
  | 'email'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'phoneNumber';

export type FavGenreType = {
  id: number;
  name: string;
};

export type MoodsType = {
  id: number;
  name: string;
};

export type ExpectationType = {
  id: number;
  name: string;
};

export type ListImageType = {
  image: string;
  presetName: string;
};

export type CollectPhotosProps = {
  photos: string[];
};

export type ListPhotosType = {
  images: ListImageType[];
};

export type CollectPhotosResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type ProfileResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string | null;
  banners: ListImageType[];
  photos: ListPhotosType[];
  imageProfileUrls: ListImageType[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: FavGenreType[];
  moods: MoodsType[];
  expectation: ExpectationType[];
  isValid: boolean;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  gender: string;
  followers: number;
  fans: number;
  bio: string | null;
  labels: string;
  originCountry: string;
  originCity: string;
  locationCountry: string;
  locationCity: string;
  yearsActiveFrom: string;
  website: string;
  yearsActiveTo: string;
  members: string[];
  socialMedia: null | nameValue[];
};

export type ProfileResponseType = {
  code: number;
  data: ProfileResponseData;
  message: string;
  status: number;
};

export type ProfileFansResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string | null;
  banners: ListImageType[];
  photos: ListPhotosType[];
  images: ListImageType[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: FavGenreType[];
  moods: MoodsType[];
  expectation: ExpectationType[];
  isValid: boolean;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  locationCountry: string;
  gender: string;
  followers: number;
  fans: number;
  bio: string | null;
  totalLiked: number;
  point: {
    daily: number;
    lasUpdated: string;
  };
};

export type ProfileFansResponseType = {
  code: number;
  data: ProfileFansResponseData;
  message: string;
  status: number;
};

export type UpdateProfileResponseType = {
  code: number;
  data: {
    id: number;
    uuid: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  status: number;
};

export type ApplyReferralResponseType = {
  code: number;
  data: null | {
    username: string;
    appliedAt: string;
  };
  message: string;
  status: number;
};

export type DataCountLiked = {
  uuid: string;
  countLikedSong: number;
};

export type CountLikedResponseType = {
  code: number;
  data: DataCountLiked;
  message: string;
  status: number;
};
