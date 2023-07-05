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
