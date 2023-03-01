export type Playlist = {
  isDefaultPlaylist: boolean;
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  isPublic: boolean;
  totalSong: number;
  ordering: number;
  playlistOwner: {
    UUID: string;
    fullname: string;
    image: string | null;
    username: string;
  };
};

export type PlaylistPropsTypeA = {
  id: number;
};

export type PlaylistPropsType = {
  name: string;
  description: string;
  thumbnailUrl: string;
  isPublic: boolean | string;
};

export type AddSongPropsType = {
  playlistId: number;
  songId: number;
};

export type AddSongPropsTypeB = {
  playlistReferenceId: number;
};

export type PlaylistResponseType = {
  code: number;
  data: Playlist[];
  message: string;
  status: number;
};

export type PlaylistResponseTypeB = {
  code: number;
  data: Playlist;
  message: string;
  status: number;
};

export type PlaylistResponseTypeC = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};

export type ListenerLogPropsType = {
  songId: number;
  start: string;
  end: string;
};

export type ListenerLogResponseType = {
  code: number;
  data: null;
  message: string;
  status: number;
};
