import {
  MoodBaseData,
  MusicianBaseData,
  PaginationType,
  countryTypes,
  imageTypes,
} from './base.interface';
import {DataAlbum, FeaturingArtist} from './song.interface';

export interface DataChart {
  value: number;
  hideDataPoint: boolean;
  label: string;
}
export interface Chart {
  maxValue: number;
  beFan: number;
  beFanCompare: string;
  beFanProgress: 'improve' | 'regression' | 'same';
  fansEarn: string;
  fansEarnCompare: string;
  fansEarnProgress: 'improve' | 'regression' | 'same';
  description: string;
  data: DataChart[];
}

export type ChartResponseType = {
  data: Chart;
  message: string;
  status: number;
};

export interface SongChart {
  maxValue: number;
  description: string;
  fansStream: string;
  fansStreamCompared: string;
  fansStreamProgress: 'improve' | 'regression' | 'same';
  fansAvgStream: number;
  fansAvgStreamCompared: string;
  fansAvgStreamPogress: 'improve' | 'regression' | 'same';
  diagramData: DataChart[];
}

export type SongChartResponseType = {
  data: SongChart;
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
  userType: 'fans' | 'musician';
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
  meta: PaginationType;
  status: number;
};
export interface IncomeDataChart {
  value: number;
  label?: String;
}

export interface IncomeData {
  join: IncomeDataJoin;
  subs: IncomeDataJoin;
  tips: IncomeDataJoin;
  totalSubs: number;
  totalTips: number;
}

export interface TotalIncome {
  totalIncome: number;
}

export interface IncomeDataJoin {
  description: string;
  maxValue: number;
  tipAvg?: string;
  tipAvgCompare?: 'improve' | 'regression' | 'same';
  tipAvgProgress?: string;
  tipEarned?: string;
  tipEarnedCompare?: 'improve' | 'regression' | 'same';
  tipEarnedProgress?: string;
  subsAvg?: string;
  subsAvgCompare?: 'improve' | 'regression' | 'same';
  subsAvgProgress?: string;
  subsEarned?: string;
  subsEarnedCompare?: 'improve' | 'regression' | 'same';
  subsEarnedProgress?: string;
  data: IncomeDataChart[];
}

export type ListIncomeResponseType = {
  code: number;
  data: IncomeData;
  message: string;
  meta: number;
  status: number;
};

export type ListenerLikesData = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followers: number;
  isFollowed: boolean;
};

export type ListenerLikesResponseType = {
  code: number;
  data: ListenerLikesData[];
  message: string;
  status: number;
};

export type ListenerCountryData = {
  country: countryTypes;
  totalStream: number;
};

export type ListenerCountryResponseType = {
  code: number;
  data: ListenerCountryData[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type PopularAlbumData = {
  id: number;
  title: string;
  albumType: string;
  albumImage: imageTypes[];
  productionYear: string;
  totalCountListener: number;
};

export type PopularAlbumResponseType = {
  code: number;
  data: PopularAlbumData;
  message: string;
  status: number;
};

export type ListAlbumData = {
  id: number;
  musician: MusicianBaseData;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: string[];
  genre: {
    id: number;
    name: string;
  };
  subgenre: string;
  likesCount: number;
  shareCount: number;
  mood: MoodBaseData[];
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  albumType: string;
  releaseDate: string;
  isScheduleReleased: boolean;
  releaseDateScheduled: string;
  publishedDate: string;
  isPublished: boolean;
  language: string;
  label: string[];
  barcodeUpc: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalCountListener: number;
};

export type ListAlbumResponseType = {
  code: number;
  data: ListAlbumData[];
  message: string;
  status: number;
};

export type LogData = {
  total: number;
};

export type SendLogResponseType = {
  data: LogData;
  message: string;
  status: number;
};
