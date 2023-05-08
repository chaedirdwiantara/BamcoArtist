import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {storage} from '../hooks/use-storage.hook';
import {getAccessToken} from '../service/refreshToken';

type SsuAPIParams = {
  cookie?: string;
};

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: 'https://krakatau-dev.ssudev.space/api/v1',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': storage.getString('lang') ?? 'en',
    },
  });

  API.interceptors.request.use(async request => {
    const userToken = await getAccessToken().catch(e =>
      console.log('get token error', e),
    );
    if (userToken) {
      request.headers!['Authorization'] = `Bearer ${userToken}`;
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
