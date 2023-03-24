import {useState} from 'react';
import {diveInList} from '../api/home.api';
import {DiveIn} from '../interface/home.interface';

export const useHomeHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDiveIn, setDataDiveIn] = useState<DiveIn[]>([]);
  const [isError, setIsError] = useState(false);

  const getListDiveIn = async () => {
    setIsLoading(true);
    try {
      const response = await diveInList();
      setDataDiveIn(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataDiveIn,
    getListDiveIn,
  };
};
