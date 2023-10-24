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
  fromUserImage: string;
  id: string;
  ownerFullName: string;
  ownerId: string;
  ownerImage: string;
  ownerType: number;
  ownerUserName: string;
  package: string;
  updatedAt: Date | string;
  timeAgo: string;
  appreciate: number;
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

export interface SessionPurchaseProps {
  deviceId: string;
}

export interface SessionPurchaseResponseType extends BaseResponseApi {
  data: {
    Session: string;
  };
}

export interface CreateIapPropsType {
  owner: string;
  ownerType: number;
  trxReferenceId: string;
  credit: number;
  packageId: string;
  currency: string;
  packagePrice: number;
  trxStatus: number;
  deviceId: string;
  trxSession: string;
  packageName?: string;
  token?: string;
}

export interface CreateIapResponseType extends BaseResponseApi {
  data: {
    id: string;
    owner: string;
    ownerType: number;
    trxType: number;
    trxTypeString: string;
    trxMethod: number;
    trxMethodString: string;
    trxReferenceId: string;
    credit: number;
    creditAfterTrx: number;
    packageId: string;
    currency: string;
    packagePrice: number;
    trxStatus: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}

export type TransactionHistoryPropsType = {
  id: string;
  owner: string;
  ownerType: number;
  trxType: number;
  trxTypeString: string;
  trxMethod: number;
  trxMethodString: string;
  trxReferenceId: string;
  credit: number;
  creditAfterTrx: number;
  packageId: string;
  currency: string;
  packagePrice: number;
  trxStatus: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type GetTransactionHistoryResponseType = {
  code: number;
  data: TransactionHistoryPropsType[];
  message: string;
  meta: {
    Page: number;
    DataOffset: number;
    PerPage: number;
    TotalData: number;
    TotalPage: number;
  };
  status: number;
};

export type LiveTippingParams = {
  ownerId: string;
  ownerUserName: string;
  ownerFullName: string;
  eventId: string;
  counter: number;
  credit: number;
  ownerImage: string;
};
