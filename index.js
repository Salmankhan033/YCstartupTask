/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {scheduleNotification} from './src/utils/notificationUtils';

// Call your notification scheduling function here
scheduleNotification(1);

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
