import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';


function colorFunc(state) {
    var colorString = "";
    if (state == "Working") {
        colorString = "#FAD92D"
    }
    if (state == "Available") {
        colorString = "#2CD671"
    }
    if (state == "Unavailable") {
        colorString = "#FF0000";
    }
    return colorString;
}


function AgentStatus() {
    list = [
        { key: '1', bruh: '../assets/Avatar.png', location: "Angola-Luanda", status: "Working", name: "Tiago Ligação" },
        { key: '2', bruh: '../assets/Avatar.png', location: "Porto-Quartel de Santo Ovidio", status: "Available", name: "Pedro Matos" },
        { key: '3', bruh: '../assets/Avatar.png', location: "N/A", status: "Unavailable", name: "Afonso Santos" },
        { key: '4', bruh: '../assets/Avatar.png', location: "Angola-Luanda", status: "Working", name: "Tiago Ligação" },
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
                                <Text style={{fontSize: 15}}>{item.name}</Text>
                            </View>
                            <View style={styles.status}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={styles.location}>{item.location}</Text>
                                </View>
                                <View style={{
                                    borderRadius: 30,
                                    marginLeft: '55%', backgroundColor: colorFunc(item.status)
                                }}>
                                    <Button disabled = {true} title={item.status} />
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
        borderRadius: 10,
        flexDirection: 'row'
    },
    location: {
        textAlign: 'right',
        fontSize: 20
    }
    ,
    avatar: {
        flex: 0.3,
        justifyContent: 'center',
    alignItems: 'center',
    },
    status: {
        flex: 0.7,

        flexDirection: 'column'
    }

});

export default AgentStatus;