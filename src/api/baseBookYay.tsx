import axios, {AxiosError, AxiosInstance} from 'axios';

type SsuAPIParams = {
  cookie?: string;
};

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

export const initialize = (
  params?: SsuAPIParams,
  anonymous?: boolean,
): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || !API || anonymous) {
    setupAPIClient();
  }

  return API;
};

export default initialize;
