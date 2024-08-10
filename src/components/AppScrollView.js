import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';

const AppScrollView = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppScrollView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // or any color you want
    // Additional styles for SafeAreaView can be added here
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
