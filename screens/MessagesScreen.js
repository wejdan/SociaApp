import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
const stringTruncate = function (str, length) {
  var dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];
const MessagesScreen = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      {Messages.map(message => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatScreen', {
                user: message.userName,
              });
            }}
            key={message.id}
            style={styles.card}>
            <Image
              source={message.userImg}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View
              style={{
                marginLeft: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  {message.userName}
                </Text>
                <Text>{message.messageTime}</Text>
              </View>

              <View style={{marginBottom: 5, marginTop: 2}}>
                <Text>{stringTruncate(message.messageText, 43)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MessagesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 1,
    alignItems: 'center',
  },
  link: {
    color: '#2e64e5',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
});
