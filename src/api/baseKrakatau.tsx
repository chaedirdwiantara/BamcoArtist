import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import config from 'react-native-ultimate-config';
import {storage} from '../hooks/use-storage.hook';
import {getAccessToken} from '../service/refreshToken';

type SsuAPIParams = {
  cookie?: string;
};

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: `${config.BASE_KRAKATAU}/v1`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': storage.getString('lang') ?? 'en',
    },
  });

  API.interceptors.request.use(async request => {
    const JSONProfile = storage.getString('profile');
    if (JSONProfile) {
      try {
        const userToken = await getAccessToken();
        if (userToken) {
          request.headers!['Authorization'] = `Bearer ${userToken}`;
        }
      } catch (err) {
        console.log(err);
      }
    }

    return request;
  });

  API.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (!error.response) {
        return;
      } else {
        return Promise.reject(error);
      }
    },
  );
};

export const initialize = (
  params?: SsuAPIParams,
  anonymous?: boolean,
): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || !API || anonymous) {
    setupAPIClient();
  }

  const JSONProfile = storage.getString('profile');
  let token: string | null = null;
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    token = profileObject.accessToken;
  }

  if (token) {
    API.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers = {
        ...config.headers,
      };
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Ssu-Application'] = 'musician';
      return config;
    });
  }

  return API;
};

export default initialize;
