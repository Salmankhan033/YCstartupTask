import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
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
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );
        if (onboardingCompleted === 'true') {
          navigation.navigate('Login');
        } else {
          setLoading(false); // Set loading to false once the check is complete
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    checkOnboardingStatus();
  }, [navigation]);

  const markOnboardingAsCompleted = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
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

  const Square = ({isLight, selected}) => {
    return <View style={{}}>{selected && <Text>{activePage + 1}</Text>}</View>;
  };

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
        navigation.navigate('Login');
      }}
      onSkip={() => {
        markOnboardingAsCompleted(); // Set the flag when onboarding is skipped
        navigation.navigate('Login');
      }}
      DotComponent={Square}
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
    padding: wp('2.4%'),
    borderRadius: wp('1.25%'),
    color: '#fff',
    marginHorizontal: wp('3%'),
    width: wp('15%'),
    height: hp('6%'),
    justifyContent: 'center',
  },
  buttonChecks: {
    backgroundColor: '#1d4ed8',
    padding: wp('2.4%'),
    borderRadius: wp('1.25%'),
    color: '#fff',
    marginHorizontal: wp('3%'),
    width: wp('15%'),
    height: hp('6%'),
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
