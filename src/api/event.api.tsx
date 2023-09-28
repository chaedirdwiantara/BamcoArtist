import {ParamsProps} from '../interface/base.interface';
import {
  ClaimVoucherResponse,
  EventDetailResponse,
  EventHomeResponse,
  EventLineUpResponse,
  EventMusicianResponse,
  EventMusicianTippedResponse,
  EventTopTipperResponse,
  GenerateVoucherReq,
  GenerateVoucherResponse,
  GetVoucherByEventResponse,
  MerchListResponse,
  MusicianStatusResponse,
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

export const getStatusLiveMusician = async (
  eventId: string,
  musicianId: string,
): Promise<MusicianStatusResponse> => {
  const {data} = await RinjaniAPI().request<MusicianStatusResponse>({
    url: `/events/${eventId}/check-musician-live/${musicianId}`,
    method: 'GET',
  });

  return data;
};

export const getEventLiveRank = async (
  events: string,
  musician?: string,
  props?: ParamsProps,
): Promise<EventTopTipperResponse> => {
  const {data} = await KrakatauAPI().request<EventTopTipperResponse>({
    url: `/events/live/top-tipper`,
    method: 'GET',
    params: {
      events,
      musician,
      ...props,
    },
  });

  return data;
};

export const listEventHome = async (
  props?: ParamsProps,
): Promise<EventHomeResponse> => {
  const {data} = await RinjaniAPI().request<EventHomeResponse>({
    url: '/events',
    method: 'GET',
    params: {
      ...props,
    },
  });

  return data;
};

export const getEventVoucher = async (
  params: GenerateVoucherReq,
): Promise<GenerateVoucherResponse> => {
  const {data} = await KrakatauAPI().request<GenerateVoucherResponse>({
    url: `/vouchers/check-generate-first-tip`,
    method: 'POST',
    data: params,
  });

  return data;
};

export const getEventDetailVoucher = async (
  eventId: string,
): Promise<GetVoucherByEventResponse> => {
  const {data} = await KrakatauAPI().request<GetVoucherByEventResponse>({
    url: `/vouchers/event/${eventId}`,
    method: 'GET',
  });

  return data;
};

export const redeemEventVoucher = async ({
  voucherId,
  eventId,
}: {
  voucherId: number;
  eventId: string;
}): Promise<ClaimVoucherResponse> => {
  const {data} = await KrakatauAPI().request<ClaimVoucherResponse>({
    url: `/vouchers/redeem/${voucherId}/event/${eventId}`,
    method: 'PATCH',
  });

  return data;
};
