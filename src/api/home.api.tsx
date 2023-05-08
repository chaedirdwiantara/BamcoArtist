import SsuAPI from './baseRinjani';
import SsuAPISemeru from './baseSemeru';
import {
  ComingSoonResponseType,
  DiveInResponseType,
} from '../interface/home.interface';

export const diveInList = async (): Promise<DiveInResponseType> => {
  const {data} = await SsuAPI().request<DiveInResponseType>({
    url: '/public/posts/dive-in-list',
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
