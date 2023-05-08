import {useState} from 'react';
import {
  VersionInfoDetailType,
  VersionInfoPropsType,
} from '../interface/version.interface';
import {versionInfo} from '../api/version.api';

export const useVersionHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataVersion, setDataVersion] = useState<VersionInfoDetailType>();
  const [isError, setIsError] = useState(false);

  const getVersionInfo = async (props: VersionInfoPropsType) => {
    try {
      const response = await versionInfo(props);
      setDataVersion(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataVersion,
    getVersionInfo,
  };
};
