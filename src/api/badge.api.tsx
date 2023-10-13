import SsuAPI from './baseRinjani';
import {
  BadgePropsType,
  DataBadgeResponseType,
} from '../interface/badge.interface';

export const checkBadgeLevel = async (
  props: BadgePropsType,
): Promise<DataBadgeResponseType> => {
  const {data} = await SsuAPI().request<DataBadgeResponseType>({
    url: '/public/my-badge',
    method: 'GET',
    params: props,
  });

  return data;
};
