import {useQuery} from 'react-query';
import {
  getBenefitEp,
  getDetailBenefitEp,
  getMissionMasterEp,
  getMissionProgressEp,
  masterReward,
  progressReward,
  setClaimMissionEp,
} from '../api/reward.api';
import {profileStorage} from './use-storage.hook';
import {GetMissionProgressParams} from '../interface/reward.interface';
import {ParamsProps} from '../interface/base.interface';

export const useRewardHook = () => {
  const uuid = profileStorage()?.uuid;

  const useGetMissionMaster = () => {
    return useQuery(['reward/get-mission-master'], () => getMissionMasterEp());
  };

  const useGetMissionProgress = (param: GetMissionProgressParams) => {
    return useQuery(
      [
        'reward/get-mission-progress',
        param.task_type,
        param.function,
        param.campaignId,
      ],
      () => getMissionProgressEp(param),
    );
  };

  const useSetClaimMission = (functionTxt: string | undefined) => {
    return useQuery(['reward/post-mission-claim'], () => {
      functionTxt !== undefined && setClaimMissionEp(functionTxt);
    });
  };

  const queryRewardMaster = (param: ParamsProps) =>
    useQuery({
      queryKey: ['queryRewardMaster'],
      queryFn: () => masterReward(param),
    });

  const queryProgressReward = () => {
    return useQuery({
      queryKey: ['queryProgressReward'],
      queryFn: () => progressReward({uuid: uuid || '', tran_type: 7}),
    });
  };

  const useGetBenefit = (param: ParamsProps) => {
    return useQuery(['reward/get-benefit'], () => getBenefitEp(param));
  };

  const useGetDetailBenefit = (param: ParamsProps) => {
    return useQuery(['reward/get-detail-benefit'], () =>
      getDetailBenefitEp(param),
    );
  };

  return {
    queryRewardMaster,
    queryProgressReward,
    useGetMissionMaster,
    useGetMissionProgress,
    useSetClaimMission,
    useGetBenefit,
    useGetDetailBenefit,
  };
};
