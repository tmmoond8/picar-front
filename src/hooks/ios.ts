import React from 'react';
import sessionStorage from '../modules/sessionStorage';
import { isIos } from '../modules/crossPlatform';
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { toast } from 'react-toastify';

export const useIos = () => {
  const [notifications, setNotifications] = React.useState<any[]>([]);

  const register = () => {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      toast('Push registration success');
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      toast('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: 'foreground',
          },
        ]);
      },
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: 'action',
          },
        ]);
      },
    );
  };

  React.useEffect(() => {
    if (isIos() && !sessionStorage.isInitialized()) {
      PushNotifications.checkPermissions().then((res) => {
        if (res.receive !== 'granted') {
          PushNotifications.requestPermissions().then((res) => {
            if (res.receive === 'denied') {
              toast('Push Notification permission denied');
            } else {
              toast('Push Notification permission granted');
              register();
            }
          });
        } else {
          register();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
