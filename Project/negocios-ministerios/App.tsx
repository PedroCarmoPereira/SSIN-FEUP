import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>My dummy text!</Text>
      <Image style={{width: 255 , height: 133, resizeMode: 'stretch',}} source={require("./assets/extended_icon.png")} /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
