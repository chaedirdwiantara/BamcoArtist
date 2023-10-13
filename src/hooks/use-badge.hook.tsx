import {useQuery} from 'react-query';
import {checkBadgeLevel} from '../api/badge.api';
import {BadgePropsType} from '../interface/badge.interface';

export const useBadgeHook = () => {
  const useCheckBadge = (props: BadgePropsType) =>
    useQuery({
      queryKey: ['badge', props],
      queryFn: () => checkBadgeLevel(props),
    });

  return {
    useCheckBadge,
  };
};
