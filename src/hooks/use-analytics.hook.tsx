import {
  ActiveListener,
  AlbumListenerCountryEP,
  AlbumListenerLikeEP,
  AlbumSongEP,
  FansAge,
  FansCountry,
  FansGender,
  ListenerCountry,
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
} from '../api/analytics.api';
import {ParamsProps} from '../interface/base.interface';

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

  const getActiveListener = async (props?: ParamsProps) => {
    try {
      const response = await ActiveListener(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularAlbum = async (props?: ParamsProps) => {
    try {
      const response = await PopularAlbum(props);
      return {
        data: response?.data,
        meta: response?.meta,
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
      const response = await ListenerCountry(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListenerLike = async (props?: ParamsProps) => {
    try {
      const response = await ListenerLikes(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getWhoListen = async (props?: ParamsProps) => {
    try {
      const response = await WhoListenEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
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
        meta: response?.meta,
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

  const getAlbumSongs = async (props?: ParamsProps) => {
    try {
      const response = await AlbumSongEP(props);
      return {
        data: response?.data,
        meta: response?.meta,
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
        meta: response?.meta,
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
    getActiveListener,
    getPopularAlbum,
    getTopSongs,
    getListenerCountry,
    getListenerLike,
    getWhoListen,
    getAlbumListenerCountry,
    getAlbumListenerLike,
    getAlbumSongs,
    getWhoListenSong,
    getSongListenerCountry,
    getSongListenerLikes,
    getSongDesc,
    getPostEngagement,
  };
};
