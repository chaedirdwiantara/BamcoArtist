import {dataProps} from '../components/molecule/DropDown/DropdownMulti';

const formatValueName = (data: string[]) => {
  return data.map((item, index) => {
    return {
      label: item,
      value: index + 1,
    };
  });
};

const formatValueName2 = (data: dataProps[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

export {formatValueName, formatValueName2};
