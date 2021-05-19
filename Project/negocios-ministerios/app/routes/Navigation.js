import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  LandingScreenPage,
  ChatSearchPage,
  RequestVisaPage,
  LandingScreenAdminPage, 
  CreateNewStoryScreenPage, 
  RequestVisitPage, 
  RequestMissionPage, 
  AgentStatusPage, 
  DecisionVisitPage, 
  DecisionVisasPage,
  ChatRoomScreenPage,
  headerComponent
} from './Pages';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const chatRooms = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatSearchPage}
        options={headerComponent}
        navigation={navigation}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreenPage}
        options={headerComponent}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

const homeAdmin = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeAdmin"
        component={LandingScreenAdminPage}
        options={headerComponent}
        navigation={navigation}
      />
      <Stack.Screen
        name="NewStory"
        component={CreateNewStoryScreenPage}
        options={headerComponent}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

const Home = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerPosition='right'>
      <Drawer.Screen
        name="Home"
        component={LandingScreenPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="Chat"
        component={chatRooms}
        navigation={navigation}
      />
      <Drawer.Screen
        name="Visits"
        component={RequestVisitPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="Visas"
        component={RequestVisaPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="Missions"
        component={RequestMissionPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="Agents"
        component={AgentStatusPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="DecisionVisit"
        component={DecisionVisitPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="DecisionVisas"
        component={DecisionVisasPage}
        navigation={navigation}
      />
      <Drawer.Screen
        name="HomeAdmin"
        component={homeAdmin}
        navigation={navigation}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;