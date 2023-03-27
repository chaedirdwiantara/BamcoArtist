import SsuAPI from './basePublic';
import SsuAPISemeru from './baseSemeruPublic';
import {
  ComingSoonResponseType,
  DiveInResponseType,
} from '../interface/home.interface';

export const diveInList = async (): Promise<DiveInResponseType> => {
  const {data} = await SsuAPI().request<DiveInResponseType>({
    url: '/posts/dive-in-list',
    method: 'GET',
  });

  return data;
};

export const comingSoonAlbum = async (): Promise<ComingSoonResponseType> => {
  const {data} = await SsuAPISemeru().request<ComingSoonResponseType>({
    url: '/albums/coming-soon',
    method: 'GET',
  });

  return data;
};
