import {useQuery} from 'react-query';
import {
  getMissionMasterEp,
  getMissionProgressEp,
  masterReward,
  progressReward,
  setClaimMissionEp,
} from '../api/reward.api';
import {profileStorage} from './use-storage.hook';
import {GetMissionProgressParams} from '../interface/reward.interface';

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

  const queryRewardMaster = () =>
    useQuery({
      queryKey: ['queryRewardMaster'],
      queryFn: () => masterReward(),
    });

  const queryProgressReward = () => {
    return useQuery({
      queryKey: ['queryProgressReward'],
      queryFn: () => progressReward({uuid: uuid || '', tran_type: 7}),
    });
  };

  return {
    queryRewardMaster,
    queryProgressReward,
    useGetMissionMaster,
    useGetMissionProgress,
    useSetClaimMission,
  };
};
