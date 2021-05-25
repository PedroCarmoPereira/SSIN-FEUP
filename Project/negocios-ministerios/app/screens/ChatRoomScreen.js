import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { api, getToken } from '../utils/Api';


function ChatRoomScreen({ route, navigation }) {

  const [token, setToken] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  function buildMessages(data) {
    let msgs = [];
    data.forEach(elem => {
      let uid = user_id === elem.sender_id ? 1 : 2;
      msgs.push({
        _id: elem.id,
        text: elem.content,
        createdAt: new Date(elem.sent_date).getTime(),
        user: {
          _id: uid,
          name: elem.sender_name
        }
      });
    });
    setMessages(msgs.reverse());
  }

  const getUser = async () => {
    api.get('/api/user', {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(async (response) => {
        if (response.status == 200) {
          setUserId(response.data.data.id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchData = async () => {
    api.get('/api/messages/' + user_id + '/' + 1, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(async (response) => {
        if (response.status == 200) {
          buildMessages(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getToken().then(t => setToken(t));
  }, [])

  useEffect(() => {
    if (token)
      getUser();
  }, [token])

  useEffect(() => {
    if (token && user_id)
      fetchData();
  }, [user_id])

  // helper method that sends a message
  async function handleSend(newMessage = []) {
    api.post('/api/messages', {
      sender_id: user_id,
      receiver_id: 1,
      content: newMessage[0].text,
      sent_date: newMessage[0].createdAt
    }, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(async (response) => {
        if (response.status == 200) {
          setMessages(GiftedChat.append(messages, newMessage));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            // Here is the color change
            backgroundColor: '#c9c1e6'
          },
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