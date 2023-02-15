import {
  CityResponseType,
  DataStateProps,
  GetAllCountryResponseType,
  StateResponseType,
} from '../interface/location.interface';
import SsuAPI from './baseLocation';

export const getAllCountry = async (): Promise<GetAllCountryResponseType> => {
  const {data} = await SsuAPI().request<GetAllCountryResponseType>({
    url: '/info?returns=unicodeFlag',
    method: 'GET',
  });

  return data;
};

export const getState = async (
  props: DataStateProps,
): Promise<StateResponseType> => {
  const {data} = await SsuAPI().request<StateResponseType>({
    url: '/states',
    method: 'POST',
    data: new URLSearchParams(props).toString(),
  });

  return data;
};

export const getCity = async (
  props: DataStateProps,
): Promise<CityResponseType> => {
  const {data} = await SsuAPI().request<CityResponseType>({
    url: '/state/cities',
    method: 'POST',
    data: new URLSearchParams(props).toString(),
  });

  return data;
};

export const getCityOfCountry = async (
  props: DataStateProps,
): Promise<CityResponseType> => {
  const {data} = await SsuAPI().request<CityResponseType>({
    url: '/cities',
    method: 'POST',
    data: new URLSearchParams(props).toString(),
  });

  return data;
};
