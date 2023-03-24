import SsuAPI from './basePublic';
import {DiveInResponseType} from '../interface/home.interface';

export const diveInList = async (): Promise<DiveInResponseType> => {
  const {data} = await SsuAPI().request<DiveInResponseType>({
    url: '/posts/dive-in-list',
    method: 'GET',
  });

  return data;
};
