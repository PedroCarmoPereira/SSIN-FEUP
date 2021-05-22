import React, {useEffect, useState} from 'react';
import Card from '../shared/card';
import { Button, View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { api, storeToken, getToken } from '../utils/Api';

function CreateNewStoryScreen({navigator}) {
    
    const [id, setUser] = useState(null);
    const [title, setTitle] = useState(null);
    const [article, setArticle] = useState(null);

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

    const publishStory = async () => {
        
        console.log('Data: ');
        console.log(id);
        console.log(title);
        console.log(article);

        let t = await getToken();
        console.log(t);
        api.post('/api/stories', {
            headers:{
                'Authorization': `${t}`
            },
            title,
            article,
            id
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
                <Card>
                    {/* Title */}
                    <Text style={styles.headerText} >Create New Story</Text>

                    {/* Title input box */}
                    <View style={styles.content}>
                        <Text>Title</Text>
                        <TextInput
                            onChangeText={title => setTitle(title)}
                            value={title}
                            style={styles.titleInput}
                        />
                    </View>

                    {/* Story input box */}
                    <View style={styles.content}>
                        <Text>Story</Text>
                        <TextInput
                            style={styles.storyInput}
                            editable
                            multiline
                            onChangeText={article => setArticle(article)}
                            value={article}
                        />
                    </View>

                    <View style={styles.publishButton}>
                        <Button
                            onPress={publishStory}
                            title='Publish'
                            color="red"
                            width="20%"
                        />
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