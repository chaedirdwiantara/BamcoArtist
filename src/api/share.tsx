import SsuAPISemeru from './baseSemeru';
import {
  ShareLinkBodyReq,
  ShareLinkResponseType,
  ShareMusicBodyReq,
  ShareMusicResponseType,
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

export const shareMusicToIG = async (
  props: ShareMusicBodyReq,
): Promise<ShareMusicResponseType> => {
  const {data} = await SsuAPISemeru().request<ShareMusicResponseType>({
    url: '/musician-app/songs/share-to-instagram',
    method: 'POST',
    data: props,
  });

  return data;
};
