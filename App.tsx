// App.js
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
// import AppNavigator from './src/navigation/AppNavigator';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigator />;
}

export default App;
