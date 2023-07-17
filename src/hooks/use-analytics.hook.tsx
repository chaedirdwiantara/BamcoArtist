import {
  AlbumTabActiveListenerEP,
  AlbumListenerCountryEP,
  AlbumListenerLikeEP,
  FansAge,
  FansCountry,
  FansGender,
  Income,
  ListenerLikes,
  PopularAlbum,
  PostEngagementEP,
  SongDescEP,
  SongListenerCountryEP,
  SongListenerLikesEP,
  TopSongs,
  WhoListenEP,
  WhoListenSongEP,
  fansActiveInteract,
  fansAnalytic,
  topFans,
  ListenerCountryEP,
} from '../api/analytics.api';
import {detailAlbum} from '../api/song.api';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {useListenerAlsoLikesStore} from '../store/listenerAlsoLike';

export const useAnalyticsHook = () => {
  const getListDataFansAnalytic = async (props?: ParamsProps) => {
    try {
      const response = await fansAnalytic(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFansActiveInteract = async () => {
    try {
      const response = await fansActiveInteract();
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListTopFans = async (props?: ParamsProps) => {
    try {
      const response = await topFans(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getFansAgeAnalytic = async (props?: ParamsProps) => {
    try {
      const response = await FansAge(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getFansGenderAnalytic = async (props?: ParamsProps) => {
    try {
      const response = await FansGender(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getFansCountryAnalytic = async (props?: ParamsProps) => {
    try {
      const response = await FansCountry(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumActiveListener = async (props?: ParamsProps) => {
    try {
      const response = await AlbumTabActiveListenerEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularAlbum = async () => {
    try {
      const response = await PopularAlbum();
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getTopSongs = async (props?: ParamsProps) => {
    try {
      const response = await TopSongs(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListenerCountry = async (props?: ParamsProps) => {
    try {
      const response = await ListenerCountryEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const {setStoredListenerLikes} = useListenerAlsoLikesStore();
  const getListenerLike = async (props?: ParamsProps) => {
    try {
      const response = await ListenerLikes(props);
      setStoredListenerLikes(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWhoListen = async (props?: ParamsProps) => {
    try {
      const response = await WhoListenEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumListenerCountry = async (props?: ParamsProps) => {
    try {
      const response = await AlbumListenerCountryEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumListenerLike = async (props?: ParamsProps) => {
    try {
      const response = await AlbumListenerLikeEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumDetail = async (props?: PostPropsTypeA) => {
    try {
      const response = await detailAlbum(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getWhoListenSong = async (props?: ParamsProps) => {
    try {
      const response = await WhoListenSongEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSongListenerCountry = async (props?: ParamsProps) => {
    try {
      const response = await SongListenerCountryEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSongListenerLikes = async (props?: ParamsProps) => {
    try {
      const response = await SongListenerLikesEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSongDesc = async (props?: ParamsProps) => {
    try {
      const response = await SongDescEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getPostEngagement = async (props?: ParamsProps) => {
    try {
      const response = await PostEngagementEP(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getIncome = async (interval?: string) => {
    try {
      const response = await Income(interval);
      return {
        all: response?.data?.join,
        tips: response?.data?.tips,
        subs: response?.data?.subs,
        totalTips: response?.data?.totalTips,
        totalSubs: response?.data?.totalSubs,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getListDataFansAnalytic,
    getDataFansActiveInteract,
    getListTopFans,
    getFansAgeAnalytic,
    getFansGenderAnalytic,
    getFansCountryAnalytic,
    getAlbumActiveListener,
    getPopularAlbum,
    getTopSongs,
    getListenerCountry,
    getListenerLike,
    getWhoListen,
    getAlbumListenerCountry,
    getAlbumListenerLike,
    getAlbumDetail,
    getWhoListenSong,
    getSongListenerCountry,
    getSongListenerLikes,
    getSongDesc,
    getPostEngagement,
    getIncome,
  };
};
