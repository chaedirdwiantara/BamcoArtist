import {
  FansAge,
  FansCountry,
  FansGender,
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

  return {
    getListDataFansAnalytic,
    getDataFansActiveInteract,
    getListTopFans,
    getFansAgeAnalytic,
    getFansGenderAnalytic,
    getFansCountryAnalytic,
  };
};
