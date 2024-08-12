import {TextInput, StyleSheet, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';

const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  style = {},
  inputStyle = {},
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1.25%'),
  },
  label: {
    marginBottom: hp('0.625%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp('2.5%'),
    borderRadius: wp('1.25%'),
    fontSize: wp('4%'),
  },
});
