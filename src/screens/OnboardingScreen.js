import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import AppText from '../components/AppText';
import AppTouchableText from '../components/AppTouchableText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function OnboardingScreen({navigation}) {
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log('useEffect triggered'); // Log to check if useEffect is running

    const checkOnboardingStatus = async () => {
      console.log('Checking onboarding status'); // Log to check if function is called

      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );
        console.log('onboardingCompleted value:', onboardingCompleted); // Log the value retrieved

        if (onboardingCompleted === 'true') {
          console.log('Navigating to Login'); // Log before navigating
          navigation.navigate('Login');
        } else {
          console.log('Setting loading to false'); // Log when loading is set to false
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    try {
      checkOnboardingStatus();
    } catch (error) {
      console.error(
        'Error in useEffect while checking onboarding status:',
        error,
      );
    }
  }, [navigation]);

  const markOnboardingAsCompleted = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      console.log('Onboarding marked as completed');
    } catch (error) {
      console.error('Error marking onboarding as completed:', error);
    }
  };

  const CustomCheckmarkButton = ({onPress}) => (
    <TouchableOpacity style={styles.buttonChecks} onPress={onPress}>
      <Icon name="check" size={20} color="white" />
    </TouchableOpacity>
  );

  const CustomButton = ({title, onPress}) => (
    <AppTouchableText
      text={title}
      onPress={onPress}
      textStyle={styles.button}
    />
  );

  const NumberedPagination = () => (
    <View style={styles.paginationContainer}>
      {Array.from({length: 3}).map((_, index) => (
        <AppText
          key={index}
          style={[
            styles.numberText,
            activePage === index ? styles.selectedNumberText : null,
          ]}>
          {index + 1}
        </AppText>
      ))}
    </View>
  );

  const CustomTitle = ({title}) => (
    <AppText style={styles.title}>{title}</AppText>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <View />,
          title: <CustomTitle title="1" />,
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <View />,
          title: <CustomTitle title="2" />,
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <View />,
          title: <CustomTitle title="3" />,
          subtitle: '',
        },
      ]}
      onDone={() => {
        markOnboardingAsCompleted(); // Set the flag when onboarding is completed
        console.log('Onboarding completed');
        navigation.navigate('Login');
      }}
      onSkip={() => {
        markOnboardingAsCompleted(); // Set the flag when onboarding is skipped
        console.log('Onboarding skipped');
        navigation.navigate('Login');
      }}
      // DotComponent={Square}
      showSkip={true}
      showNext={true}
      showDone={true}
      pageIndexCallback={pageIndex => setActivePage(pageIndex)}
      renderPagination={NumberedPagination}
      SkipButtonComponent={props => <CustomButton title="Skip" {...props} />}
      NextButtonComponent={props => <CustomButton title="Next" {...props} />}
      DoneButtonComponent={props => <CustomCheckmarkButton {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp('12%'),
    textAlign: 'center',
  },
  image: {
    width: wp('75%'),
    height: wp('75%'),
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  numberText: {
    marginHorizontal: wp('1.5%'),
    fontSize: wp('5%'),
    color: '#aaa',
  },
  selectedNumberText: {
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: wp('20%'),
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: hp('2.5%'),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: Platform.OS === 'ios' ? wp('3%') : wp('2.4%'),
    borderRadius: Platform.OS === 'ios' ? wp('3%') : wp('1.25%'),
    color: '#fff',
    marginHorizontal: wp('3%'),
    width: Platform.OS === 'ios' ? wp('19%') : wp('15%'),
    height: Platform.OS === 'ios' ? wp('11%') : hp('6%'),
    justifyContent: 'center',
  },
  buttonChecks: {
    backgroundColor: '#1d4ed8',
    padding: wp('2.4%'),
    borderRadius: wp('1.25%'),
    color: '#fff',
    marginHorizontal: wp('3%'),
    width: Platform.OS === 'ios' ? wp('19%') : wp('15%'),
    height: Platform.OS === 'ios' ? wp('11%') : hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;
