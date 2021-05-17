import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Header({navigation}) {
    
    const pressHandler = () => {
        // navigation.openDrawer();
        console.log('Drawer Menu Icon Pressed')
    }

    return (
        <ImageBackground source={require('../assets/HeaderBackground.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} style={styles.Icon} onPress={pressHandler}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: -100
    },
    Icon: {
        right: 0
    }
});

export default Header;