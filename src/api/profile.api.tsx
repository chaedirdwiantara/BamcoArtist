import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CollectPhotosProps,
  CollectPhotosResponseType,
  ProfileResponseType,
  UpdateProfileResponseType,
} from '../interface/profile.interface';
import SsuAPI from './baseMusician';
import SsuAPIPublicRinjani from './basePublic';

export type UpdateProfilePropsType = {
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
): Promise<ProfileResponseType> => {
  const {data} = await SsuAPIPublicRinjani().request<ProfileResponseType>({
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
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const removePhotos = async (
  props?: CollectPhotosProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/profile/collect-photos/delete',
    method: 'PATCH',
    data: props,
  });

  return data;
};
