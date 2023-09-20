import {ParamsProps} from '../interface/base.interface';
import {
  EventDetailResponse,
  EventLineUpResponse,
  EventMusicianResponse,
  EventMusicianTippedResponse,
  EventTopTipperResponse,
  MerchListResponse,
  OrderListBookyay,
  SearchEventInput,
} from '../interface/event.interface';
import BookYayAPI from './baseBookYay';
import RinjaniAPI from './baseRinjani';
import KrakatauAPI from './baseKrakatau';

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

export const getEventDetail = async (
  id: string,
  props?: ParamsProps,
): Promise<EventDetailResponse> => {
  const {data} = await RinjaniAPI().request<EventDetailResponse>({
    url: `/events/detail/${id}`,
    method: 'GET',
    params: {
      ...props,
    },
  });

  return data;
};

export const getEventLineUp = async (
  id: string,
  props?: ParamsProps,
): Promise<EventLineUpResponse> => {
  const {data} = await RinjaniAPI().request<EventLineUpResponse>({
    url: `/events/detail/${id}/lineup`,
    method: 'GET',
    params: {
      ...props,
    },
  });

  return data;
};

export const fetchListOrder = async (
  token: string,
  params: ParamsProps,
): Promise<OrderListBookyay> => {
  return await BookYayAPI()
    .get(`orders`, {headers: {Authorization: `Bearer ${token}`}, params})
    .then((res: any) => res.data)
    .catch(err => {
      return err;
    });
};

export const getEventTopTipper = async (
  events: string,
  props?: ParamsProps,
): Promise<EventTopTipperResponse> => {
  const {data} = await KrakatauAPI().request<EventTopTipperResponse>({
    url: `/events/top-tipper`,
    method: 'GET',
    params: {
      events,
      ...props,
    },
  });

  return data;
};

export const getEventMusicianTipped = async (
  tipperuuid: string,
  event_id: string,
  props?: ParamsProps,
): Promise<EventMusicianTippedResponse> => {
  const {data} = await KrakatauAPI().request<EventMusicianTippedResponse>({
    url: `/events/tipped-musician/${tipperuuid}`,
    method: 'GET',
    params: {
      per_page: 100,
      filter_column: 'event_id',
      filter_value: event_id,
      ...props,
    },
  });

  return data;
};
