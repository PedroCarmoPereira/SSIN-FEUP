import React, {useState} from 'react';
import { Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import { api, storeToken } from '../utils/Api';

function LoginScreen({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const pressHandler = () => {

        api.post('/api/register', {
            username,
            password,
        })
          .then(async (response) => {
            if (response.status == 200) {
                storeToken(response.data.token);
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <ImageBackground source={require('../assets/Background.png')} style={globalStyles.container}>

            <Text>Login</Text>

            <View>
                <Text>Username</Text>
                <TextInput onChangeText={setUsername}
                value={username} style={globalStyles.TextInput}/>
                <Text>Password</Text>
                <View>
                    <TextInput onChangeText={setPassword}
                    value={password} style={globalStyles.TextInput} secureTextEntry/>
                </View>
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