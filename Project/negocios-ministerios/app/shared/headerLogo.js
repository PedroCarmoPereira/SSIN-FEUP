import React from 'react';
import { View, Platform, Image, Button, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

function HeaderLogo({navigation}) {
    
    const pressHandler = () => {
        navigation.navigate('LandingScreen');
    }

    return (
        <TouchableOpacity onPress={pressHandler} activeOpacity={0.5}>
            <Image
                source={require('../assets/LogoPortugal.png')}
                sytles={styles.LogoPortugal}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    LogoPortugal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HeaderLogo;