import SsuAPI from './baseRinjani';
import SsuApiSemeru from './baseSemeru';
import {
  AnalyticPostEngagementResponseType,
  ListPostResponseType,
} from '../interface/feed.interface';
import {ParamsProps} from '../interface/base.interface';
import {
  AlbumTopSongResponseType,
  ChartResponseType,
  DemogAgeResponseType,
  DemogCountryResponseType,
  DemogGenderResponseType,
  EngagementResponseType,
  EngagementTopFansResponseType,
  ListAlbumResponseType,
  ListenerCountryResponseType,
  ListenerLikesResponseType,
  PopularAlbumResponseType,
  SendLogResponseType,
  SongChartResponseType,
} from '../interface/analythic.interface';
import SsuAPIKrakatau from './baseKrakatau';
import {ListIncomeResponseType} from '../interface/analythic.interface';

// => List Post Area
export const fansAnalytic = async (
  props?: ParamsProps,
): Promise<ChartResponseType> => {
  const {data} = await SsuAPI().request<ChartResponseType>({
    url: `/musician-app/fans-growth/${props?.interval}`,
    method: 'GET',
  });

  return data;
};

export const fansActiveInteract = async (): Promise<EngagementResponseType> => {
  const {data} = await SsuAPI().request<EngagementResponseType>({
    url: '/musician-app/engagement-fans',
    method: 'GET',
  });

  return data;
};

export const topFans = async (
  props?: ParamsProps,
): Promise<EngagementTopFansResponseType> => {
  const {data} = await SsuAPI().request<EngagementTopFansResponseType>({
    url: '/musician-app/engagements/top-fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const FansAge = async (
  props?: ParamsProps,
): Promise<DemogAgeResponseType> => {
  const {data} = await SsuAPI().request<DemogAgeResponseType>({
    url: '/musician-app/demographic-fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const FansGender = async (
  props?: ParamsProps,
): Promise<DemogGenderResponseType> => {
  const {data} = await SsuAPI().request<DemogGenderResponseType>({
    url: '/musician-app/demographic-fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const FansCountry = async (
  props?: ParamsProps,
): Promise<DemogCountryResponseType> => {
  const {data} = await SsuAPI().request<DemogCountryResponseType>({
    url: '/musician-app/demographic-fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const AlbumTabActiveListenerEP = async (
  props?: ParamsProps,
): Promise<SongChartResponseType> => {
  const {data} = await SsuApiSemeru().request<SongChartResponseType>({
    url: `/musician-app/analytics/song-stream`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const PopularAlbum = async (): Promise<PopularAlbumResponseType> => {
  const {data} = await SsuApiSemeru().request<PopularAlbumResponseType>({
    url: '/musician-app/analytics/most-popular-album',
    method: 'GET',
  });

  return data;
};

export const TopSongs = async (
  props?: ParamsProps,
): Promise<AlbumTopSongResponseType> => {
  const {data} = await SsuApiSemeru().request<AlbumTopSongResponseType>({
    url: `/musician-app/songs/my-top/${props?.interval}`,
    method: 'GET',
  });

  return data;
};

export const ListenerCountryEP = async (
  props?: ParamsProps,
): Promise<ListenerCountryResponseType> => {
  const {data} = await SsuApiSemeru().request<ListenerCountryResponseType>({
    url: '/musician-app/analytics/listener-stream',
    method: 'GET',
    params: props,
  });

  return data;
};

export const ListenerLikes = async (
  props?: ParamsProps,
): Promise<ListenerLikesResponseType> => {
  const {data} = await SsuAPI().request<ListenerLikesResponseType>({
    url: `/musician-app/similar-musician/genre`,
    method: 'POST',
    data: {
      genre: props?.genreID,
    },
  });

  return data;
};

export const WhoListenEP = async (
  props?: ParamsProps,
): Promise<SongChartResponseType> => {
  const {data} = await SsuApiSemeru().request<SongChartResponseType>({
    url: `/musician-app/analytics/album-stream/${props?.songID}`,
    method: 'GET',
    params: {
      interval: props?.interval,
    },
  });

  return data;
};

export const AlbumListenerCountryEP = async (
  props?: ParamsProps,
): Promise<ListenerCountryResponseType> => {
  const {data} = await SsuApiSemeru().request<ListenerCountryResponseType>({
    url: `/musician-app/analytics/listener-stream/${props?.albumID}/albums`,
    method: 'GET',
    params: props?.limit,
  });

  return data;
};

export const AlbumListenerLikeEP = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const WhoListenSongEP = async (
  props?: ParamsProps,
): Promise<SongChartResponseType> => {
  const {data} = await SsuApiSemeru().request<SongChartResponseType>({
    url: `/musician-app/analytics/song-stream/${props?.songID}`,
    method: 'GET',
    params: {
      interval: props?.interval,
    },
  });

  return data;
};

export const SongListenerCountryEP = async (
  props?: ParamsProps,
): Promise<ListenerCountryResponseType> => {
  const {data} = await SsuApiSemeru().request<ListenerCountryResponseType>({
    url: `/musician-app/analytics/listener-stream/${props?.songID}/songs`,
    method: 'GET',
    params: props?.limit,
  });

  return data;
};

export const SongListenerLikesEP = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const SongDescEP = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const PostEngagementEP = async (
  props?: ParamsProps,
): Promise<AnalyticPostEngagementResponseType> => {
  const {data} = await SsuAPI().request<AnalyticPostEngagementResponseType>({
    url: `/musician-app/post/my-post-engagement-rate/${props?.interval}`,
    method: 'GET',
  });

  return data;
};

export const Income = async (
  interval?: string,
): Promise<ListIncomeResponseType> => {
  const {data} = await SsuAPIKrakatau().request<ListIncomeResponseType>({
    url: `/analytic/${interval}`,
    method: 'GET',
  });

  return data;
};

export const ListAlbumEP = async (
  props?: ParamsProps,
): Promise<ListAlbumResponseType> => {
  const {data} = await SsuApiSemeru().request<ListAlbumResponseType>({
    url: `/musician-app/albums`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const sendViewLogEP = async (
  props?: ParamsProps,
): Promise<SendLogResponseType> => {
  const {data} = await SsuAPI().request<SendLogResponseType>({
    url: '/send-tracking/view',
    method: 'POST',
    data: {
      id: props?.id,
      context: 'post',
    },
  });

  return data;
};

export const sendShareLogEP = async (
  props?: ParamsProps,
): Promise<SendLogResponseType> => {
  const {data} = await SsuAPI().request<SendLogResponseType>({
    url: '/send-tracking/share',
    method: 'POST',
    data: {
      id: props?.id,
      context: 'post',
    },
  });

  return data;
};
