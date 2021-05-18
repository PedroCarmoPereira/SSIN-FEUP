import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {LandingScreenPage, ChatSearchPage, RequestVisaPage, LandingScreenAdminPage, CreateNewStoryScreenPage, RequestVisitPage,RequestMissionPage} from './Pages';
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
          name="Chat"
          component={ChatSearchPage}
        />
        <Drawer.Screen
          name="Visits"
          component={RequestVisitPage}
        />
         <Drawer.Screen
          name="Visas"
          component={RequestVisaPage}
        />
        <Drawer.Screen
          name="Missions"
          component={RequestMissionPage}
        />
       
        
        <Drawer.Screen
          name="HomeAdmin"
          component={LandingScreenAdminPage}
        />
        <Drawer.Screen
            name="New Story"
            component={CreateNewStoryScreenPage}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null
            }}
        />
      </Drawer.Navigator>
    );
};

const Routes = () => {
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