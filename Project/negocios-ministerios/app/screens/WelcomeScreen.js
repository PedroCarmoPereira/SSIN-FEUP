import React from 'react';
import { View, Platform, Image, Button } from 'react-native';
import globalStyles from '../styles/globalStyles';

function WelcomeScreen({navigation}) {

    const pressHandler = () => {
        navigation.push('LandingScreen');
    }

    return (
        <View style={globalStyles.container}>
            <Image
                fadeDuration = {1000}
                style={globalStyles.welcomeLogo}
                source={require("../assets/extended_icon.png")}
            />
            <Button title='Get Started' onPress={pressHandler} />
        </View>
    );
}

export default WelcomeScreen;