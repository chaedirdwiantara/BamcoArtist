import {ParamsProps} from '../interface/base.interface';
import {
  MerchListResponse,
  SearchEventInput,
} from '../interface/event.interface';
import BookYayAPI from './baseBookYay';

export const listMerch = async (
  props?: ParamsProps,
): Promise<MerchListResponse> => {
  const {data} = await BookYayAPI().request<MerchListResponse>({
    url: '/home/topics/pure?countryCode=HK&type=product',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listConcert = async (
  props?: ParamsProps,
): Promise<MerchListResponse> => {
  const {data} = await BookYayAPI().request<MerchListResponse>({
    url: '/home/topics/pure?countryCode=HK&type=event',
    method: 'GET',
    params: props,
  });

  return data;
};

export const searchEvent = async (
  props?: SearchEventInput,
): Promise<MerchListResponse> => {
  const {data} = await BookYayAPI().request<MerchListResponse>({
    url: '/home/search',
    method: 'POST',
    data: props,
  });

  return data;
};
