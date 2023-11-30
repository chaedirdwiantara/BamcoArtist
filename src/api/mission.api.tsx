import {
  MasterRewardResponseType,
  PaginationType,
  ProgressRewardRequestType,
} from '../interface/reward.interface';
import SsuAPI from './baseRinjani';

export const masterMission = async (
  props?: PaginationType,
): Promise<MasterRewardResponseType> => {
  const {data} = await SsuAPI().request<MasterRewardResponseType>({
    url: '/missions',
    method: 'GET',
    params: props,
  });

  return data;
};

export const progressMission = async (
  props: ProgressRewardRequestType,
): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/mission/progress/:function',
    method: 'GET',
    params: props,
  });

  return data;
};
