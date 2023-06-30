import {
  ActiveListener,
  FansAge,
  FansCountry,
  FansGender,
  ListenerCountry,
  ListenerLikes,
  PopularAlbum,
  TopSongs,
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
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFansActiveInteract = async (props?: ParamsProps) => {
    try {
      const response = await fansActiveInteract(props);
      return {
        data: response?.data,
        meta: response?.meta,
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
        meta: response?.meta,
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
        meta: response?.meta,
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
        meta: response?.meta,
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
        meta: response?.meta,
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
  };
};
