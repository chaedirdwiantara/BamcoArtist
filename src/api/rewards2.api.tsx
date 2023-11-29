import RinjaniAPI from './baseRinjani';
import {
  ProgressRewardsPropsType,
  ProgressRewardsResponseType,
  RedeemVoucherPropsType,
  RedeemVoucherResponseType,
} from '../interface/rewards2.interface';

export const progressRewards = async (
  props: ProgressRewardsPropsType,
): Promise<ProgressRewardsResponseType> => {
  const {data} = await RinjaniAPI().request<ProgressRewardsResponseType>({
    url: '/musician-app/rewards/progress',
    method: 'GET',
    params: props,
  });

  return data;
};

export const redeemRewards = async (
  props: RedeemVoucherPropsType,
): Promise<RedeemVoucherResponseType> => {
  const {data} = await RinjaniAPI().request<RedeemVoucherResponseType>({
    url: '/musician-app/rewards/claim',
    method: 'POST',
    data: props,
  });

  return data;
};
