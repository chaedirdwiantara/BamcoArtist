import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {storage} from '../hooks/use-storage.hook';

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: 'https://semeru-dev.ssudev.space/api/v1/musician-app',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': storage.getString('lang') ?? 'en',
    },
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

export const initialize = (): AxiosInstance => {
  setupAPIClient();

  // TODO: add token on interceptor
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
      return config;
    });
  }

  return API;
};

export default initialize;
