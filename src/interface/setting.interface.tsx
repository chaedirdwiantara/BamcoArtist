export type EmailPhoneProps = {
  email?: string;
  phoneNumber?: string;
  code: string;
};

export type EmailPhoneVerifProps = {
  email?: string;
  phoneNumber?: string;
};

export type VerifPasswordPhone = {
  phoneNumber: string;
  password: string;
};

export type OtpPhoneScreen = {
  phoneNumber: string;
  countryNumber: string | null;
  type: PhoneSettingTypeProps;
};

export type PhoneSettingTypeProps = 'Add' | 'Change';

export type EmailPhoneResponseType = {
  code: number;
  data: any;
  message: string | undefined;
  status: number;
};
