import {ParamsProps} from '../interface/base.interface';
import {SetBlockUser} from '../interface/block.interface';
import SsuAPI from './baseRinjani';

export const blockUserEP = async (
  props?: ParamsProps,
): Promise<SetBlockUser> => {
  const {data} = await SsuAPI().request<SetBlockUser>({
    url: `/blocks/${props?.uuid}`,
    method: 'POST',
  });

  return data;
};

export const unBlockUserEP = async (
  props?: ParamsProps,
): Promise<SetBlockUser> => {
  const {data} = await SsuAPI().request<SetBlockUser>({
    url: `/blocks/unblock/${props?.uuid}`,
    method: 'POST',
  });

  return data;
};
