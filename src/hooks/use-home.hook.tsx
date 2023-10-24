import {useState} from 'react';
import {comingSoonAlbum, diveInList, setLastActiveEP} from '../api/home.api';
import {ComingSoon, DiveIn} from '../interface/home.interface';

export const useHomeHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDiveIn, setDataDiveIn] = useState<DiveIn[]>([]);
  const [dataAlbumComingSoon, setDataAlbumComingSoon] = useState<ComingSoon[]>(
    [],
  );
  const [isError, setIsError] = useState(false);
  const [lastActiveStatus, setLastActiveStatus] = useState<string>();

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

  const getListComingSoon = async () => {
    setIsLoading(true);
    try {
      const response = await comingSoonAlbum();
      setDataAlbumComingSoon(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setLastActive = async () => {
    setIsLoading(true);
    try {
      const response = await setLastActiveEP();
      setLastActiveStatus(response.message);
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
    dataAlbumComingSoon,
    lastActiveStatus,
    getListDiveIn,
    getListComingSoon,
    setLastActive,
  };
};
