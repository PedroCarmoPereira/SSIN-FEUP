import React from 'react';
import { View, Platform, Image, Button, ImageBackground, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

function HeaderLogo({navigation}) {
    
    const pressHandler = () => {
        navigation.navigate('Home');
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
        paddingTop: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '69px',
        height: '84px',
    },
});

export default HeaderLogo;