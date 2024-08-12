import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppText from '../components/AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    backgroundColor: '#fff',
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
    marginBottom: hp('2%'),
  },
  text: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
