import {addTokenFcm, removeTokenFcm} from '../api/fcm.api';

export const useFcmHook = () => {
  const addFcmToken = async (fcmToken: string) => {
    try {
      await addTokenFcm(fcmToken);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFcmToken = async (fcmToken: string) => {
    try {
      await removeTokenFcm(fcmToken);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addFcmToken,
    removeFcmToken,
  };
};
