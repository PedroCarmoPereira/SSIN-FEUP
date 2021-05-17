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
        width: 255,
        height: 133,
        resizeMode: 'stretch',
    },
    getStartedButton: {
        borderRadius: 20,
    }
  });

export default globalStyles;