import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CollectPhotosProps,
  CollectPhotosResponseType,
  CountLikedResponseType,
  ProfileFansResponseType,
  ProfileResponseType,
  UpdateProfileResponseType,
  CollectPhotoRemoveProps,
} from '../interface/profile.interface';
import SsuAPI from './baseMusician';
import SsuAPIPublicRinjani from './basePublic';
import BaseSemeruPublic from './baseSemeruPublic';
import {ParamsProps} from '../interface/base.interface';

export type UpdateProfilePropsType = {
  username?: string;
  fullname?: string;
  favoriteGeneres?: number[];
  moods?: number[];
  expectations?: number[];
  imageProfileUrl?: string;
  banner?: string;
  about?: string;
  bio?: string;
  labels?: string;
  originCountry?: string;
  originCity?: string;
  locationCountry?: string;
  locationCity?: string;
  members?: string[];
  Website?: string;
  yearsActiveFrom?: string;
  yearsActiveTo?: string;
  language?: string;
  socialMedia?: {name: string; value: string}[];
};

export const getProfile = async (): Promise<ProfileResponseType> => {
  const {data} = await SsuAPI().request<ProfileResponseType>({
    url: '/profile',
    method: 'GET',
  });

  return data;
};

export const getOtherUserProfile = async (
  props?: PostPropsTypeA,
): Promise<ProfileFansResponseType> => {
  const {data} = await SsuAPIPublicRinjani().request<ProfileFansResponseType>({
    url: `/fans/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const updateProfile = async (
  props?: UpdateProfilePropsType,
): Promise<UpdateProfileResponseType> => {
  const {data} = await SsuAPI().request<UpdateProfileResponseType>({
    url: '/profile/update',
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const addPhotos = async (
  props?: CollectPhotosProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/profile/collect-photos',
    method: 'POST',
    data: props,
  });

  return data;
};

export const removePhotos = async (
  props?: CollectPhotoRemoveProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/profile/collect-photos/delete',
    method: 'POST',
    data: props,
  });

  return data;
};

export const countLikedSong = async (
  props?: ParamsProps,
): Promise<CountLikedResponseType> => {
  const {data} = await BaseSemeruPublic().request<CountLikedResponseType>({
    url: `/fans/${props?.uuid}`,
    method: 'GET',
  });

  return data;
};

export const deleteProfile = async (
  props?: ParamsProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/profile',
    method: 'DELETE',
    data: props,
  });

  return data;
};
