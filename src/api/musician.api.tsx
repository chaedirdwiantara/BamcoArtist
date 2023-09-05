import SsuAPI from './baseRinjani';
import SsuAPISemeruPublic from './baseSemeru';
import {
  AlbumByIdResponseType,
  AppearsOnResponseType,
  DetailMusicianLiteResponseType,
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
    url: '/musician-app/top-musician',
    method: 'GET',
    params: props,
  });

  return data;
};

export const detailMusician = async (
  props?: ParamsProps,
): Promise<DetailMusicianResponseType> => {
  const {data} = await SsuAPI().request<DetailMusicianResponseType>({
    url: `/musician-app/profile/find/${props?.id}`,
    method: 'GET',
    params: {myUUID: props?.myUUID},
  });

  return data;
};

export const getAlbumById = async (
  props?: paramsTypeUuid,
): Promise<AlbumByIdResponseType> => {
  const {data} = await SsuAPISemeruPublic().request<AlbumByIdResponseType>({
    url: '/albums',
    method: 'GET',
    params: props,
  });

  return data;
};

export const followMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musician-app/follow',
    method: 'POST',
    data: props,
  });

  return data;
};

export const unfollowMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musician-app/unfollow',
    method: 'POST',
    data: props,
  });

  return data;
};

export const listFollowing = async (
  props?: ParamsProps,
): Promise<ListMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListMusicianResponseType>({
    url: `/public/fans/${props?.uuid}/following`,
    method: 'GET',
  });

  return data;
};

export const recommendedMusician = async (
  props?: ParamsProps,
): Promise<ListMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListMusicianResponseType>({
    url: '/musicians/musician-recommendation',
    method: 'GET',
    params: props,
  });

  return data;
};

export const detailMusicianLite = async (
  props?: PostPropsTypeA,
): Promise<DetailMusicianLiteResponseType> => {
  const {data} = await SsuAPI().request<DetailMusicianLiteResponseType>({
    url: `/public/musicians/${props?.id}/detail`,
    method: 'GET',
  });

  return data;
};

export const getAppersOnAlbum = async (
  props?: paramsTypeUuid,
): Promise<AppearsOnResponseType> => {
  const {data} = await SsuAPISemeruPublic().request<AppearsOnResponseType>({
    url: `/albums/appears-on/${props?.uuid}`,
    method: 'GET',
  });

  return data;
};
