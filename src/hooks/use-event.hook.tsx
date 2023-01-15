import {listConcert, listMerch} from '../api/event.api';

export const useEventHook = () => {
  const getListDataMerch = async () => {
    try {
      const response = await listMerch();
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataConcert = async () => {
    try {
      const response = await listConcert();
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getListDataMerch,
    getListDataConcert,
  };
};
