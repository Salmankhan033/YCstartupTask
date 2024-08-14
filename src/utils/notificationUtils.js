// notificationUtils.js
import {Notifications} from 'react-native-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const scheduleNotification = async minutes => {
  console.log('wellcome notification');
  const now = new Date();
  const fireDate = new Date(now.getTime() + minutes * 60 * 1000); // Adding minutes to current time

  Notifications.postLocalNotification({
    title: 'Toggle Notification',
    body: await getOnTogglesMessage(),
    // Uncomment the line below to schedule the notification for the specified time
    // fireDate: fireDate.toISOString(),
  });
};

const getOnTogglesMessage = async () => {
  const togglesString = await AsyncStorage.getItem('toggles');
  const toggles = JSON.parse(togglesString || '[]');
  const appIcon = '🔔'; // Replace with your actual app icon or emoji
  const onToggles = toggles
    .map((status, index) => (status ? `Toggle ${index + 1}` : null))
    .filter(Boolean);

  if (onToggles.length === 0) {
    return `${appIcon} No toggles are currently ON.`;
  }

  return `${appIcon} Toggles ${onToggles.join(
    ', ',
  )} are ON. Please turn them OFF.`;
};

// Registering notifications
Notifications.registerRemoteNotifications();

Notifications.events().registerRemoteNotificationsRegistered(event => {
  console.log('Device Token Received', event.deviceToken);
});

Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
    console.log('Notification Received - Foreground', notification);
    completion({alert: true, sound: true, badge: false});
  },
);
