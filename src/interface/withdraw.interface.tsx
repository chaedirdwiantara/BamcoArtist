export type BankAccountPropsType = {
  id?: string;
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

export type AddBankAccountResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};
