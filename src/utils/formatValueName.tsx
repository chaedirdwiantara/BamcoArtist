import {PreferenceList} from '../interface/setting.interface';

const formatValueName = (data: string[]) => {
  return data.map((item, index) => {
    return {
      label: item,
      value: index + 1,
    };
  });
};

const formatValueName2 = (data: PreferenceList[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

export {formatValueName, formatValueName2};
