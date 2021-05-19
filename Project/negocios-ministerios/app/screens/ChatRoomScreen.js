import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { GiftedChat, Bubble  } from 'react-native-gifted-chat';

function ChatRoomScreen({route, navigation}) {

    console.log('Route: ');
    console.log(route);
    console.log('Navigation:');
    console.log(navigation);
    
    const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().getTime(),
        system: true
    },
    // example of chat message
    {
        _id: 1,
        text: 'Henlo!',
        createdAt: new Date().getTime(),
        user: {
        _id: 2,
        name: 'Test User'
        }
    }
    ]);

    // helper method that is sends a message
    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage));
    }

    function renderBubble(props) {
        return (
          // Step 3: return the component
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                // Here is the color change
                backgroundColor: '#6646ee'
              }
            }}
            textStyle={{
              right: {
                color: '#fff'
              }
            }}
          />
        );
      }

    return (
    <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        alwaysShowSend
    />
    );
}

export default ChatRoomScreen;