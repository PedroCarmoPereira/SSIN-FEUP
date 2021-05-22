import React, {useEffect, useState} from 'react';
import { Text, View, Picker, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
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

function RequestVisit(props) {
    
    const [selectedValue, setSelectedValue] = useState("");

    const [requester_id, setUser] = useState(null);
    const [motive, setMotive] = useState(null);
    const [set_date, setDate] = useState(null);

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
    
    const setAppointment = async () => {

        let t = await getToken();
        api.post('/api/appointment', {
            requester_id,
            motive,
            set_date
        }, {
            headers:{
                'Authorization': `${t}`
            }
        })
        .then(async (response) => {
            if (response.status == 200) {
                alert('Visit scheduled!');
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
                    <Text style={globalStyles.TitleText} > Marcar Visita </Text>

                    <Text > Motive *</Text>
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
                            onDateChange={set_date => setDate(set_date)}
                        />
                        <Button
                        onPress={setAppointment}
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

export default RequestVisit;