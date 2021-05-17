import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatSearch from '../screens/ChatSearch';
import LandingScreen from '../screens/LandingScreen';
import Header from '../shared/header';
import HeaderLogo from '../shared/headerLogo';

const Stack = createStackNavigator();

const LandingScreenPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};
  
const ChatSearchPage = ({navigation}) => {
    return (
      <Stack.Navigator>
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
};

export {LandingScreenPage};
export {ChatSearchPage};