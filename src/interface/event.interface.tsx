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

export interface SearchEventInput {
  type?: TypeEvent;
  clause?: string;
  dateFrom?: string;
  dateTo?: string;
  priceTo?: number;
  headCnt?: number;
  duration?: string;
  pageNo?: number;
  pageSize?: number;
  countryCode?: string;
  query?: string;
}

export type TypeEvent = 'event' | 'merch';

export interface SearchItem {
  category: string;
  charge: string;
  content: string;
  contentCn: string;
  contentEn: string;
  countryCode: string;
  createdAt: string;
  currencyCode: string;
  earlyBirdMinEndTime: Date | null;
  esprops: {
    category: string[];
    district: string[];
    duration: number | string[];
    headCnts: number | null[];
    location: number[];
    organizer: string[];
    periods: {gte: Date; lte?: Date}[];
    speakIn: string[];
  };
  favCnt: number;
  hitCnt: number;
  id: string;
  isEarlyBird: false;
  isPrivate: false;
  keyword: string;
  kind: string;
  maxOriginalPrice: number;
  maxPrice: number;
  minOriginalPrice: number;
  minPrice: number;
  name: string;
  oid: string;
  organizer: MerchOrganizer;
  organizerId: string;
  originalPrice: number;
  pic: string;
  price: number;
  props: any;
  rateCnt: number;
  ratePercentage: number;
  score: null;
  state: string;
  tagword: string;
  title: string;
  titleCn: string;
  titleEn: string;
  type: string;
  updatedAt: Date;
  valid: string;
}

export interface SearchResponse {
  data: SearchItem[];
  extra: {
    clause: string;
    countryCode: string;
    id: string;
    isAdminOnly: boolean;
    label: string;
    labelEn: string;
    labelCn: string;
    limit: number;
    mode: string;
    name: string;
    sortSeq: number;
    state: string;
    type: string;
  };
  total: number;
  type: TypeEvent;
}
