import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Header({navigation}) {
    
    const pressHandler = () => {
        navigation.openDrawer();
    }

    return (
        <View tyle={styles.header}>
        <ImageBackground source={require('../assets/HeaderBackground.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} style={styles.Icon} onPress={pressHandler}/>
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        margin: 0,
        padding: 0,
        marginBottom: '5%'
    },
    header: {
        margin:0,
        padding:0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: '9%',
        width:'105%',
        resizeMethod: 'auto',
        resizeMode: 'repeat'
    },
    Icon: {
        top:'-5%',
        right: 0
    }
});

export default Header;