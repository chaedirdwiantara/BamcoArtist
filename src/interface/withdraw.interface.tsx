export type BankAccountPropsType = {
  id?: number;
  countWithdraw?: number;
  bankId?: number;
  previousBankId?: number;
  userId: string;
  country: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  bankAddress: string;
  accountHolder: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  attachment: string;
};

export type VerifyBankPropsType = {
  id: number;
  isActive: boolean;
  code: string;
  previousBank: number;
};

export type VerifyWithdrawPropsType = {
  id: number;
  code: string;
};

export type WithdrawRequestPropsType = {
  userId: string;
  bankId: number;
  creditAmount: number;
};

export type RemoveBankAccountResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type GetUserBankResponseType = {
  code: number;
  data: BankAccountPropsType;
  message: string;
  status: number;
};

export type ListWithdrawPropsType = {
  amount: number;
  amountConversion: string;
  toBankNumber: string;
  requestDate: string;
  status: string;
  notes: string;
  isOpen?: boolean;
};

export type GetListWithdrawResponseType = {
  code: number;
  data: ListWithdrawPropsType[];
  message: string;
  status: number;
};
