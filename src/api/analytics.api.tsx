import SsuAPI from './baseRinjani';
import {ListPostResponseType} from '../interface/feed.interface';
import {ParamsProps} from '../interface/base.interface';

// => List Post Area
export const fansAnalytic = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const fansActiveInteract = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};
