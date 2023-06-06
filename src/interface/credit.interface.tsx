import {BaseResponseApi, imageTypes} from './base.interface';

export type CreditResponseType = {
  code: number;
  data: {
    id: string;
    owner: string;
    ownerType: number;
    credit: number;
    lastCreditTrx: number;
    lastCreditDirection: string;
    lastCreditActivity: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  message: string;
  meta: number;
  status: number;
};

export type CreateDonationParams = {
  ownerId: string;
  ownerUserName: string;
  ownerFullName: string;
  package: string;
  duration: number;
  contributionRepeat: number;
  credit: number;
};

export type SubsPlan = {
  ID: string;
  title: string;
  coverImage: string;
  description: string;
  packageType: string;
  pricingPlans: PricingSubsPlan[];
  createdAt: string;
  updatedAt: string;
};

export type PricingSubsPlan = {
  ID: string;
  durationInDays: number;
  durationUnit: string;
  price: number;
};

export type SubsECParams = {
  musicianUUID: string;
  packageID: string;
  packagePlanID: string;
};

export type SubsDataType = {
  ID: string;
  status: string;
  nextPaymentDate: string;
  price: string;
  duration: string;
  musician: {
    uuid: string;
    username: string;
    fullname: string;
    imageProfileUrls: imageTypes[];
  };
};

export type TipsDataType = {
  contributionEndAt: Date | string;
  contributionRepeat: number;
  contributionRepeatStatus: number;
  contributionRepeatString: string;
  contributionType: number;
  contributionTypeString: string;
  createdAt: Date | string;
  credit: number;
  deletedAt: Date | string;
  duration: number;
  fromFullName: string;
  fromId: string;
  fromType: number;
  fromUserName: string;
  id: string;
  ownerFullName: string;
  ownerId: string;
  ownerImage: string;
  ownerType: number;
  ownerUserName: string;
  package: string;
  updatedAt: Date | string;
};

export interface ListTipsDataType extends BaseResponseApi {
  data: TipsDataType[];
}

export interface ListSubsDataType extends BaseResponseApi {
  data: SubsDataType[];
}

export interface UnsubsResponseType extends BaseResponseApi {
  data: null;
}

export interface StopTippingResponseType extends BaseResponseApi {
  data: TipsDataType;
}
