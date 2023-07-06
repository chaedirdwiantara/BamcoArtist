import {PaginationType, imageTypes} from './base.interface';
import {DataAlbum} from './song.interface';

export interface DataChart {
  value: number;
  hideDataPoint: boolean;
  label: String;
}
export interface Chart {
  maxValue: number;
  beFan: string;
  beFanCompare: string;
  beFanProgress: 'improve' | 'regression' | 'same';
  fansEarn: string;
  fansEarnCompare: string;
  fansEarnProgress: 'improve' | 'regression' | 'same';
  description: String;
  data: DataChart[];
}

export type ChartResponseType = {
  data: Chart;
  message: string;
  status: number;
};

export type EngagementData = {
  likesCount: number;
  commentsCount: number;
  shareCount: number;
  followers: number;
  percentage: number;
};

export type EngagementResponseType = {
  data: EngagementData;
  message: string;
  status: number;
};

export type TopFansAnalyticData = {
  uuid: string;
  fullname: string;
  image: imageTypes[];
  totalPoint: number;
  userType: string;
};

export type EngagementTopFansResponseType = {
  data: TopFansAnalyticData[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type DataGender = {
  label: string;
  percentage: number;
};

export type DemogDataGender = {
  totalFans: number;
  data: DataGender[];
};

export type DemogGenderResponseType = {
  data: DemogDataGender;
  message: string;
  status: number;
};

export type DataCountry = {
  country: {
    name: string;
    image: string;
  };
  total: number;
};

export type DemogCountryResponseType = {
  data: DataCountry[];
  message: string;
  status: number;
};

export type DataAge = {
  label: string;
  percentage: number;
  total: number;
};

export type DemogAgeResponseType = {
  data: DataAge[];
  message: string;
  status: number;
};

export type TopSongData = {
  id: number;
  musicianId: string;
  musicianName: string;
  albumId: number;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: imageTypes[];
  publishedDate: string;
  isPublished: true;
  isFeaturing: false;
  likesCount: number;
  shareCount: number;
  listenerCount: number;
  mood: string;
  genre: string;
  version: string;
  lyrics: string;
  copyright: string;
  originalSongUrl: string;
  transcodedSongUrl: string;
  drmFileUrl: string;
  drmKey: string;
  language: string;
  barcodeIsrc: string;
  songDuration: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  album: DataAlbum;
};

export type AlbumTopSongResponseType = {
  data: TopSongData[];
  message: string;
  status: number;
};
