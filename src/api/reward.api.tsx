import {
  MasterRewardResponseType,
  PaginationType,
  ProgressRewardRequestType,
  RedeemVoucherPropsType,
  RedeemVoucherResponseType,
} from '../interface/reward.interface';
import SsuAPI from './baseRinjani';

export const masterReward = async (
  props?: PaginationType,
): Promise<MasterRewardResponseType> => {
  const {data} = await SsuAPI().request<MasterRewardResponseType>({
    url: '/musician-app/rewards',
    method: 'GET',
    params: props,
  });

  return data;
};

export const progressReward = async (
  props: ProgressRewardRequestType,
): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/musician-app/rewards/progress',
    method: 'GET',
    params: props,
  });

  return data;
};

export const redeemRewards = async (
  props: RedeemVoucherPropsType,
): Promise<RedeemVoucherResponseType> => {
  const {data} = await SsuAPI().request<RedeemVoucherResponseType>({
    url: '/musician-app/rewards/claim',
    method: 'POST',
    data: props,
  });

  return data;
};
