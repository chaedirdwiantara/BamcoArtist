import {useState} from 'react';
import {useQuery} from 'react-query';
import {
  CoachmarkParamsType,
  PushProgressParamsType,
} from '../interface/coachmark.interface';
import {coachmarkProgress, pushProgressCoachmark} from '../api/coachmark.api';

export const useCoachmarkHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const useCoachmark = (props?: CoachmarkParamsType) =>
    useQuery({
      queryKey: ['coachmark', props],
      queryFn: () => coachmarkProgress(props),
    });

  const pushCoachmarkProgress = async (props: PushProgressParamsType) => {
    setIsLoading(true);
    try {
      await pushProgressCoachmark(props);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isError,
    isLoading,
    useCoachmark,
    pushCoachmarkProgress,
  };
};
