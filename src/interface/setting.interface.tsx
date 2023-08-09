import {DataDetailMusician} from './musician.interface';

export type EmailPhoneProps = {
  email?: string;
  phoneNumber?: string;
  code: string;
};

export type EmailPhoneVerifProps = {
  email?: string;
  phoneNumber?: string;
};

export type VerifPasswordSetting = {
  email?: string;
  phoneNumber?: string;
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

export type ChangePasswordProps = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};

export type ChangePasswordResponseType = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};

export type DataShippingProps = {
  bookyayShipmentID: string;
  phoneNumberCode: string;
  phoneNumber: string;
  receiverFirstname: string;
  receiverLastname: string;
  province: string;
  country: string;
  postalCode: number;
  city: string;
  address: string;
  isDefault?: boolean;
};

export type ShippingResponseType = {
  code: number;
  data: DataShippingProps[];
  message: string;
  status: number;
};

export type DataExclusiveProps = {
  title: string;
  coverImage: string;
  description: string;
  pricingPlans: {
    durationInDays: number;
    durationUnit: string;
    price: number;
  }[];
};

export type DataExclusiveResponse = {
  ID?: string;
  title?: string;
  coverImage?: string;
  description?: string;
  packageType?: string;
  pricingPlans?: {
    ID?: string;
    duration?: number;
    durationUnit?: string;
    price: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
  subs?: boolean;
  musician?: DataDetailMusician;
};

export type ExclusiveResponseType = {
  code: number;
  data: DataExclusiveResponse;
  message: string;
  status: number;
};

export type OtpEmailScreen = {
  email: string;
  type: PhoneSettingTypeProps;
};

export type SendReportProps = {
  email: string;
  message: string;
  imageUrl: string[];
};

export type SendReportResponseType = {
  code: number;
  data: string | null;
  message: string;
  status: number;
};

export type PreferenceList = {
  id: number;
  name: string;
  imageUrls: {
    image: string;
    presetName: string;
  }[];
};

export type PreferenceResponseType = {
  code: number;
  data: PreferenceList[];
  message: string;
  status: number;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
};

export type PreferenceProps = {
  page?: number;
  perPage?: number;
};

export type ListAllPreference = {
  mood: PreferenceList[];
  genre: PreferenceList[];
  expectation: PreferenceList[];
};

export type ListAllStepWizard = {
  role: ListRoleType[];
  expectation: PreferenceList[];
};

export type LanguageResponseType = {
  code: number;
  data: null;
  message: string;
  status: number;
};

export type ListReasonType = {
  ID: number;
  Name: string;
  Description: {
    ENG: string;
    IND: string;
  };
  ImageURL: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type ListReasonResponseType = {
  code: number;
  data: ListReasonType[];
  message: string;
  status: number;
};

export type ListRoleType = {
  id: number;
  name: string;
};

export type ListRoleResponseType = {
  code: number;
  data: ListRoleType[];
  message: string;
  status: number;
};
