import React, {useEffect, useState} from 'react';
import { Text, View, Picker, StyleSheet, Button, SafeAreaView, ScrollView} from 'react-native';
import Card from '../shared/card';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import CalendarPicker from 'react-native-calendar-picker';
import { api, getToken } from '../utils/Api';

const UselessTextInput = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={40}
        />
    );
}

function RequestVisa(props) {
    const [value, onChangeText] = React.useState('');
    
    const [requester_id, setUser] = useState(null);
    const [motive, setMotive] = useState(null);
    const [applied, setDate] = useState(null);

    const getUser = async () => {
        let t = await getToken();
        api.get('/api/user', {
            headers:{
                'Authorization': `${t}`
            }
        })
        .then(async (response) => {
            if (response.status == 200) {
                setUser(response.data.data.id);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
        getUser();
    }, []);
    
    const requestVisa = async () => {
        console.log('Data: ');
        console.log(requester_id);
        console.log(motive);
        console.log(applied);
        let t = await getToken();
        console.log(t);
        api.post('/api/appointment', {
            headers:{
                'Authorization': `${t}`
            },
            motive,
            applied,
            requester_id
        })
        .then(async (response) => {
            if (response.status == 200) {
                console.log(response);
                alert('Success!');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
                <Card style={styles.container}>
                    <Text style={globalStyles.TitleText} > Pedido de Visto </Text>

                    <Text > Motive* </Text>
                    <View
                        style={styles.picker}>
                        <UselessTextInput
                            style={styles.motiveInput}
                            multiline
                            numberOfLines={10}
                            onChangeText={motive => setMotive(motive)}
                            value={motive}
                        />
                    </View>

                    <Text > Date* </Text>
                    <View >
                        <CalendarPicker
                            onDateChange={applied => setDate(applied)}
                        />
                        <Button
                        onPress={requestVisa}
                        title='Marcar'
                        color="red"
                        style={globalStyles.getStartedButton}
                    />
                    </View>
                    </Card>
            </ScrollView>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
        height: "95%",
        padding: 10
    },
    picker: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    input: {
        height: "50%",
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    motiveInput: {
        textAlignVertical: 'top',
        padding: 4,
    },
});

export default RequestVisa;