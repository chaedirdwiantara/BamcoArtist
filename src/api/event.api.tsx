import {UseInfiniteQueryOptions, useInfiniteQuery, useQuery} from 'react-query';
import {ParamsProps} from '../interface/base.interface';
import {
  EventDetailResponse,
  EventLineUpResponse,
  EventMusicianResponse,
  MerchListResponse,
  OrderListBookyay,
  SearchEventInput,
} from '../interface/event.interface';
import BookYayAPI from './baseBookYay';
import RinjaniAPI from './baseRinjani';
import {AxiosError} from 'axios';

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

export function useEventDetail(id: string, params?: ParamsProps) {
  return useQuery([`event/detail/${id}`], () => getEventDetail(id, params), {
    enabled: false,
  });
}

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

export function useEventLineUp(id: string, params?: ParamsProps) {
  return useQuery(
    [`event/detail/lineup/${id}`],
    () => getEventLineUp(id, params),
    {
      enabled: false,
    },
  );
}

export default async function fetchListOrder(
  token: string,
  params: ParamsProps,
): Promise<OrderListBookyay> {
  return await BookYayAPI()
    .get(`orders`, {headers: {Authorization: `Bearer ${token}`}, params})
    .then((res: any) => res.data)
    .catch(err => {
      return err;
    });
}

export function useOrderListBookYay(
  token: string,
  totalPage: number,
  params?: ParamsProps,
  options?: UseInfiniteQueryOptions<
    OrderListBookyay,
    AxiosError,
    OrderListBookyay
  >,
) {
  return useInfiniteQuery({
    queryKey: ['bookyay-order-' + token],
    enabled: false,
    queryFn: ({pageParam = 1}) =>
      fetchListOrder(token, {...params, page: pageParam, pageSize: 10}),
    keepPreviousData: true,
    ...options,
    getNextPageParam: lastPage => {
      if ((lastPage?.data?.length as number) < totalPage) {
        const nextPage = (lastPage?.data?.length as number) + 1;
        return nextPage;
      }
      return null;
    },
    getPreviousPageParam: () => null,
  });
}
