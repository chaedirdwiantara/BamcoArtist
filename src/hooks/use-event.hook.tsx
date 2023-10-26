import {UseInfiniteQueryOptions, useInfiniteQuery, useQuery} from 'react-query';
import {
  fetchListOrder,
  getEventDetail,
  getEventDetailVoucher,
  getEventLineUp,
  getEventLiveRank,
  getEventMusicianTipped,
  getEventTopTipper,
  getEventVoucher,
  getStatusLiveMusician,
  listConcert,
  listEventHome,
  listEventMusician,
  listMerch,
  searchEvent,
} from '../api/event.api';
import {
  GenerateVoucherReq,
  OrderListBookyay,
  RequestPropsListMerch,
} from '../interface/event.interface';
import {AxiosError} from 'axios';
import {ParamsProps} from '../interface/base.interface';

export const useEventHook = () => {
  const getListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await listMerch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataConcert = async () => {
    try {
      const response = await listConcert();
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const searchListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'product'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const searchListDataTicket = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'event'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const useEventMusician = (uuid: string, params?: ParamsProps) => {
    return useQuery(
      [`event/musician/${uuid}`],
      () => listEventMusician(uuid, params),
      {
        enabled: false,
      },
    );
  };
  const useEventDetail = (id: string, params?: ParamsProps) => {
    return useQuery([`event/detail/${id}`], () => getEventDetail(id, params), {
      enabled: false,
    });
  };
  const useEventLineUp = (id: string, params?: ParamsProps) => {
    return useQuery(
      [`event/detail/lineup/${id}`],
      () => getEventLineUp(id, params),
      {
        enabled: true,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventTopTipper = (events: string, params?: ParamsProps) => {
    return useQuery(
      [`event/detail/toptipper/${events}`],
      () => getEventTopTipper(events, params),
      {
        enabled: true,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventMusicianTipped = (
    tipperuuid: string,
    event_id: string,
    params?: ParamsProps,
  ) => {
    return useQuery(
      [`event/detail/musician-tipped/${tipperuuid}/${event_id}`],
      () => getEventMusicianTipped(tipperuuid, event_id, params),
      {
        enabled: false,
      },
    );
  };

  const useOrderListBookYay = (
    token: string,
    totalPage: number,
    params?: ParamsProps,
    options?: UseInfiniteQueryOptions<
      OrderListBookyay,
      AxiosError,
      OrderListBookyay
    >,
  ) => {
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
  };

  const useEventMusicianLiveStatus = (eventId: string, musicianId: string) => {
    return useQuery(
      [`event/${eventId}/${musicianId}`],
      () => getStatusLiveMusician(eventId, musicianId),
      {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventRankerLiveTipping = (
    events: string,
    musician?: string,
    params?: ParamsProps,
  ) => {
    return useQuery(
      [`event/detail/live-ranker/${events}`],
      () => getEventLiveRank(events, musician, params),
      {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventHome = (params?: ParamsProps) => {
    return useQuery([`event/home}`], () => listEventHome(params), {
      enabled: false,
    });
  };

  const useEventGenerateVoucher = (params: GenerateVoucherReq) => {
    return useQuery([`event/voucher/${params?.eventId}`], () =>
      getEventVoucher(params),
    );
  };

  const useEventDetailVoucher = (eventId: string) => {
    return useQuery([`event/voucher/detail/${eventId}`], () =>
      getEventDetailVoucher(eventId),
    );
  };

  return {
    getListDataMerch,
    getListDataConcert,
    searchListDataMerch,
    searchListDataTicket,
    useEventMusician,
    useEventDetail,
    useEventLineUp,
    useOrderListBookYay,
    useEventTopTipper,
    useEventMusicianTipped,
    useEventMusicianLiveStatus,
    useEventRankerLiveTipping,
    useEventHome,
    useEventGenerateVoucher,
    useEventDetailVoucher,
  };
};
