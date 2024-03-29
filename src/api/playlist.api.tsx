import SsuAPI from './baseSemeru';
import {
  AddSongPropsType,
  PlaylistResponseTypeB,
  PlaylistPropsType,
  PlaylistPropsTypeA,
  PlaylistResponseType,
  PlaylistResponseTypeC,
  AddSongPropsTypeB,
  ListenerLogPropsType,
  ListenerLogResponseType,
} from '../interface/playlist.interface';
import {ParamsProps} from '../interface/base.interface';
import {ListSongResponseType} from '../interface/song.interface';

export const getListPlaylist = async (
  props?: ParamsProps,
): Promise<PlaylistResponseType> => {
  const {data} = await SsuAPI().request<PlaylistResponseType>({
    url: '/musician-app/playlists',
    method: 'GET',
    params: props,
  });

  return data;
};

export const detailPlaylist = async (
  props?: PlaylistPropsTypeA,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: `/musician-app/playlists/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const createPlaylist = async (
  props?: PlaylistPropsType,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: '/musician-app/playlists',
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
    url: `/musician-app/playlists/${params?.id}`,
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const deletePlaylist = async (
  params?: PlaylistPropsTypeA,
): Promise<PlaylistResponseTypeB> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeB>({
    url: `/musician-app/playlists/${params?.id}`,
    method: 'DELETE',
  });

  return data;
};

export const listSongs = async (
  params?: PlaylistPropsTypeA,
  props?: ParamsProps,
): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: `/musician-app/playlists/${params?.id}/songs`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const addSong = async (
  props?: AddSongPropsType,
): Promise<PlaylistResponseType> => {
  const {data} = await SsuAPI().request<PlaylistResponseType>({
    url: '/musician-app/playlists/add-song',
    method: 'POST',
    data: props,
  });

  return data;
};

export const removeSongFromPlaylist = async (
  props?: AddSongPropsType,
): Promise<PlaylistResponseTypeC> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeC>({
    url: '/musician-app/playlists/remove-song',
    method: 'POST',
    data: props,
  });

  return data;
};

export const addOtherPlaylist = async (
  props?: AddSongPropsTypeB,
): Promise<PlaylistResponseTypeC> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeC>({
    url: '/musician-app/playlists/add-to-my-playlist',
    method: 'POST',
    data: props,
  });

  return data;
};

export const removeOtherPlaylist = async (
  props?: AddSongPropsTypeB,
): Promise<PlaylistResponseTypeC> => {
  const {data} = await SsuAPI().request<PlaylistResponseTypeC>({
    url: '/musician-app/playlists/remove-from-my-playlist',
    method: 'DELETE',
    data: props,
  });

  return data;
};

export const listenerLogSong = async (
  props: ListenerLogPropsType,
): Promise<ListenerLogResponseType> => {
  const {data} = await SsuAPI().request<ListenerLogResponseType>({
    url: `/musician-app/songs/${props.songId}/listener-log`,
    method: 'POST',
    data: {
      startStreamAt: props.start,
      endStreamAt: props.end,
    },
  });

  return data;
};
