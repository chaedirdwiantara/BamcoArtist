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
  data: DataChart[] | undefined;
}
