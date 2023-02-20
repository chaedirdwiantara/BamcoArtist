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
