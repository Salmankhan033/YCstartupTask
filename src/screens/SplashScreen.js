import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppText from '../components/AppText';

function SplashScreen({navigation}) {
  useEffect(() => {
    // Simulate data loading with a timeout
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000); // Adjust the timeout duration as needed
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Update with the path to your image
        style={styles.image}
      />
      <AppText style={styles.text}>Loading please wait... </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Set a background color
  },
  image: {
    width: 100, // Adjust the size of the image
    height: 100, // Adjust the size of the image
    marginBottom: 20, // Space between the image and the text
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
