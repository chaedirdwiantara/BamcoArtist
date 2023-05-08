import SsuAPI from './baseSemeru';
import {
  VersionInfoPropsType,
  VersionInfoResponseType,
} from '../interface/version.interface';

export const versionInfo = async (
  props: VersionInfoPropsType,
): Promise<VersionInfoResponseType> => {
  const {data} = await SsuAPI().request<VersionInfoResponseType>({
    url: '/musician-app/app-update',
    method: 'GET',
    params: props,
  });

  return data;
};
