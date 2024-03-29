import {
  DetailBenefitsResponse,
  GetBenefits,
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
import SsuAPIKrakatau from './baseKrakatau';
import {ParamsProps} from '../interface/base.interface';

export const masterReward = async (
  params: ParamsProps,
): Promise<MasterRewardResponseType> => {
  const {data} = await SsuAPI().request<MasterRewardResponseType>({
    url: '/musician-app/rewards',
    method: 'GET',
    params: params,
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
    params: {task_type: params.task_type, campaignId: params.campaignId},
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

export const getBenefitEp = async (
  params: ParamsProps,
): Promise<GetBenefits> => {
  const {data} = await SsuAPIKrakatau().request<GetBenefits>({
    url: `/benefits/tier/${params.id}`,
    method: 'GET',
  });

  return data;
};

export const getDetailBenefitEp = async (
  params: ParamsProps,
): Promise<DetailBenefitsResponse> => {
  const {data} = await SsuAPIKrakatau().request<DetailBenefitsResponse>({
    url: `/benefits/detail/${params.id}`,
    method: 'GET',
  });

  return data;
};
