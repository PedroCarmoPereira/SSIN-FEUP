import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {LandingScreenPage, ChatSearchPage} from './Pages';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Home = ({navigation}) => {
    return (
      <Drawer.Navigator drawerPosition='right'>
        <Drawer.Screen
          name="Home"
          component={LandingScreenPage}
        />
        <Drawer.Screen
          name="ChatSearch"
          component={ChatSearchPage}
        />
      </Drawer.Navigator>
    );
};

const Routes = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
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
            name="Home"
            component={Home}
            options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;