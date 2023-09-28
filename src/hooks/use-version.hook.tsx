import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import {useQuery} from 'react-query';
import {Platform} from 'react-native';
import semver from 'semver';
import {VersionInfoPropsType} from '../interface/version.interface';
import {versionInfo} from '../api/version.api';
import {queryClient} from '../service/queryClient';

interface ICheckVersion {
  forceUpdate: boolean;
  showUpdate: boolean;
}

export const useVersionHook = () => {
  const checkVersion = async (): Promise<ICheckVersion | undefined> => {
    try {
      let resultCheck: ICheckVersion = {
        forceUpdate: false,
        showUpdate: false,
      };
      let propsVersion = {
        platform: Platform.OS,
      };
      const data = await queryClient.fetchQuery({
        queryKey: ['versionInfo', propsVersion],
        queryFn: () => versionInfo(propsVersion),
      });
      const marketVersion = await storeVersion();
      const backendVersion = data.data.version as string;
      const currentVersion = DeviceInfo.getVersion();
      if (semver.gt(marketVersion, currentVersion)) {
        if (semver.eq(marketVersion, backendVersion)) {
          resultCheck.showUpdate = true;
          resultCheck.forceUpdate = data.data.forceUpdate as boolean;
        }
      } else {
        resultCheck.forceUpdate = false;
        resultCheck.showUpdate = false;
      }
      return resultCheck;
    } catch (error) {
      console.log('error nih', error);
      return undefined;
    }
  };

  const storeVersion = async (): Promise<string> => {
    const latestVersion = VersionCheck.getLatestVersion().then(version => {
      return version;
    });
    return latestVersion;
  };

  const versionCheckInfo = (props: VersionInfoPropsType) =>
    useQuery({
      queryKey: ['versionInfo', props],
      queryFn: () => versionInfo(props),
    });

  return {
    checkVersion,
    storeVersion,
    versionCheckInfo,
  };
};
