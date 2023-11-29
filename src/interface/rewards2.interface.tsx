export type RedeemVoucherPropsType = {
  userId: string;
  credit: number;
};

export type ProgressRewardsPropsType = {
  uuid: string;
  tran_type: 7; // 6 = mission | 7 = reward
};

export type RedeemVoucherResponseType = {
  success: boolean;
  messageTitle: string;
  message: string;
  responseTime: string;
  data: null;
};

export type ProgressRewardsResponseType = {
  success: boolean;
  messageTitle: string;
  message: string;
  responseTime: string;
  data: {
    userID: string;
    creditReward: number;
  }[];
};

export type DetailVoucherRewardsPropsType = {
  id: number;
  title: string;
  userType: string;
  rewardTotal: number;
  freeCredit: number;
  imageUrl: {
    image: string;
    presetName: string;
  }[];
  startAt: string;
  endAt: string;
  quota: number;
  termsCondition: {
    title: string;
    value: string[];
  };
};
