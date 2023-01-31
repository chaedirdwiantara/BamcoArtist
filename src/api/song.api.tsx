import SsuAPI from './baseSemeruMusician';
import {
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
