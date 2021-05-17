import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

function Header({navigation}) {
    
    const pressHandler = () => {
        // navigation.openDrawer();
        console.log('Drawer Menu Icon Pressed')
    }

    return (
        <View style={styles.header}>
            <Image
                
                source={require('../assets/Logo Portugal.png')}
            />
            <View>
                <Text>Hello</Text>
            </View>
            <MaterialIcons name='menu' size={28} style={styles.Icon} onPress={pressHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    Icon: {
        position: 'absolute',
        right: 0
    }
});

export default Header;