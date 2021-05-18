import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatSearch from '../screens/ChatSearch';
import LandingScreen from '../screens/LandingScreen';
import LandingScreenAdmin from '../screens/LandingScreenAdmin';
import Header from '../shared/header';
import HeaderLogo from '../shared/headerLogo';
import RequestVisa from '../screens/RequestVisa';
import CreateNewStoryScreen from '../screens/CreateNewStoryScreen';
import RequestVisit from '../screens/RequestVisit';
import RequestMission from '../screens/RequestMission';
import AgentStatus from '../screens/AgentStatus';
import DecisionVisit from '../screens/DecisionVisit';

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

const RequestVisaPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="RequestVisa"
              component={RequestVisa}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

const RequestVisitPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="RequestVisit"
              component={RequestVisit}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

const AgentStatusPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="AgentStatus"
              component={AgentStatus}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

const DecisionVisitPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="DecisionVisit"
              component={DecisionVisit}
              options={headerComponent}
          />
        </Stack.Navigator>
    );
};

const RequestMissionPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="RequestMission"
              component={RequestMission}
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



export {AgentStatusPage};
export {LandingScreenPage};
export {ChatSearchPage};
export {RequestVisaPage};
export {RequestVisitPage};
export {RequestMissionPage};
export {LandingScreenAdminPage};
export {CreateNewStoryScreenPage};
export {DecisionVisitPage};
