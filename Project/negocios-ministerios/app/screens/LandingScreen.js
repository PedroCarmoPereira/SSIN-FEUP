import React from 'react';
import { Button, View, Image, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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
        <Card key = {i}>
            {/* card header */}
            <View style={styles.header}>
                <Image source={require("../assets/Apostrophe_icon.png")} />
                <Text style={styles.headerText}>
                    How it all began...
                </Text>
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

function LandingScreen(props) {
    return (
        <SafeAreaView  style={{flex: 1}}>
            <ScrollView>
                { cards }
            </ScrollView>
        </SafeAreaView >
    );
}

export default LandingScreen;