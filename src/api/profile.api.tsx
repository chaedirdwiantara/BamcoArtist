import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CollectPhotosProps,
  CollectPhotosResponseType,
  CountLikedResponseType,
  ProfileFansResponseType,
  ProfileResponseType,
  UpdateProfileResponseType,
  CollectPhotoRemoveProps,
  ProfileCountResponseType,
  SetLastStepResponseType,
  LastStepResponseType,
  GetLastStepResponseType,
  GetProfileProgressResponseType,
  GetTotalPostAndFansResponseType,
} from '../interface/profile.interface';
import SsuAPI from './baseRinjani';
import SsuAPISemeru from './baseSemeru';
import {ParamsProps} from '../interface/base.interface';

export type UpdateProfilePropsType = {
  username?: string;
  fullname?: string;
  favoriteGeneres?: number[];
  genres?: number[];
  moods?: number[];
  expectations?: number[];
  rolesInIndustry?: number[];
  imageProfileUrl?: string;
  banner?: string;
  about?: string;
  bio?: string;
  labels?: string;
  originCountry?: string;
  originCity?: string;
  locationCountry?: number;
  locationCity?: string;
  members?: string[];
  Website?: string;
  yearsActiveFrom?: string;
  yearsActiveTo?: string;
  language?: string;
  socialMedia?: {name: string; value: string}[];
  gender?: string;
  birthdate?: string;
};

export const getProfile = async (): Promise<ProfileResponseType> => {
  const {data} = await SsuAPI().request<ProfileResponseType>({
    url: '/musician-app/profile',
    method: 'GET',
  });

  return data;
};

export const getOtherUserProfile = async (
  props?: ParamsProps,
): Promise<ProfileFansResponseType> => {
  const {data} = await SsuAPI().request<ProfileFansResponseType>({
    url: `/public/fans/${props?.id}`,
    method: 'GET',
    params: {myUUID: props?.myUUID},
  });

  return data;
};

export const updateProfile = async (
  props?: UpdateProfilePropsType,
): Promise<UpdateProfileResponseType> => {
  const {data} = await SsuAPI().request<UpdateProfileResponseType>({
    url: '/musician-app/profile/update',
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const addPhotos = async (
  props?: CollectPhotosProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/musician-app/profile/collect-photos',
    method: 'POST',
    data: props,
  });

  return data;
};

export const removePhotos = async (
  props?: CollectPhotoRemoveProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/musician-app/profile/collect-photos/delete',
    method: 'POST',
    data: props,
  });

  return data;
};

export const countLikedSong = async (
  props?: ParamsProps,
): Promise<CountLikedResponseType> => {
  const {data} = await SsuAPISemeru().request<CountLikedResponseType>({
    url: `/fans/${props?.uuid}`,
    method: 'GET',
  });

  return data;
};

export const deleteProfile = async (
  props?: ParamsProps,
): Promise<CollectPhotosResponseType> => {
  const {data} = await SsuAPI().request<CollectPhotosResponseType>({
    url: '/musician-app/profile',
    method: 'DELETE',
    data: props,
  });

  return data;
};

export const getTotalCount = async (
  props?: ParamsProps,
): Promise<ProfileCountResponseType> => {
  const {data} = await SsuAPISemeru().request<ProfileCountResponseType>({
    url: '/musician-app/profile',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getProfileCompletion =
  async (): Promise<GetProfileProgressResponseType> => {
    const {data} = await SsuAPI().request<GetProfileProgressResponseType>({
      url: '/musician-app/profile-completion',
      method: 'GET',
    });

    return data;
  };

export const getLastStep = async (): Promise<GetLastStepResponseType> => {
  const {data} = await SsuAPI().request<GetLastStepResponseType>({
    url: '/musician-app/last-step-registration',
    method: 'GET',
  });

  return data;
};

export const setLastStep = async (
  props: LastStepResponseType,
): Promise<SetLastStepResponseType> => {
  const {data} = await SsuAPI().request<SetLastStepResponseType>({
    url: '/musician-app/last-step-registration',
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const getPostAndFans =
  async (): Promise<GetTotalPostAndFansResponseType> => {
    const {data} = await SsuAPI().request<GetTotalPostAndFansResponseType>({
      url: '/musician-app/overview/my-post-and-fans',
      method: 'GET',
    });

    return data;
  };
