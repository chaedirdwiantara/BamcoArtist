import {ParamsProps} from '../interface/base.interface';
import {
  CityResponseType,
  DataStateProps,
  GetAllCountryResponseType,
  GetCitiesResponseType,
  StateResponseType,
} from '../interface/location.interface';
import SsuAPI from './baseLocation';
import SsuAPIPublic from './baseRinjani';

export const getAllCountry = async (
  props?: ParamsProps,
): Promise<GetAllCountryResponseType> => {
  const {data} = await SsuAPIPublic().request<GetAllCountryResponseType>({
    url: '/public/countries',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getCountryById = async (
  id: number,
): Promise<GetAllCountryResponseType> => {
  const {data} = await SsuAPIPublic().request<GetAllCountryResponseType>({
    url: `/public/countries/${id}`,
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
  props: ParamsProps,
): Promise<GetCitiesResponseType> => {
  const {data} = await SsuAPIPublic().request<GetCitiesResponseType>({
    url: `/public/cities/bycountry/${props.id}`,
    method: 'GET',
    params: props,
  });

  return data;
};
