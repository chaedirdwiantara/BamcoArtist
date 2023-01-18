import SsuAPI from './baseMusician';
import SsuAPISemeruPublic from './baseSemeruPublic';
import SsuPublicRinjani from './basePublic';
import {
  AlbumByIdResponseType,
  DetailMusicianResponseType,
  FollowMusicianPropsType,
  FollowMusicianResponseType,
  ListMusicianResponseType,
  paramsTypeUuid,
} from '../interface/musician.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';

export const listMusician = async (
  props?: ParamsProps,
): Promise<ListMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListMusicianResponseType>({
    url: '/musicians',
    method: 'GET',
    params: props,
  });

  return data;
};

export const detailMusician = async (
  props?: PostPropsTypeA,
): Promise<DetailMusicianResponseType> => {
  const {data} = await SsuPublicRinjani().request<DetailMusicianResponseType>({
    url: `/musicians/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const getAlbumById = async (
  props?: paramsTypeUuid,
): Promise<AlbumByIdResponseType> => {
  const {data} = await SsuAPISemeruPublic().request<AlbumByIdResponseType>({
    url: `/albums`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const followMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musicians/follow',
    method: 'POST',
    data: props,
  });

  return data;
};

export const unfollowMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musicians/unfollow',
    method: 'POST',
    data: props,
  });

  return data;
};
