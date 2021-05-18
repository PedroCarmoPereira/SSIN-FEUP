import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatSearch from '../screens/ChatSearch';
import LandingScreen from '../screens/LandingScreen';
import LandingScreenAdmin from '../screens/LandingScreenAdmin';
import Header from '../shared/header';
import HeaderLogo from '../shared/headerLogo';
import CreateNewStoryScreen from '../screens/CreateNewStoryScreen';

const Stack = createStackNavigator();

const CreateNewStoryScreenPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="New Story"
              component={CreateNewStoryScreen}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

const LandingScreenAdminPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="LandingScreenAdmin"
              component={LandingScreenAdmin}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

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
export {LandingScreenAdminPage};
export {CreateNewStoryScreenPage};