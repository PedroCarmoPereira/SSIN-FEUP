import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';



function DecisionVisit() {
    list = [
        { key: '1', bruh: '../assets/Avatar.png', position: "Minister", ministerName: "Minister Name", name: "Tiago Ligação", date: "10/12/2021" },
        { key: '2', bruh: '../assets/Avatar.png', position: "Minister", ministerName: "Minister Name", name: "Pedro Matos", date: "19/12/2021" },
        { key: '3', bruh: '../assets/Avatar.png', position: "Minister", ministerName: "Minister Name", name: "Afonso Santos", date: "22/12/2021" },
        { key: '4', bruh: '../assets/Avatar.png', position: "Minister", ministerName: "Minister Name", name: "Tiago Ligação", date: "30/12/2021" },
    ];
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={list}
                    renderItem={({ item }) =>
                        <View style={styles.item}>
                            <View style={styles.avatar}>
                                <Image source={require("../assets/Avatar.png")} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text >{item.name}</Text>
                                    <Text >{item.position}</Text>
                                </View>
                            </View>
                            <View style={styles.status}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={styles.location}>{item.ministerName}</Text>
                                    <Text style={styles.location}>{item.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row',alignSelf: 'flex-end'}}>
                                    <View style ={{backgroundColor: 'red',borderRadius: 20, margin:3}}>
                                    <Button title='Reject'/>
                                    </View>
                                    <View style ={{backgroundColor: 'green',borderRadius: 20, margin:3}}>
                                    <Button title='Accept'/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: "95%",
    },
    item: {
        padding: 5,
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row'
    },
    location: {
        textAlign: 'right',
        fontSize: 20
    }
    ,
    avatar: {
        flex: 0.3,
        flexDirection: 'row'
    },
    status: {
        flex: 0.7,

        flexDirection: 'column'
    }

});

export default DecisionVisit;