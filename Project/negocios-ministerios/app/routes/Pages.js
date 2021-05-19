import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import DecisionVisas from '../screens/DecisionVisas';

const Stack = createStackNavigator();

const CreateNewStoryScreenPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="NewStory"
              component={CreateNewStoryScreen}
              options={{ headerShown: false }}
              navigation={navigation}
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
              options={{ headerShown: false }}
              navigation={navigation}
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
              navigation={navigation}
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
              navigation={navigation}
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
              navigation={navigation}
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
              navigation={navigation}
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
              navigation={navigation}
          />
        </Stack.Navigator>
    );
};
const DecisionVisasPage = ({navigation}) => {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="DecisionVisas"
              component={DecisionVisas}
              options={headerComponent}
              navigation={navigation}
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
              navigation={navigation}
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


export {headerComponent};
export {AgentStatusPage};
export {LandingScreenPage};
export {RequestVisaPage};
export {RequestVisitPage};
export {RequestMissionPage};
export {LandingScreenAdminPage};
export {CreateNewStoryScreenPage};
export {DecisionVisitPage};
export {DecisionVisasPage};
