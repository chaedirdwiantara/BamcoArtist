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

export const unsubsEC = async (id?: string): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: `/fans-app/subscriptions/${id}/unsubscribe`,
    method: 'POST',
  });

  return data;
};

export const getListTips = async ({
  page,
  perPage,
  filterValue,
}: {
  page: number;
  perPage: number;
  filterValue: number;
}): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/donation',
    method: 'GET',
    params: {
      page: page,
      per_page: perPage,
      filter_column: 'contribution_repeat_status',
      filter_value: Number(filterValue),
    },
  });

  return data;
};

export const getListSubs = async ({
  page,
  perPage,
  durationUnit,
  status,
}: {
  page: number;
  perPage: number;
  durationUnit: '' | 'weekly' | 'monthly' | 'yearly' | string;
  status: 'current' | 'past';
}): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions',
    method: 'GET',
    params: {
      page: page,
      perPage: perPage,
      durationUnit: durationUnit,
      status: status,
    },
  });

  return data;
};
