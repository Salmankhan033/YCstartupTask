import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const AppTouchableText = ({
  text,
  onPress,
  textDecorationLine,
  style = {},
  textStyle = {},
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} {...props}>
      <Text style={[styles.linkText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppTouchableText;

const styles = StyleSheet.create({
  linkText: {
    color: '#007bff', // Default link color
    fontSize: 16,
  },
});
