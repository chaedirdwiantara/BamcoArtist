import {
  FollowersProps,
  ListFansResponseType,
  ListSearchAlbumsResponseType,
  ListSearchFansResponseType,
  ListSearchMusicianResponseType,
  ListSearchPlaylistsResponseType,
  ListSearchSongsResponseType,
  SearchProps,
} from '../interface/search.interface';
import SsuAPI from './baseRinjani';
import SsuAPISemeru from './baseSemeru';

export const fansSearch = async (
  props?: SearchProps,
): Promise<ListSearchFansResponseType> => {
  const {data} = await SsuAPI().request<ListSearchFansResponseType>({
    url: '/public/fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const musicianSearch = async (
  props?: SearchProps,
): Promise<ListSearchMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListSearchMusicianResponseType>({
    url: '/public/musicians',
    method: 'GET',
    params: props,
  });

  return data;
};

export const songSearch = async (
  props?: SearchProps,
): Promise<ListSearchSongsResponseType> => {
  const {data} = await SsuAPISemeru().request<ListSearchSongsResponseType>({
    url: '/songs',
    method: 'GET',
    params: props,
  });

  return data;
};

export const albumSearch = async (
  props?: SearchProps,
): Promise<ListSearchAlbumsResponseType> => {
  const {data} = await SsuAPISemeru().request<ListSearchAlbumsResponseType>({
    url: '/albums',
    method: 'GET',
    params: props,
  });

  return data;
};

export const playlistSearch = async (
  props?: SearchProps,
): Promise<ListSearchPlaylistsResponseType> => {
  const {data} = await SsuAPISemeru().request<ListSearchPlaylistsResponseType>({
    url: '/playlists',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listFollowers = async (
  props: FollowersProps,
): Promise<ListSearchFansResponseType> => {
  const {data} = await SsuAPI().request<ListSearchFansResponseType>({
    url: `/public/musicians/${props.uuid}/followers`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const listFanss = async (
  props: FollowersProps,
): Promise<ListFansResponseType> => {
  const {data} = await SsuAPI().request<ListFansResponseType>({
    url: `/public/list-fans-musician/${props.uuid}`,
    method: 'GET',
  });

  return data;
};
