import SsuAPI from './baseSemeru';
import {
  DetailAlbumResponseType,
  DetailSongResponseType,
  LikeSongResponseType,
  ListSongComingSoonResponseType,
  ListSongResponseType,
  SongPropsTypeA,
} from '../interface/song.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';

export const listSong = async (
  props?: ParamsProps,
): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/musician-app/songs',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopSong = async (): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/musician-app/songs/top',
    method: 'GET',
  });

  return data;
};

export const detailSong = async (
  props?: SongPropsTypeA,
): Promise<DetailSongResponseType> => {
  const {data} = await SsuAPI().request<DetailSongResponseType>({
    url: `/musician-app/songs/detail/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const detailAlbum = async (
  props?: PostPropsTypeA,
): Promise<DetailAlbumResponseType> => {
  const {data} = await SsuAPI().request<DetailAlbumResponseType>({
    url: `/musician-app/albums/detail/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const likeSong = async (
  props?: SongPropsTypeA,
): Promise<LikeSongResponseType> => {
  const {data} = await SsuAPI().request<LikeSongResponseType>({
    url: `/musician-app/songs/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikeSong = async (
  props?: SongPropsTypeA,
): Promise<LikeSongResponseType> => {
  const {data} = await SsuAPI().request<LikeSongResponseType>({
    url: `/musician-app/songs/${props?.id}/unlike`,
    method: 'POST',
  });

  return data;
};

export const newSong = async (): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/musician-app/songs/new-released',
    method: 'GET',
  });

  return data;
};

export const listSongComingSoon = async (
  props?: SongPropsTypeA,
): Promise<ListSongComingSoonResponseType> => {
  const {data} = await SsuAPI().request<ListSongComingSoonResponseType>({
    url: `/songs/coming-soon-by-album/${props?.id}`,
    method: 'GET',
  });

  return data;
};