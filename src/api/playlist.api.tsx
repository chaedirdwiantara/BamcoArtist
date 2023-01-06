import SsuAPI from './baseSemeru';
import {
  AddSongPropsType,
  PlaylistResponseTypeB,
  PlaylistPropsType,
  PlaylistPropsTypeA,
  PlaylistResponseType,
} from '../interface/playlist.interface';
import {ParamsProps} from '../interface/base.interface';
import {ListSongResponseType} from '../interface/song.interface';

export const getListPlaylist = async (
  props?: ParamsProps,
): Promise<PlaylistResponseType> => {
  const {data} = await SsuAPI().request<PlaylistResponseType>({
    url: '/playlists',
    method: 'GET',
    params: props,
  });

  return data;
};

export const detailPlaylist = async (
  props?: PlaylistPropsTypeA,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: `/playlists/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const createPlaylist = async (
  props?: PlaylistPropsType,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: '/playlists',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePlaylist = async (
  params?: PlaylistPropsTypeA,
  props?: PlaylistPropsType,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: `/playlists/${params?.id}`,
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const deletePlaylist = async (
  params?: PlaylistPropsTypeA,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: `/playlists/${params?.id}`,
    method: 'DELETE',
  });

  return data;
};

export const listSongs = async (
  params?: PlaylistPropsTypeA,
  props?: ParamsProps,
): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: `/playlists/${params?.id}/songs`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const addSong = async (
  props?: AddSongPropsType,
): Promise<PlaylistResponseType> => {
  const {data} = await SsuAPI().request<PlaylistResponseType>({
    url: '/playlists/add-song',
    method: 'POST',
    data: props,
  });

  return data;
};
