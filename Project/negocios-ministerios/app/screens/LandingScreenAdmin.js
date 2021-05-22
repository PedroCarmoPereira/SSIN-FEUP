import React, {useEffect, useState} from 'react';
import { Button, View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Card from '../shared/card';
import { api, storeToken, getToken } from '../utils/Api';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 25,
        fontStyle: 'italic',
        marginHorizontal: 10,
    },
    deleteIcon: {
        position: 'absolute',
        right: 0
    },
    content: {
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    footerText: {
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    footerTextName: {
        
    },
    footerTextOcupation: {
        fontSize: 10,
        fontStyle: 'italic'
    }
});

function LandingScreenAdmin({navigation}) {

    const [data, setData] = useState(null);
    
    useEffect(() => {
        api.get('/api/stories')
        .then(async (response) => {
            if (response.status == 200) {
                setData(response.data.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    
    const newStoryPressHandler = () => {
        navigation.navigate('NewStory');
    }

    return (
        <SafeAreaView  style={{flex: 1}}>
                <Card>
                    <View style={styles.header}>

                        <TouchableOpacity onPress={newStoryPressHandler} activeOpacity={0.5}>
                            <Image source={require("../assets/add_circle.png")} />
                        </TouchableOpacity>

                        <Text style={styles.headerText}>
                            Create New Story
                        </Text>
                    </View>
                </Card>

                <FlatList
                    ListEmptyComponent={<Text>olaola</Text>}
                    data={data != null ? data : []}
                    keyExtractor={({ id }) => String(id)}
                    renderItem={(data) => (
                        <Card>
                            <View style={styles.header}>
                                <Image source={require("../assets/Apostrophe_icon.png")} />
                                <Text style={styles.headerText}>
                                    {data.item.title}
                                </Text>

                                {/* Remove Button */}
                                <TouchableOpacity onPress={null} activeOpacity={0.5} style={styles.deleteIcon}>
                                    <Image source={require("../assets/delete_icon.png")} />
                                </TouchableOpacity>
                            </View>

                            {/* Card content */}
                            <View style={styles.content}>
                                <Text
                                    multiline = {true}
                                >
                                    {data.item.article}
                                </Text>
                            </View>

                            {/* Card footer */}
                            <View style={styles.footer}>
                                <Image source={require("../assets/Avatar.png")} />

                                <View style={styles.footerText}>
                                    {/* Name */}
                                    <Text style={styles.footerTextName}>
                                        {data.item.author_id}
                                    </Text>
                                    {/* Ocupation */}
                                    <Text style={styles.footerTextOcupation}>
                                        Minister
                                    </Text>
                                </View>

                            </View>
                        </Card>
                    )}
                />
        </SafeAreaView >
    );
}

export default LandingScreenAdmin;