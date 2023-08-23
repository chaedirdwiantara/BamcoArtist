import {
  CitiesCountryResponseType,
  DataCountryType,
  DataStatePropsType,
} from '../interface/location.interface';
import {ListRoleType, PreferenceList} from '../interface/setting.interface';

const formatValueName = (data: string[]) => {
  return data.map((item, index) => {
    return {
      label: item,
      value: index + 1,
    };
  });
};

const formatValueName2 = (data: PreferenceList[] | ListRoleType[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

const formatValueNameState = (
  data: DataStatePropsType[] | CitiesCountryResponseType[],
) => {
  return data.map(item => {
    return {
      ...item,
      label: item.name,
      value: item.name,
    };
  });
};

const formatValueNameCity = (data: string[]) => {
  return data.map(item => {
    return {
      label: item,
      value: item,
    };
  });
};

const formatValueNameCountry = (data: DataCountryType[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.countryCode,
      id: item.id,
    };
  });
};

export {
  formatValueName,
  formatValueName2,
  formatValueNameState,
  formatValueNameCity,
  formatValueNameCountry,
};
