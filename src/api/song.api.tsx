import SsuAPI from './baseSemeruMusician';
import {
  DetailAlbumResponseType,
  DetailSongResponseType,
  ListSongResponseType,
} from '../interface/song.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';

export const listSong = async (
  props?: ParamsProps,
): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/songs',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopSong = async (): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/songs/top',
    method: 'GET',
  });

  return data;
};

export const detailSong = async (
  props?: PostPropsTypeA,
): Promise<DetailSongResponseType> => {
  const {data} = await SsuAPI().request<DetailSongResponseType>({
    url: `/songs/detail/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const detailAlbum = async (
  props?: PostPropsTypeA,
): Promise<DetailAlbumResponseType> => {
  const {data} = await SsuAPI().request<DetailAlbumResponseType>({
    url: `/albums/detail/${props?.id}`,
    method: 'GET',
  });

  return data;
};
