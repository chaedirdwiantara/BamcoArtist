import {
  ProfileResponseType,
  UpdateProfileResponseType,
} from '../interface/profile.interface';
import SsuAPI from './base';

export type UpdateProfilePropsType = {
  fullname?: string;
  favoriteGeneres?: number[];
  moods?: number[];
  expectations?: number[];
  imageProfileUrl?: string;
  banner?: string;
  about?: string;
};

export const getProfile = async (): Promise<ProfileResponseType> => {
  const {data} = await SsuAPI().request<ProfileResponseType>({
    url: '/profile',
    method: 'GET',
  });

  return data;
};

export const updateProfile = async (
  props?: UpdateProfilePropsType,
): Promise<UpdateProfileResponseType> => {
  const {data} = await SsuAPI().request<UpdateProfileResponseType>({
    url: '/update-profile',
    method: 'PATCH',
    data: props,
  });

  return data;
};
