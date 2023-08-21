import {listConcert, listMerch, searchEvent} from '../api/event.api';
import {RequestPropsListMerch} from '../interface/event.interface';

export const useEventHook = () => {
  const getListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await listMerch(props);
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

  const searchListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'product'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const searchListDataTicket = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'event'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getListDataMerch,
    getListDataConcert,
    searchListDataMerch,
    searchListDataTicket,
  };
};
