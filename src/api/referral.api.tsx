import {ApplyReferralResponseType} from '../interface/profile.interface';
import SsuAPI from './baseRinjani';

export const applyReferral = async (
  username: string,
): Promise<ApplyReferralResponseType> => {
  const {data} = await SsuAPI().request<ApplyReferralResponseType>({
    url: '/fans-app/referral/apply',
    method: 'POST',
    data: {
      username: username,
    },
  });

  return data;
};
