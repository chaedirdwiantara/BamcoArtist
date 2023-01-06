import SsuAPI from './base';
import {AddRemoveFcmResponseType} from '../interface/fcm.interface';

export const addTokenFcm = async (
  fcmToken: string,
): Promise<AddRemoveFcmResponseType> => {
  const {data} = await SsuAPI().request<AddRemoveFcmResponseType>({
    url: '/fcm',
    method: 'POST',
    data: {
      fcmToken: fcmToken,
    },
  });

  return data;
};

export const removeTokenFcm = async (
  fcmToken: string,
): Promise<AddRemoveFcmResponseType> => {
  const {data} = await SsuAPI().request<AddRemoveFcmResponseType>({
    url: '/fcm',
    method: 'DELETE',
    data: {
      fcmToken: fcmToken,
    },
  });

  return data;
};
