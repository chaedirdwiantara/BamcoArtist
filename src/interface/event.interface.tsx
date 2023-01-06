export interface MerchListResponse {
  total: number;
  data: MerchData[];
}

export interface MerchData {
  id: string;
  countryCode: string;
  name: string;
  label: string;
  labelEn: string;
  labelCn: string;
  type: string;
  clause: string;
  mode: string;
  state: string;
  sortSeq: number;
  limit: number;
  isAdminOnly: boolean;
  data: MerchListProps[];
}

export interface MerchListProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  score: number | null;
  oid: string;
  name: string;
  pic: string;
  kind: string;
  title: string;
  titleEn: string;
  titleCn: string;
  content: string;
  contentEn: string;
  contentCn: string;
  organizerId: string;
  organizer: MerchOrganizer;
  category: string;
  charge: string;
  countryCode: string;
  currencyCode: string;
  originalPrice: number;
  price: number;
  isPrivate: boolean;
  isEarlyBird: boolean;
  earlyBirdMinEndTime: null | string;
  minPrice: number;
  maxPrice: number;
  minOriginalPrice: number;
  maxOriginalPrice: number;
  keyword: string;
  tagword: string;
  favCnt: number;
  hitCnt: number;
  ratePercentage: number;
  rateCnt: number;
  state: string;
  valid: string;
  props: {
    [key: string]: string;
  };
  esprops: {
    category: string[];
    organizer: string[];
  };
}

export interface MerchOrganizer {
  id: string;
  oid: string;
  name: string;
  pic: string;
  title: string;
  titleEn: string;
  titleCn: string;
  content: string;
  contentEn: string;
  contentCn: string;
  level: number;
  countryCode: string;
  companyName: string;
  companyNameEn: string;
  companyNameCn: string;
  socialMedias: null;
  emailConfirmed: boolean;
  mobileConfirmed: boolean;
  stores: MerchOrganizerStore[];
}

export interface MerchOrganizerStore {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
  updatedByType: string;
  organizerId: string;
  countryCode: string;
  address: string;
  addressEn: string;
  addressCn: string;
  openingHour: string;
  openingHourEn: string;
  openingHourCn: string;
  phone: string;
  state: string;
}
