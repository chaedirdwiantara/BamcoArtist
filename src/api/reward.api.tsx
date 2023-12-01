import {
  GetMissionMaster,
  GetMissionProgress,
  GetMissionProgressParams,
  MasterRewardResponseType,
  PaginationType,
  ProgressRewardRequestType,
  ProgressRewardResponseType,
  RedeemVoucherPropsType,
  RedeemVoucherResponseType,
  SetClaimMission,
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
): Promise<ProgressRewardResponseType> => {
  const {data} = await SsuAPI().request<ProgressRewardResponseType>({
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

export const getMissionMasterEp = async (): Promise<GetMissionMaster> => {
  const {data} = await SsuAPI().request<GetMissionMaster>({
    url: '/missions',
    method: 'GET',
  });

  return data;
};

export const getMissionProgressEp = async (
  params: GetMissionProgressParams,
): Promise<GetMissionProgress> => {
  const {data} = await SsuAPI().request<GetMissionProgress>({
    url: `/missions/progress/${params.function}`,
    method: 'GET',
    params: {task_type: params.task_type},
  });

  return data;
};

export const setClaimMissionEp = async (
  functionTxt: string | undefined,
): Promise<SetClaimMission> => {
  const {data} = await SsuAPI().request<SetClaimMission>({
    url: `musician-app/missions/${functionTxt}/claim`,
    method: 'POST',
  });

  return data;
};
