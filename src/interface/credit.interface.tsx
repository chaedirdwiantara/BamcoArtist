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
