import {
  VoteDataResponseType,
  VoteParamsProps,
} from '../interface/vote.interface';
import SsuAPI from './baseRinjani';

export const postVote = async (
  props?: VoteParamsProps,
): Promise<VoteDataResponseType> => {
  const {data} = await SsuAPI().request<VoteDataResponseType>({
    url: '/musician-app/post/poll',
    method: 'POST',
    params: props,
  });

  return data;
};
