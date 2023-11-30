import {useQuery} from 'react-query';
import {masterReward, progressReward} from '../api/reward.api';
import {profileStorage} from './use-storage.hook';

export const useRewardHook = () => {
  const uuid = profileStorage()?.uuid;

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
  };
};
