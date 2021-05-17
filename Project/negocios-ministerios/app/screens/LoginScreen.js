import React from 'react';
import { Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';

function LoginScreen({navigation}) {
    
    const pressHandler = () => {
        navigation.navigate('Home');
    }

    return (
        <ImageBackground source={require('../assets/Background.png')} style={globalStyles.container}>

            <Text>Login</Text>

            <View>
                <Text>Email</Text>
                <TextInput style={globalStyles.TextInput}/>
                <Text>Password</Text>
                <TextInput style={globalStyles.TextInput}/>
            </View>
            
            <Button
                title='Login'
                onPress={pressHandler}
                color="red"
                style={globalStyles.getStartedButton}
            />
        </ImageBackground>
    );
}

export default LoginScreen;