import SsuAPI from './baseRinjani';
import {PaginationType} from '../interface/base.interface';
import {ListBannerResponseType} from '../interface/banner.interface';

export const listBanner = async (
  props?: PaginationType,
): Promise<ListBannerResponseType> => {
  const {data} = await SsuAPI().request<ListBannerResponseType>({
    url: '/musician-app/banners',
    method: 'GET',
    params: props,
  });

  return data;
};
