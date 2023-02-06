import {PreferenceList} from '../interface/setting.interface';

const formatValueName = (data: PreferenceList[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

export default formatValueName;
