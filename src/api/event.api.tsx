import {useQuery} from 'react-query';
import {ParamsProps} from '../interface/base.interface';
import {
  EventMusicianResponse,
  MerchListResponse,
  SearchEventInput,
} from '../interface/event.interface';
import BookYayAPI from './baseBookYay';
import RinjaniAPI from './baseRinjani';

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

// Event internal
export const listEventMusician = async (
  uuid: string,
  props?: ParamsProps,
): Promise<EventMusicianResponse> => {
  const {data} = await RinjaniAPI().request<EventMusicianResponse>({
    url: `/events/${uuid}/profile`,
    method: 'GET',
    params: {
      ...props,
    },
  });

  return data;
};

export function useEventMusician(uuid: string, params?: ParamsProps) {
  return useQuery(
    [`event/musician/${uuid}`],
    () => listEventMusician(uuid, params),
    {
      enabled: false,
    },
  );
}
