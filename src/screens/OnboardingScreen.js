import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AppText from '../components/AppText';
import AppTouchableText from '../components/AppTouchableText';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import CustomButton from '../components/CustomButton'; // Import the custom button component

function OnboardingScreen({navigation}) {
  const [activePage, setActivePage] = useState(0); // State to track the active page
  const CustomCheckmarkButton = ({onPress}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="check" size={20} color="white" />
    </TouchableOpacity>
  );

  const CustomButton = ({title, onPress}) => (
    <AppTouchableText
      text={title}
      onPress={onPress}
      textStyle={styles.button}
    />

    // </AppTouchableText>
  );
  const NumberedPagination = () => {
    return (
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
  };

  const CustomTitle = ({title}) => (
    <AppText style={styles.title}>{title}</AppText>
  );

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/logo.png')}
              style={styles.image}
            />
          ),
          title: <CustomTitle title="Per Diem" />,
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/logo.png')}
              style={styles.image}
            />
          ),
          title: <CustomTitle title="Per Diem app test" />,
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/logo.png')}
              style={styles.image}
            />
          ),
          title: <CustomTitle title="Get Started" />,
        },
      ]}
      onDone={() => navigation.navigate('Login')}
      onSkip={() => navigation.navigate('Login')}
      showSkip={true}
      showNext={true}
      showDone={true}
      onPageChange={pageIndex => setActivePage(pageIndex)} // Update state on page change
      renderPagination={NumberedPagination} // Use custom pagination with numbers
      SkipButtonComponent={props => <CustomButton title="Skip" {...props} />} // Use custom skip button
      NextButtonComponent={props => <CustomButton title="Next" {...props} />} // Use custom next button
      DoneButtonComponent={props => <CustomCheckmarkButton {...props} />} // Use custom next button
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  numberText: {
    marginHorizontal: 6,
    fontSize: 20,
    color: '#aaa',
  },
  selectedNumberText: {
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
