export type SearchProps = {
  keyword: string;
  filterBy?: string;
};
export type ListDataSearchFans = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrl: string;
};

export type ListSearchFansResponseType = {
  code: number;
  data: ListDataSearchFans[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchMusician = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrl: string;
  followers: number;
};

export type ListSearchMusicianResponseType = {
  code: number;
  data: ListDataSearchMusician[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchSongs = {
  id: number;
  musicianName: string;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: string;
  publishedDate: string;
  copyright: string;
  language: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type ListSearchSongsResponseType = {
  code: number;
  data: ListDataSearchSongs[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchAlbums = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  featuringArtist: string[];
  genre: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  language: string;
  label: string[];
  createdAt: string;
};

export type ListSearchAlbumsResponseType = {
  code: number;
  data: ListDataSearchAlbums[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchPlaylist = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  userUUID: string;
  likesCount: number;
  totalSongs: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type ListSearchPlaylistsResponseType = {
  code: number;
  data: ListDataSearchPlaylist[];
  message: string;
  meta: [];
  status: number;
};
