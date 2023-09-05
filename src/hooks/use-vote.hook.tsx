import {useState} from 'react';
import {VoteData, VoteParamsProps} from '../interface/vote.interface';
import {postVote} from '../api/vote.api';

export const useVoteHook = () => {
  const [voteIsLoading, setVoteIsLoading] = useState(true);
  const [dataVote, setDataVote] = useState<VoteData>();
  const [voteIsError, setVoteIsError] = useState<boolean>(false);
  const [voteMessage, setVoteMessage] = useState<string>('');

  const setVotePost = async (props?: VoteParamsProps) => {
    setVoteIsLoading(true);
    setVoteIsError(false);
    try {
      const response = await postVote(props);
      setDataVote(response.data);
      setVoteMessage(response.message);
    } catch (error) {
      setVoteIsError(true);
    } finally {
      setVoteIsLoading(false);
    }
  };

  return {
    voteIsLoading,
    voteIsError,
    voteMessage,
    dataVote,
    setVotePost,
  };
};
