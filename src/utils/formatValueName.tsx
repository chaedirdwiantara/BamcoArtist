import {
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

const formatValueNameLocation = (data: DataCountryType[]) => {
  return data.map(item => {
    return {
      ...item,
      label: item.unicodeFlag + ' ' + item.name,
      value: item.name,
    };
  });
};

const formatValueNameState = (data: DataStatePropsType[]) => {
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

export {
  formatValueName,
  formatValueName2,
  formatValueNameLocation,
  formatValueNameState,
  formatValueNameCity,
};
