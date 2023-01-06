import {
  ListSearchAlbumsResponseType,
  ListSearchFansResponseType,
  ListSearchMusicianResponseType,
  ListSearchPlaylistsResponseType,
  ListSearchSongsResponseType,
  SearchProps,
} from '../interface/search.interface';
import SsuAPI from './basePublic';
import SsuAPISemeru from './baseSemeruPublic';

export const fansSearch = async (
  props?: SearchProps,
): Promise<ListSearchFansResponseType> => {
  const {data} = await SsuAPI().request<ListSearchFansResponseType>({
    url: '/fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const musicianSearch = async (
  props?: SearchProps,
): Promise<ListSearchMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListSearchMusicianResponseType>({
    url: '/musicians',
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
