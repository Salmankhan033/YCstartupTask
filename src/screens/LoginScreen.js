import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppTouchableText from '../components/AppTouchableText';
import AppText from '../components/AppText';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AppScrollView from '../components/AppScrollView';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const configureGoogleSignin = async () => {
      try {
        await GoogleSignin.configure({
          webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
          offlineAccess: true,
          forceCodeForRefreshToken: true,
        });
      } catch (error) {
        console.error('Google Sign-in configuration error', error);
      }
    };

    configureGoogleSignin();
  }, []);

  const toggleCheckbox = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    Toast.show({
      type: 'info',
      position: 'top',
      text1: newChecked ? 'Remember me checked' : 'Remember me unchecked',
      visibilityTime: 1200,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const mockHttpLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin' && password === 'password123') {
          resolve('Login successful');
        } else {
          reject('Invalid credentials');
        }
      }, 1500);
    });
  };

  const handleLogin = async () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('User name is required');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      try {
        const response = await mockHttpLogin(email, password);
        console.log(response); // Log successful login message
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } catch (error) {
        // Show toast message for errors
        Toast.show({
          type: 'error',
          position: 'top',
          text1: error,
          visibilityTime: 2000,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Check if Google Play Services are available
      const userInfo = await GoogleSignin.signIn(); // Initiate Google Sign-In
      console.log('Google Sign-In Status: Success');
      console.log('User Info:', userInfo); // Log the Google sign-in response to the console

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Google Login Successful',
        visibilityTime: 2000,
      });

      // Navigate to the Home screen after a short delay
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }, 2000);
    } catch (error) {
      console.error('Google Sign-In Error:', error);

      let message = 'Google Login Failed';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        message = 'User cancelled the login flow';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        message = 'Signing in...';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        message = 'Play Services not available or outdated';
      }

      Toast.show({
        type: 'error',
        position: 'top',
        text1: message,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <AppScrollView style={styles.container}>
      <AppText style={styles.logoText}>Per Diem</AppText>
      <AppText style={styles.loginText}>Login to your account</AppText>

      <View>
        <AppInput
          label="User Name"
          placeholder="user name"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? (
          <AppText style={styles.errorText}>{emailError}</AppText>
        ) : null}

        <View style={styles.passwordContainer}>
          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <View style={{paddingLeft: 10}}>
            <AppText style={styles.errorText}>{passwordError}</AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={toggleCheckbox}>
          <View
            style={[
              styles.checkbox,
              {backgroundColor: checked ? '#006fef' : 'white'},
            ]}>
            {checked && <Icon name="check" size={16} color="white" />}
          </View>
          <AppText style={styles.checkboxText}>Remember me</AppText>
        </TouchableOpacity>

        <AppTouchableText
          text="Forgot password?"
          onPress={() =>
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Forgot Password button pressed',
              visibilityTime: 1200,
            })
          }
          textStyle={styles.customLinkText}
        />
      </View>

      <AppButton
        title="Login"
        onPress={handleLogin}
        style={styles.primaryButton}
      />

      <GoogleSigninButton
        onPress={handleGoogleLogin}
        style={styles.googleSignInButton}
      />

      <View style={styles.signUpContainer}>
        <AppText style={styles.signUpText}>Don't have an account?</AppText>
        <AppTouchableText
          text="Sign up now"
          onPress={() =>
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Sign Up button pressed',
              visibilityTime: 1200,
            })
          }
          textStyle={[
            styles.signupbuttonText,
            {textDecorationLine: 'underline'},
          ]}
        />
      </View>
      <AppText style={styles.footerText}>
        © 2023 Per Diem. All rights reserved.
      </AppText>

      <Toast />
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wp('4%'),
    backgroundColor: '#f2f4f7',
  },
  logoText: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: hp('2.5%'),
    alignSelf: 'center',
  },
  loginText: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2.5%'),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    // marginTop: hp('1%'),
    marginHorizontal: Platform.OS === 'ios' ? wp('5%') : wp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  checkbox: {
    width: wp('5%'),
    height: wp('5%'),
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: wp('2%'),
    borderRadius: wp('1%'),
  },
  checkboxText: {
    fontSize: wp('4%'),
    color: '#4b5563',
    fontWeight: '700',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? wp('5%') : wp('2%'),
    top: Platform.OS === 'ios' ? wp('9%') : wp('10%'),
    padding: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  primaryButton: {
    // width: '100%',
    marginTop: hp('2.5%'),
    marginHorizontal: Platform.OS === 'ios' ? wp('4%') : wp('1%'),
  },
  googleSignInButton: {
    // width: '100%',
    height: hp('8%'),
    marginTop: hp('2.5%'),
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: hp('2.5%'),
    alignSelf: 'center',
  },
  customLinkText: {
    fontSize: wp('4%'),
    color: '#1d4ed8',
    marginLeft: wp('1%'),
  },
  signUpText: {
    fontSize: wp('4%'),
    color: '#4b5563',
    fontWeight: '700',
  },
  signupbuttonText: {
    fontSize: wp('4%'),
    color: '#1d4ed8',
    marginLeft: wp('1%'),
  },
  footerText: {
    fontSize: wp('3%'),
    color: '#9ca3af',
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: wp('3%'),
    marginRight: wp('60%'),
  },
});

export default LoginScreen;
