import React, {useState, useEffect } from 'react';
import { Text, View, ImageBackground, Button, FlatList, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import { api, storeToken } from '../utils/Api';


const styles = StyleSheet.create({
    safeViewLogin: {
        flex: 1,
        alignContent: 'center'
    },
});


const styles = StyleSheet.create({
    safeViewLogin: {
        flex: 1,
        alignContent: 'center'
    },
});

function LoginScreen({navigation}) {

    const movieURL = "https://reactnative.dev/movies.json";

    const [isLoading, setLoading] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(movieURL)
            .then((response) => response.json())
            .then((json) => setMovies(json.movies))
            .catch((error) => alert(error))
            .finally(() => setLoading(false));
    });
    
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
        <SafeAreaView style={styles.safeViewLogin} >
            {isLoading ? (<ActivityIndicator/>) : (
                <ImageBackground source={require('../assets/Background.png')} style={globalStyles.container}>

                    <Text>Login</Text>
        
                    <View>
                        <Text>Email</Text>
                        <TextInput style={globalStyles.TextInput}/>
                        <Text>Password</Text>
                        <View>
                            <TextInput style={globalStyles.TextInput} secureTextEntry/>
                        </View>
                    </View>
                    
                    <Button
                        title='Login'
                        onPress={pressHandler}
                        color="red"
                        style={globalStyles.getStartedButton}
                    />

                    <FlatList
                        data={movies}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}) => (
                            <Text
                                key={item.id}
                            >
                                {item.title}
                                {item.releaseYear}
                            </Text>
                        )}
                    />
                </ImageBackground>
            )}
        </SafeAreaView>
    );
}

export default LoginScreen;