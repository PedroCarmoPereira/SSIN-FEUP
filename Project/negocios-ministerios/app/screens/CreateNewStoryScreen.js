import React from 'react';
import Card from '../shared/card';
import { Button, View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function CreateNewStoryScreen({navigator}) {
    
    const [textInputValue, setTextInputValue] = React.useState('');

    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
                <Card>
                    {/* Title */}
                    <Text style={styles.headerText} >Create New Story</Text>

                    {/* Title input box */}
                    <View style={styles.content}>
                        <Text>Title</Text>
                        <TextInput style={styles.titleInput}/>
                    </View>

                    {/* Story input box */}
                    <View style={styles.content}>
                        <Text>Story</Text>
                        <TextInput
                            style={styles.storyInput}
                            editable
                            multiline
                            onChangeText={text => setTextInputValue(text)}
                            value={textInputValue}
                        />
                    </View>

                    <View style={styles.publishButton}>
                        <Button title='Publish' color="red" width="20%"/>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontStyle: 'italic',
        marginHorizontal: 10,
    },
    content: {
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 10,
    },
    titleInput: {
        marginTop: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 4,
    },
    storyInput: {
        marginTop: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 325,
    	borderWidth: 1,
        textAlignVertical: 'top',
        padding: 4,
    },
    publishButton: {
        borderRadius: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
});

export default CreateNewStoryScreen;