import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import WelcomeScreen from "../screens/WelcomeScreen";
import LandingScreen from '../screens/LandingScreen';

const screens = {
    WelcomeScreen: {
        screen: WelcomeScreen
    },
    LandingScreen: {
        screen: LandingScreen
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);