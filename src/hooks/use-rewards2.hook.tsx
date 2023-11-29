import {useQuery} from 'react-query';
import {progressRewards} from '../api/rewards2.api';

export const useRewards2Hook = () => {
  const useGetProgressRewards = (uuid: string) => {
    return useQuery([`progress/rewards/${uuid}`], () =>
      progressRewards({uuid, tran_type: 7}),
    );
  };

  return {
    useGetProgressRewards,
  };
};
