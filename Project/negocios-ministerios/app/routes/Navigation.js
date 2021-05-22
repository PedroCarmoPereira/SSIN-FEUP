import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { api } from '../utils/Api';
import {
  LandingScreenPage,
  RequestVisaPage,
  RequestVisitPage, 
  RequestMissionPage, 
  AgentStatusPage, 
  DecisionVisitPage, 
  DecisionVisasPage,
  chatRooms,
  homeAdmin
} from './Pages';
import { getToken } from '../utils/Api';
import { View } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
  
  const [isReady, setReady] = React.useState(false);
  const [token, setToken] = React.useState(null);
  
  const setup = async () => {
    let t = await getToken();
    api.get('/api/token',{
      headers:{
        'Authorization': `${t}`
      }
    }).then(async (response) => {
      if (response.status == 200) setToken(t);
    })
  } 
  React.useEffect(() => {
    setup().then(() => setReady(true));
  });

  if (!isReady) return <View style={{backgroundColor:'red'}}></View>
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        {token == null ? (
          <>
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
          </>
        ) : (
          <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        )}
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;