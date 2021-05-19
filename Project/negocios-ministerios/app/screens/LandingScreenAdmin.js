import React from 'react';
import { Button, View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../shared/card';

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

// Aux loop to create more cards
let cards = [];

for(let i = 0; i < 3; i++){

    cards.push(
        <Card>
            {/* card header */}
            <View key = {i} style={styles.header}>
                <Image source={require("../assets/Apostrophe_icon.png")} />
                <Text style={styles.headerText}>
                    How it all began...
                </Text>

                {/* Remove Button */}
                <TouchableOpacity onPress={null} activeOpacity={0.5} style={styles.deleteIcon}>
                    <Image source={require("../assets/delete_icon.png")} />
                </TouchableOpacity>
            </View>

            {/* Card content */}
            <View style={styles.content}>
                <Text>
                    The history of Portugal can be traced from circa 400,000 years ago, when the region of present-day Portugal was inhabited by Homo heidelbergensis. The oldest human fossil is the skull discovered in the Cave of Aroeira in Almonda. Later Neanderthals roamed the northern Iberian peninsula. Homo sapiens arrived in Portugal around 35,000 years ago.
                </Text>
            </View>

            {/* Card footer */}
            <View style={styles.footer}>
                <Image source={require("../assets/Avatar.png")} />
                
                <View style={styles.footerText}>
                    {/* Name */}
                    <Text style={styles.footerTextName}>
                        Tiago Ligação
                    </Text>
                    {/* Ocupation */}
                    <Text style={styles.footerTextOcupation}>
                        Minister
                    </Text>
                </View>
                
            </View>
        </Card>
    )
}

function LandingScreenAdmin({navigation}) {
    
    const newStoryPressHandler = () => {
        navigation.navigate('NewStory');
    }

    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
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

                { cards }
            </ScrollView>
        </SafeAreaView >
    );
}

export default LandingScreenAdmin;