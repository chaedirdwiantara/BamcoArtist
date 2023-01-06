import {useState} from 'react';
import {listConcert, listMerch} from '../api/event.api';
import {MerchData} from '../interface/event.interface';

export const useEventHook = () => {
  const [merchIsLoading, setMerchIsLoading] = useState<boolean>(false);
  const [dataMerchList, setDataMerchList] = useState<MerchData[]>([]);
  const [merchIsError, setMerchIsError] = useState<boolean>(false);
  const [concertIsLoading, setConcertIsLoading] = useState<boolean>(false);
  const [dataConcertList, setDataConcertList] = useState<MerchData[]>([]);
  const [concertIsError, setConcertIsError] = useState<boolean>(false);

  const getListDataMerch = async (props?: any) => {
    setMerchIsLoading(true);
    setMerchIsError(false);
    try {
      const response = await listMerch(props);
      setDataMerchList(response.data);
    } catch (error) {
      setMerchIsError(true);
    } finally {
      setMerchIsLoading(false);
    }
  };

  const getListDataConcert = async (props?: any) => {
    setConcertIsLoading(true);
    setConcertIsError(false);
    try {
      const response = await listConcert(props);
      setDataConcertList(response.data);
    } catch (error) {
      setConcertIsError(true);
    } finally {
      setConcertIsLoading(false);
    }
  };

  return {
    merchIsLoading,
    merchIsError,
    dataMerchList,
    getListDataMerch,
    concertIsLoading,
    dataConcertList,
    concertIsError,
    getListDataConcert,
  };
};
