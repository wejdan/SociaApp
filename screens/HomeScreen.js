import {View, Text, FlatList, ScrollView} from 'react-native';
import PostCard from '../components/PostCard';

import React, {useState} from 'react';
import {logout} from '../store/actions/userActions';
import Button from '../components/FormButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {
  addPost,
  getAllPosts,
  addPostAction,
  deletePostAction,
  updatePostAction,
} from '../store/actions/postsActions';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store.posts.postsList);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Posts')
      .orderBy('postTime', 'asc')
      .onSnapshot(snapshot => {
        setLoading(false);
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          console.log('------------------------', change.type);
          if (change.type == 'added') {
            dispatch(addPostAction({...change.doc.data(), id: change.doc.id}));
          } else if (change.type == 'removed') {
            dispatch(deletePostAction(change.doc.id));
          } else if (change.type == 'modified') {
            dispatch(
              updatePostAction({...change.doc.data(), id: change.doc.id}),
            );
          }
        });
      });

    return () => subscriber();
  }, []);
  if (loading) {
    return (
      <ScrollView
        style={{flex: 1, paddingHorizontal: 15}}
        contentContainerStyle={{alignItems: 'center'}}>
        <SkeletonPlaceholder>
          <View
            style={{
              marginVertical: 15,
              borderRadius: 6,
              paddingTop: 20,
              paddingBottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '97%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <View style={{width: 50, height: 50, borderRadius: 25}} />
                <View style={{marginLeft: 10}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 15, marginTop: 10}}>
              <View
                style={{
                  marginTop: 6,
                  width: 300,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{width: '100%', height: 200}} />
          </View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              marginVertical: 15,
              borderRadius: 6,
              paddingTop: 20,
              paddingBottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '97%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <View style={{width: 50, height: 50, borderRadius: 25}} />
                <View style={{marginLeft: 10}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 20, marginTop: 10}}>
              <View
                style={{
                  marginTop: 6,
                  width: 300,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{width: '100%', height: 200}} />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{
            minIndexForVisible: 1,
          }}
          style={{flex: 1, paddingHorizontal: 15}}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <PostCard post={item} />;
          }}></FlatList>
      </View>
    </View>
  );
};

export default HomeScreen;
