import React, { useState } from 'react';
import { Text, View, Picker, StyleSheet ,Button, SafeAreaView, ScrollView} from 'react-native';
import Card from '../shared/card';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import CalendarPicker from 'react-native-calendar-picker';


function RequestMission(props) {
    const [value, onChangeText] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
                <Card style={styles.container}>
                    <Text style={globalStyles.TitleText} > Marcar Missão </Text>

                    <Text > City* </Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <Text > Agent Name* </Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <Text > Description </Text>
                    <View
                        style={styles.input}>
                        <TextInput/>
                    </View>

                    <Text > Date* </Text>
                    <View >
                        <CalendarPicker
                        />
                        <Button
                        onPress={() => {
                            if (this.state.text.trim() === "") {
                            this.setState(() => ({ nameError: "First name required." }));
                            } else {
                            this.setState(() => ({ nameError: null }));
                            }
                        }}
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