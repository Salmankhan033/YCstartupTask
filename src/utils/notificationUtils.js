// notificationUtils.js
import {Notifications} from 'react-native-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const scheduleNotification = async minutes => {
  const now = new Date();
  const fireDate = new Date(now.getTime() + minutes * 60 * 1000); // Adding minutes to current time

  Notifications.postLocalNotification({
    title: 'Roman Toggle Notification',
    body: await getOnTogglesMessage(),
    fireDate: fireDate.toISOString(), // Schedule the notification for the specified time
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
