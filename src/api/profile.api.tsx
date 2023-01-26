import {PostPropsTypeA} from '../interface/feed.interface';
import {
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
