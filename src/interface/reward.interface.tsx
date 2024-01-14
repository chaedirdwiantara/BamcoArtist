import {BaseResponseApi, imageTypes} from './base.interface';

export interface PaginationType {
  page: number;
  perPage: number;
}

export interface ItemMasterReward {
  endAt: string;
  freeCredit: number;
  id: number;
  image: string;
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

export interface ItemCreditRewardType {
  creditReward: number;
  userId: string;
}
export interface ProgressRewardResponseType {
  data: ItemCreditRewardType[];
  message: string;
  messageTitle: string;
  responseTime: string;
  success: boolean;
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
export interface GetMissionProgressParams {
  task_type?: TaskType;
  //   amount_to_claim?: number;
  //   max_claim?: number;
  function: string;
  campaignId: number;
}

export type RewardListFunction =
  | 'complete-profile'
  | 'daily-sign-in'
  | 'refer-artist'
  | 'share-social-media'
  | 'post-public-text'
  | 'post-public-photo'
  | 'post-public-video'
  | 'post-exclusive-content'
  | 'get-followers'
  | 'get-fans'
  | 'get-subscriber'
  | 'upload-song'
  | 'perform-event'
  | 'get-tip-credits';

export type TaskType = 'daily' | 'based-reward' | 'one-time';

export interface DataMissionMaster {
  id: number;
  function: RewardListFunction;
  userType: 'Musician' | 'Fans';
  rewards: number;
  isInfinity: boolean;
  amountToClaim: number;
  taskName: string;
  taskImage: string;
  taskStartAt: string;
  taskEndAt: string;
  taskType: TaskType;
  amountType: number;
  maxClaim: number;
  campaignId: number;
  postfix: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for mission details
export interface GetMissionMaster extends BaseResponseApi {
  data: DataMissionMaster[];
}

export interface DataListMissioProgress {
  function: RewardListFunction;
  userType: 'Musician' | 'Fans';
  userUUID: string;
  sumLoyaltyPoints: number;
  rowCount: number;
  isClaimed: boolean;
  isClaimable: boolean;
}

export interface GetMissionProgress extends BaseResponseApi {
  data: DataListMissioProgress;
}

export interface SetClaimMission extends BaseResponseApi {
  data: null;
}

export interface DataMissionStoreProps {
  id: number;
  typeOnIndex: number;
  isClaimable: boolean;
}

export interface DataBenefitProps {
  id: number;
  title: string;
  imageUrl: imageTypes[];
  type: string;
  tier: {
    value: number;
    name: string;
  };
}
export interface GetBenefits extends BaseResponseApi {
  data: DataBenefitProps[];
}

export interface DataDetailBenefitProps {
  id: number;
  title: string;
  description: string;
  tnc: {
    title: string;
    value: string[];
  };
  imageUrl: imageTypes[];
  type: string;
  tier: {
    value: number;
    name: string;
  };
}
export interface DetailBenefitsResponse extends BaseResponseApi {
  data: DataDetailBenefitProps;
}
