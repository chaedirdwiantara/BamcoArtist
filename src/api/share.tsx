import SsuAPISemeru from './baseSemeru';
import {
  ShareLinkBodyReq,
  ShareLinkResponseType,
} from '../interface/share.interface';

export const generateShareLink = async (
  props: ShareLinkBodyReq,
): Promise<ShareLinkResponseType> => {
  const {data} = await SsuAPISemeru().request<ShareLinkResponseType>({
    url: '/publics/generate-short-link',
    method: 'POST',
    data: props,
  });

  return data;
};
