import {BaseResponseApi, imageTypes} from './base.interface';

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

export type TypeEvent = 'event' | 'merch' | string;

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

export enum EventType {
  Merch = 'Merch',
  Concert = 'Concert',
}

export interface RequestPropsListMerch {
  pageSize: number;
  pageNo: number;
  referer: string;
  referId: string;
  limit?: number;
}

export interface EventCardInterface {
  title: string;
  date: string;
  place: string;
  isLive: boolean;
}

export interface EventMusicianInterface {
  id: string;
  date: string;
  item: EventCardInterface[];
}

// Internal Event

export interface EventListData {
  id: string;
  name: string;
  locationCountry: string;
  locationCity: string;
  startDate: string;
  endDate: string;
  imageCover: imageTypes[];
  status?: string;
  isLive?: boolean;
}

export interface EventDetailData extends EventListData {
  organizer: string;
  locationProvince: string;
  locationPostalCode: number;
  fullAddress: string;
  description: string;
  status: string;
  urlGoogle: string;
}

export interface EventLineUp {
  musician: {
    UUID: string;
    username: string;
    fullname: string;
    image: imageTypes[];
    followers: number;
  };
  totalTipping: number;
  statusLineupEvent: string;
}

export interface EventListInterface {
  month?: string;
  events: EventListData[];
}
export interface EventHomeResponse extends BaseResponseApi {
  pages: any;
  data: EventListData[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalAll: number;
  };
}

export interface EventMusicianResponse extends BaseResponseApi {
  data: EventListInterface[];
}

export interface EventDetailResponse extends BaseResponseApi {
  data: EventDetailData;
}

export interface EventLineUpResponse extends BaseResponseApi {
  data: EventLineUp[];
}

export interface OrderListBookyay {
  total: number;
  success: boolean;
  data: any;
}

export interface EventTopTipper {
  rank?: string;
  tipperUUID: string;
  tipperType: string;
  tipperUsername: string;
  tipperFullname: string;
  tipperImage: string;
  totalDonation: number;
}

export interface EventTopTipperResponse extends BaseResponseApi {
  data: EventTopTipper[];
}

export interface EventMusicianTipped {
  musicianUUID: string;
  musicianUsername: string;
  musicianFullname: string;
  musicianImage: string;
  totalDonation: number;
}

export interface EventMusicianTippedResponse extends BaseResponseApi {
  data: EventMusicianTipped[];
  meta: {
    Page: number;
    DataOffset: number;
    PerPage: number;
    TotalData: number;
    TotalPage: number;
  };
}

export interface MusicianStatusResponse extends BaseResponseApi {
  data: boolean;
}

export interface GenerateVoucherReq {
  tipperUUID: string;
  tipperType: string;
  eventId: string;
  endDateEvent: string;
}

export interface GenerateVoucherResponse extends BaseResponseApi {
  data: {
    isGenerated: boolean;
    id: number;
    voucherId: number;
    ownerUUID: string;
    ownerType: string;
    eventId: string;
    expiredDate: string;
    isRedeemed: boolean;
    createdAt: string;
  };
}

export interface GetVoucherByEventResponse extends BaseResponseApi {
  data: {
    voucher: {
      id: number;
      code: string;
      title: string;
      termsCondition: {
        title: string;
        value: string[];
      };
      startDate: string;
      endDate: string;
      createdAt: string;
      updatedAt: string;
    };
    ownerUUID: string;
    ownerType: string;
    expiredDate: string;
    isRedeemed: boolean;
  };
}

export interface ClaimVoucherResponse extends BaseResponseApi {
  data: null;
}

export interface DataVoucherList {
  expiredDate: string;
  id: number;
  isRedeemed: boolean;
  ownerType: string;
  ownerUUID: string;
  voucher: {
    code: string;
    description: string;
    imageUrl: imageTypes[];
    title: string;
  };
}

export interface GetVoucherListResponse extends BaseResponseApi {
  data: DataVoucherList[];
}

export interface DataVoucherListDetail {
  id: number;
  ownerUUID: string;
  ownerType: string;
  expiredDate: string;
  isRedeemed: boolean;
  isAvailable: boolean;
  voucher: {
    id: number;
    code: string;
    title: string;
    startDate: string;
    endDate: string;
    subTitle: string;
    description: string;
    termsCondition: {
      title: string;
      value: string[];
    };
    imageUrl: imageTypes[];
  };
}

export interface GetVoucherListDetailResponse extends BaseResponseApi {
  data: DataVoucherListDetail;
}
