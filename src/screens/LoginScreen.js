import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppTouchableText from '../components/AppTouchableText';
import AppText from '../components/AppText';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AppScrollView from '../components/AppScrollView';
import Toast from 'react-native-toast-message'; // Import Toast

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      // Your Google Sign-In configuration here
    });
  }, []);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const mockHttpLogin = (email, password) => {
    // Simulate an HTTP call with a promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin' && password === 'password123') {
          resolve('Login successful');
        } else {
          reject('Invalid credentials');
        }
      }, 1500); // Simulate network delay
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
        Toast.show({
          type: 'success',
          position: 'top',
          text1: response,
          visibilityTime: 2000,
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000); // Match with visibilityTime
      } catch (error) {
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
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Google Login Successful',
        visibilityTime: 2000,
      });
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Google Login Failed',
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
              text1: 'Forgot Password',
              visibilityTime: 2000,
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
              text1: 'Sign Up',
              visibilityTime: 2000,
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

      {/* Add Toast component here */}
      <Toast ref={ref => Toast.setRef(ref)} />
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f2f4f7',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 20,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 8,
    borderRadius: 5,
  },
  checkboxText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '700',
    alignSelf: 'center',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 42,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  primaryButton: {
    width: '100%',
    marginTop: 20,
  },
  googleSignInButton: {
    width: '100%',
    height: 48,
    marginTop: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  customLinkText: {
    fontSize: 14,
    color: '#1d4ed8',
    marginLeft: 4,
  },
  signUpText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '700',
  },
  signupbuttonText: {
    fontSize: 14,
    color: '#1d4ed8',
    marginLeft: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 40,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginRight: 260,
  },
});

export default LoginScreen;
