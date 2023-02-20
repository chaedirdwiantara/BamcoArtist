import {useState} from 'react';
import {
  getCountUnreadNotification,
  getListNotification,
  markReadNotification,
} from '../api/notification.api';
import {ListNotificationResponseType} from '../interface/notification.interface';

export const useNotificationHook = () => {
  const [counter, setCounter] = useState(0);
  const [listNotif, setListNotif] =
    useState<ListNotificationResponseType | null>(null);

  const getCountNotification = async () => {
    try {
      const response = await getCountUnreadNotification();
      setCounter(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const readNotification = async () => {
    try {
      await markReadNotification();
    } catch (err) {
      console.log(err);
    }
  };

  const getListAllNotification = async (props: {
    page: number;
    perPage: number;
  }) => {
    try {
      const response = await getListNotification({
        page: props.page,
        perPage: props.perPage,
      });
      if (props.page === 1) {
        setListNotif(response);
      } else {
        if (listNotif !== null) {
          let _notif = {...listNotif};
          _notif.meta = response.meta;
          _notif.data = listNotif?.data.concat(response.data);
          setListNotif(_notif);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    counter,
    listNotif,
    getCountNotification,
    getListAllNotification,
    readNotification,
  };
};
