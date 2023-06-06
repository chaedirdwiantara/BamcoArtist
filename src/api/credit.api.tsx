import SsuAPI from './baseKrakatau';
import {
  CreateDonationParams,
  CreditResponseType,
  SubsECParams,
} from '../interface/credit.interface';
import SsuAPIRinjani from './baseRinjani';

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

export const checkSubsEC = async (musicianID: string): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions/check',
    method: 'POST',
    data: {
      musicianID: musicianID,
    },
  });

  return data;
};

export const subsEC = async (props?: SubsECParams): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions/subscribe',
    method: 'POST',
    data: props,
  });

  return data;
};
