import axios, {AxiosError, AxiosInstance} from 'axios';

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: 'https://api.bookyay.com/gpi/v1/',
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

  return API;
};

export default initialize;
