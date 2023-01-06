export type Playlist = {
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
};

export type PlaylistPropsTypeA = {
  id: number;
};

export type PlaylistPropsType = {
  name: string;
  description: string;
  thumbnailUrl: string;
  isPublic: boolean;
};

export type AddSongPropsType = {
  playlistId: number;
  songId: number;
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
