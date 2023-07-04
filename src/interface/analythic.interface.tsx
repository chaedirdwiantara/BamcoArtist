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

export interface IncomeDataChart {
  value: number;
  label?: String;
}

export interface IncomeData {
  join: IncomeDataJoin;
  subs: IncomeDataJoin;
  tips: IncomeDataJoin;
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
