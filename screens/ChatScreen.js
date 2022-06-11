import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const renderSend = props => {
  return (
    <Send {...props}>
      <View>
        <MaterialCommunityIcons
          name="send-circle"
          size={32}
          color="#2e64e5"
          style={{marginRight: 5, marginBottom: 5}}
        />
      </View>
    </Send>
  );
};

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2e64e5',
        },
      }}
    />
  );
};

const scrollToBottomComponent = () => {
  return <FontAwesome name="angle-double-down" size={22} color="#333" />;
};
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend
      user={{
        _id: 1,
      }}
      scrollToBottom={true}
      renderSend={renderSend}
      renderBubble={renderBubble}
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;
