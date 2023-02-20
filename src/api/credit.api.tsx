import SsuAPI from './baseKrakatau';
import {CreditResponseType} from '../interface/credit.interface';

export const getCredit = async (): Promise<CreditResponseType> => {
  const {data} = await SsuAPI().request<CreditResponseType>({
    url: '/credit',
    method: 'GET',
  });

  return data;
};
