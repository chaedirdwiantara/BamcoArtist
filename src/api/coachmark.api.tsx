import SsuAPI from './baseRinjani';
import {
  CoachmarkParamsType,
  PushProgressParamsType,
  CoachmarkProgressResponseType,
} from '../interface/coachmark.interface';

export const coachmarkProgress = async (
  props?: CoachmarkParamsType,
): Promise<CoachmarkProgressResponseType> => {
  const {data} = await SsuAPI().request<CoachmarkProgressResponseType>({
    url: '/musician-app/tutorial/progress',
    method: 'GET',
    params: props,
  });

  return data;
};

export const pushProgressCoachmark = async (
  props: PushProgressParamsType,
): Promise<CoachmarkProgressResponseType> => {
  const {data} = await SsuAPI().request<CoachmarkProgressResponseType>({
    url: '/musician-app/tutorial/push',
    method: 'POST',
    data: props,
  });

  return data;
};
