export type DataCountryType = {
  name: string;
  unicodeFlag: string;
};

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

export type GetAllCountryResponseType = {
  error: boolean;
  data: DataCountryType[];
  msg: string;
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
