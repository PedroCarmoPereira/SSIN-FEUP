import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    welcomeLogo: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 255,
      height: 133,
      resizeMode: 'stretch',
    }
  });

export default globalStyles;