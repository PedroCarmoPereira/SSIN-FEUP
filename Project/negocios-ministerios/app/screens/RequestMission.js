import React, {useEffect, useState} from 'react';
import { Text, View, Picker, StyleSheet ,Button, SafeAreaView, ScrollView} from 'react-native';
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

function RequestMission(props) {
    const [value, onChangeText] = React.useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    // employee_id, content, op_date

    const [users, setUsers] = useState(null);
    const [employee_id, setEmployee] = useState(null);
    const [content, setContent] = useState(null);
    const [op_date, setDate] = useState(null);

    const getUsers = async () => {
        let t = await getToken();
        api.get('/api/users', {
            headers:{
                'Authorization': `${t}`
            }
        })
        .then(async (response) => {
            if (response.status == 200) {
                setUsers(response.data.data);
                console.log(response.data.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
        getUsers();
    }, []);
    
    const setMission = async () => {
        console.log('Data: ');
        console.log(employee_id);
        console.log(content);
        console.log(op_date);
        let t = await getToken();
        console.log(t);
        api.post('/api/appointment', {
            headers:{
                'Authorization': `${t}`
            },
            employee_id,
            content,
            op_date
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

    let userItems = users != undefined ? users.map( (s, i) => {
        return <Picker.Item key={s.id} value={s.name} label={s.name} />
    }) : [];

    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
                <Card style={styles.container}>
                    <Text style={globalStyles.TitleText} > Marcar Missão </Text>

                    <Text > Agent Name* </Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={employee_id}
                            onValueChange={(employee_id) => setEmployee(employee_id)}
                        >
                            {userItems}
                        </Picker>
                    </View>
                    <Text > Description </Text>
                    <View
                        style={styles.input}>
                        <UselessTextInput
                            style={styles.motiveInput}
                            multiline
                            numberOfLines={10}
                            onChangeText={content => setContent(content)}
                            value={content}
                        />
                    </View>

                    <Text > Date* </Text>
                    <View >
                        <CalendarPicker
                            onDateChange={op_date => setDate(op_date)}
                        />
                        <Button
                        onPress={setMission}
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
        height: "10%",
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default RequestMission;