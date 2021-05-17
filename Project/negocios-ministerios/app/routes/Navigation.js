import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatSearch from '../screens/ChatSearch';
import LandingScreen from '../screens/LandingScreen';
import Header from '../shared/header';
import HeaderLogo from '../shared/headerLogo';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Pages = ({navigation}) => {
  return (
    <Stack.Navigator mode="modal">
        <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={headerComponent}
        />
        <Stack.Screen
            name="ChatSearch"
            component={ChatSearch}
            options={headerComponent}
        />
      </Stack.Navigator>
  );
};

const headerComponent = ({navigation}) => { 
  return {
    headerTitle: () => (<Header navigation={navigation}/>),
    headerLeft: () => (<HeaderLogo navigation={navigation} />),
  }
}

const Home = ({navigation}) => {
    return (
      <Drawer.Navigator drawerPosition='right'>
        <Drawer.Screen
          name="Home"
          component={Pages}
        />
        <Drawer.Screen
          name="ChatSearch"
          component={Pages}
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