/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import {scheduleNotification} from './src/utils/notificationUtils';

// Configure BackgroundFetch
BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // minutes
    stopOnTerminate: false, // Continue fetch events after app termination
    startOnBoot: true, // Start fetch events on device boot
    enableHeadless: true, // Enable headless mode for background tasks
  },
  async taskId => {
    console.log('[BackgroundFetch] taskId index000: ', taskId);

    // Call your function to handle notifications here
    await scheduleNotification(1);

    // Required: Signal completion of your task
    BackgroundFetch.finish(taskId);
  },
  error => {
    console.log('[BackgroundFetch] failed to start11: ', error);
  },
);

// Define and register the headless task
const MyHeadlessTask = async event => {
  console.log('[BackgroundFetch HeadlessTask] start22: ', event.taskId);

  // Call your notification scheduling function here
  await scheduleNotification(1); // Schedule for 10 minutes later

  BackgroundFetch.finish(event.taskId);
};

// Register headless task
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
