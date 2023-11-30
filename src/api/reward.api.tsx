import {
  MasterRewardResponseType,
  PaginationType,
  ProgressRewardRequestType,
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
