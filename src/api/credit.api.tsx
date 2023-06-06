import SsuAPI from './baseKrakatau';
import {
  CreateDonationParams,
  CreditResponseType,
} from '../interface/credit.interface';

export const getCredit = async (): Promise<CreditResponseType> => {
  const {data} = await SsuAPI().request<CreditResponseType>({
    url: '/credit',
    method: 'GET',
  });

  return data;
};

export const createDonation = async (
  props?: CreateDonationParams,
): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/donation/donate',
    method: 'POST',
    data: props,
  });

  return data;
};
