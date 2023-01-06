import messaging from '@react-native-firebase/messaging';
import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging/lib';
import notifee, {AndroidImportance} from '@notifee/react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

export const getTokenFCM = async ({
  onGetToken,
}: {
  onGetToken: (token: string) => void;
}) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    messaging()
      .hasPermission()
      .then(async enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(tokenFCM => {
              console.log(tokenFCM);
              onGetToken(tokenFCM);
            })
            .catch(err => {
              console.log(
                '[FCMService] User does not have a device token',
                err,
              );
            });
        } else {
          await messaging().requestPermission();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const deleteTokenFCM = () => {
  return new Promise(async function (resolve, reject) {
    messaging()
      .deleteToken()
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const createNotificationListener = ({
  onRegister,
  onNotification,
  onOpenNotification,
}: {
  onRegister: (token: string) => void;
  onNotification: (data: FirebaseMessagingTypes.RemoteMessage) => void;
  onOpenNotification: (data: any) => void;
}) => {
  // When the application is running, but in the background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
      remoteMessage,
    );
    if (remoteMessage) {
      const notification = remoteMessage.notification;
      onOpenNotification(notification);
    }
  });

  // When the application is opened from a quit state.
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        '[FCMService] getInitialNotification Notification caused app to open from quit state:',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

  // Foreground state messages
  messaging().onMessage(async remoteMessage => {
    console.log('[FCMService] A new FCM message arrived!', remoteMessage);
    if (remoteMessage) {
      onNotification(remoteMessage);
    }
  });

  // Triggered when have new token
  messaging().onTokenRefresh(fcmToken => {
    console.log('[FCMService] New token refresh: ', fcmToken);
    onRegister(fcmToken);
  });

  // background message
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      '[FCMService] A new background FCM message arrived!',
      remoteMessage,
    );
    if (remoteMessage) {
      onNotification(remoteMessage);
    }
  });
};

export const showNotification = async ({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification({
    title: title || '',
    body: message || '',
    android: {
      channelId: channelId,
      pressAction: {
        id: 'default',
      },
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_notification',
    },
  });
};
