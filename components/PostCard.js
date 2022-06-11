import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {like, deletePost} from '../store/actions/postsActions';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import ProgressiveImage from './ProgressiveImage';
import {useNavigation} from '@react-navigation/native';
const PostCard = ({post}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const usersList = useSelector(store => store.users.usersList);
  const user = useSelector(store => store.user.user);
  const [userData, setUserData] = useState(null);
  const [likes, setLikes] = useState(post.likedBy);

  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();
  const deleteImg = url => {
    let storageRef = storage().refFromURL(url);
    const imageRef = storage().ref(storageRef.fullPath);
    //2.
    imageRef
      .delete()
      .then(() => {
        //3.
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deletePostHandler = async () => {
    deleteImg(post.postImg);
    dispatch(deletePost(post.id));
  };
  useEffect(() => {
    if (isFocused) {
      usersList.map((user, index) => {
        if (user.id == post.userId) {
          setUserData(user);
        }
      });
    }

    setLikes(post.likedBy);
  }, [post, isFocused]);
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '97%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeProfile', {userId: post.userId});
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            width: '100%',
          }}>
          {userData && (
            <Image
              source={{uri: userData.userImg}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          )}
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {userData?.fname + ' ' + userData?.lname}
            </Text>
            <Text style={{fontSize: 10}}>
              {moment(post.postTime.toDate()).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>

        {post.userId == user.uid && (
          <View>
            <OptionsMenu
              customButton={<Feather name="more-vertical" size={22} />}
              buttonStyle={{
                width: 32,
                height: 8,
                margin: 7.5,
                resizeMode: 'contain',
              }}
              destructiveIndex={1}
              options={['Delete', 'Cancel']}
              actions={[deletePostHandler]}
            />
          </View>
        )}
      </View>

      <View style={{marginVertical: 20, paddingHorizontal: 20}}>
        <Text>{post.post}</Text>
      </View>
      {post.postImg && (
        <View style={{alignItems: 'center'}}>
          <ProgressiveImage
            source={post.postImg}
            defaultImageSource="https://github.com/itzpradip/react-native-firebase-social-app/blob/master/assets/default-img.jpg?raw=true"
            style={{width: '100%', height: 200}}
          />
        </View>
      )}
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.action}>
          {likes.includes(user.uid) ? (
            <TouchableOpacity
              disabled={post.userId == user.uid}
              onPress={() => {
                setLikes(likes.filter(item => item != user.uid));
                dispatch(
                  like(
                    post,
                    likes.filter(item => item != user.uid),
                  ),
                );
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#e3eaf2',
                borderRadius: 6,
                paddingHorizontal: 6,
                paddingVertical: 4,
              }}>
              <Ionicons name="heart" size={22} color="#265ae1" />
              <Text
                style={{
                  marginLeft: 5,
                  color: '#265ae1',
                }}>
                {likes.length > 0 ? likes.length : ''} Likes
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={post.userId == user.uid}
              onPress={() => {
                setLikes([user.uid, ...likes]);
                dispatch(like(post, [user.uid, ...likes]));
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 6,
                paddingHorizontal: 6,
                paddingVertical: 4,
              }}>
              <Ionicons name="heart-outline" size={22} />
              <Text style={{marginLeft: 5}}>
                {likes.length > 0 ? likes.length : ''} Likes
              </Text>
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="comment-o" size={22} />
            <Text style={{marginLeft: 5}}>{post.comments} Comments</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7f7f7',
    marginVertical: 15,
    borderRadius: 6,
    paddingTop: 20,
    paddingBottom: 0,
  },
  action: {
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  disabled: {
    backgroundColor: '#e3e3e3',
    elevation: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#a9abb8',
  },
});
