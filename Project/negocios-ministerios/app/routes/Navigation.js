import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import Header from '../shared/header';

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={({navigation}) => { 
                return {
                  headerTitle: () => <Header navigation={navigation} />
                }
              }
            }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;