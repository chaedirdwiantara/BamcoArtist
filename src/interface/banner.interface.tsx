import {PaginationType} from './base.interface';

export type BannerList = {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  platformType?: string;
  isPublish?: boolean;
  ordering?: number;
  createdAt?: string;
  updatedAt?: string;
  imageUrls?: {
    image: string;
    presetName: string;
  }[];
  isDefault?: boolean;
  type?: 'artist' | 'event' | 'external';
  key?: string;
};

export type ListBannerResponseType = {
  code: number;
  data: BannerList[];
  message: string;
  meta: PaginationType;
  status: number;
};
