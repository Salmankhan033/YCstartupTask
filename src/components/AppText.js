import {Text, StyleSheet} from 'react-native';
import React from 'react';

const AppText = ({children, style = {}, ...props}) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    // fontWeight: '700',
    color: '#111827',
    // marginBottom: 20,
    alignSelf: 'center',
  },
});
