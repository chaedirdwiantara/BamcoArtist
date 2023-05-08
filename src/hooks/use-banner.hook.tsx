import {useState} from 'react';
import {listBanner} from '../api/banner.api';
import {BannerList} from '../interface/banner.interface';
import {PaginationType} from '../interface/base.interface';

export const useBannerHook = () => {
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [dataBanner, setDataBanner] = useState<BannerList[]>([]);
  const [isErrorBanner, setIsErrorBanner] = useState(false);

  const getListDataBanner = async (props?: PaginationType) => {
    setIsLoadingBanner(true);
    try {
      const response = await listBanner(props);
      setDataBanner(response.data);
    } catch (error) {
      setIsErrorBanner(true);
    } finally {
      setIsLoadingBanner(false);
    }
  };

  return {
    isLoadingBanner,
    isErrorBanner,
    dataBanner,
    getListDataBanner,
  };
};
