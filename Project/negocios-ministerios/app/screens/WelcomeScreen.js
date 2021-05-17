import React from 'react';
import { View, Platform, Image, Button, ImageBackground } from 'react-native';
import globalStyles from '../styles/globalStyles';

function WelcomeScreen({navigation}) {

    const pressHandler = () => {
        navigation.navigate('LoginScreen');
    }

    return (
        <ImageBackground source={require('../assets/Background.png')} style={globalStyles.container}>
            <Image
                fadeDuration = {1000}
                style={globalStyles.welcomeLogo}
                source={require("../assets/extended_icon.png")}
            />
            <Button
                title='Get Started'
                onPress={pressHandler}
                color="red"
                style={globalStyles.getStartedButton}
            />
        </ImageBackground>
    );
}

export default WelcomeScreen;