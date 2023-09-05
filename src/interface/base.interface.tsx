export type PaginationType = {
  skip: number;
  limit: number;
  total: number;
};

export type ParamsProps = {
  skip?: number;
  limit?: number;
  total?: number;
  category?: string;
  sortBy?: string;
  filterBy?: string;
  fansUUID?: string;
  keyword?: string;
  page?: number;
  perPage?: number;
  musician_uuid?: string;
  uuid?: string;
  playlistID?: number;
  albumID?: number;
  id?: string | number;
  context?: string;
  listType?: string;
  isPremium?: boolean;
  mood?: string;
  genre?: string;
  uid?: string;
  interval?: string;
  order?: 'asc' | 'desc';
  songID?: string;
  genreID?: number[];
  myUUID?: string;
  pageSize?: number;
};

export type imageTypes = {
  image: string;
  presetName: string;
};

export type nameValue = {
  name: string;
  value: number | string;
  username: string;
  Name?: string;
  Value?: number | string;
};

export type BaseResponseApi = {
  code: number;
  message: string;
  status: number;
};

export type countryTypes = {
  id: number;
  name: string;
  image: string;
};

export type MusicianBaseData = {
  uuid: string;
  name: string;
  imageProfile: string;
};

export type MoodBaseData = {
  id: number;
  name: string;
};
