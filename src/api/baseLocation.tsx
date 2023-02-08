import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1/countries',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
  // always create new axios instance when cookie changed

  setupAPIClient();

  // TODO: add token on interceptor
  let token: string | null = null;

  if (token) {
    API.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers = {
        ...config.headers,
      };
      return config;
    });
  }

  return API;
};

export default initialize;
