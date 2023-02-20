import {
  GetCountUnreadNotificationResponseType,
  ListNotificationResponseType,
} from '../interface/notification.interface';
import SsuAPI from './baseRinjaniNew';

export const getCountUnreadNotification =
  async (): Promise<GetCountUnreadNotificationResponseType> => {
    const {data} =
      await SsuAPI().request<GetCountUnreadNotificationResponseType>({
        url: '/notification/count-unread',
        method: 'GET',
      });

    return data;
  };

export const markReadNotification = async (): Promise<{code: number}> => {
  const {data} = await SsuAPI().request<{code: number}>({
    url: '/notification/mark-as-read',
    method: 'POST',
  });

  return data;
};

export const getListNotification = async (props: {
  page: number;
  perPage: number;
}): Promise<ListNotificationResponseType> => {
  const {data} = await SsuAPI().request<ListNotificationResponseType>({
    url: '/notification',
    method: 'GET',
    params: props,
  });

  return data;
};
