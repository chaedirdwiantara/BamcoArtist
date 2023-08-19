export type DataStateProps = {
  country: string;
  state?: string;
};

export type DataCountryTypeB = {
  label: string;
  value: string;
  name: string;
  unicodeFlag: string;
};

export type DataStatePropsType = {
  name: string;
  state_code: string;
};

export type StateResponseType = {
  error: boolean;
  data: {
    name: string;
    iso3: string;
    states: DataStatePropsType[];
  };
  msg: string;
};

export type CityResponseType = {
  error: boolean;
  data: string[];
  msg: string;
};

export type CitiesCountryResponseType = {
  id: number;
  name: string;
  createdAt: string;
};

export type GetCitiesResponseType = {
  code: number;
  data: CitiesCountryResponseType[];
  message: string;
  status: number;
};

export type ListCountryType = {
  value: number | string;
  label: string;
  id?: number;
};

export type DataCountryType = {
  id: number;
  name: string;
  imageUrl: string[];
  countryCode: string;
  createdAt: string;
};

export type GetAllCountryResponseType = {
  code: number;
  data: DataCountryType[];
  message: string;
  status: number;
};
