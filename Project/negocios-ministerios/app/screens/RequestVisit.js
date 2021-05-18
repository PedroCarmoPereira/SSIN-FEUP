import React, { useState } from 'react';
import { Text, View, Picker, StyleSheet ,Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles/globalStyles';
import CalendarPicker from 'react-native-calendar-picker';

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
    const [value, onChangeText] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <View style={styles.container}>
            <Text style={globalStyles.TitleText} > Marcar Visita </Text>

            <Text > Ministry* </Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>

            <Text > Motive </Text>
            <View
                style={styles.picker}>
                <UselessTextInput
                    multiline
                    numberOfLines={10}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
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
        </View>

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
});

export default RequestVisit;