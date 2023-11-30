export interface PaginationType {
  page: number;
  perPage: number;
}

export interface ItemMasterReward {
  endAt: string;
  freeCredit: number;
  id: number;
  imageUrl: string[];
  quota: number;
  rewardTotal: number;
  startAt: string;
  termsCondition: {
    title: string;
    value: string[] | null;
  };
  title: string;
  userType: string;
}

export interface MasterRewardResponseType {
  code: number;
  data: ItemMasterReward[];
  message: string;
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalAll: number;
  };
  status: number;
}

export interface ProgressRewardRequestType {
  uuid: string;
  tran_type: number;
}

export type RedeemVoucherPropsType = {
  userId: string;
  credit: number;
};

export type RedeemVoucherResponseType = {
  success: boolean;
  messageTitle: string;
  message: string;
  responseTime: string;
  data: null;
};
