import SsuAPI from './baseSemeru';
import {
  DetailSongResponseType,
  ListSongResponseType,
} from '../interface/song.interface';
import {PostPropsTypeA} from '../interface/feed.interface';

export const listSong = async (): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/songs',
    method: 'GET',
  });

  return data;
};

export const detailSong = async (
  props?: PostPropsTypeA,
): Promise<DetailSongResponseType> => {
  const {data} = await SsuAPI().request<DetailSongResponseType>({
    url: `/songs/${props?.id}`,
    method: 'GET',
  });

  return data;
};
