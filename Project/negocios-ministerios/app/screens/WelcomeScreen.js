import React from 'react';
import { StyleSheet, Text, View, Platform, Image, StatusBar} from 'react-native';

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
          <Image
            fadeDuration = {1000}
            style={styles.logo}
            source={require("../assets/extended_icon.png")}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 255,
      height: 133,
      resizeMode: 'stretch',
    }
  });

export default WelcomeScreen;