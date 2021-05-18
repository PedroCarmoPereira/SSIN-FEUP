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
    },
    TextInput: {
        marginTop: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        padding: 4,
    },
    TitleText:{
      fontSize: 36,
      //fontFamily: 'DM Serif Display'
    }
    
  });

export default globalStyles;