import {
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PostCard from '../components/PostCard';
import React, {useEffect, useState} from 'react';
import {logout} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {getAllUsers} from '../store/actions/usersActions';
import LoadingOverlay from '../components/LoadingOverlay';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store.posts.postsList);
  const user = useSelector(store => store.user.user);
  // This hook returns `true` if the screen is focused, `false` otherwise
  const userId = route.params?.userId != null ? route.params.userId : user.uid;
  const userPosts = posts.filter(item => item.userId == userId);

  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    try {
      const currentUser = await firestore()
        .collection('Users')
        .doc(userId)
        .get();
      setUserData(currentUser.data());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);
  if (userData == null) {
    return (
      <ScrollView
        style={{flex: 1, padding: 10}}
        contentContainerStyle={{alignItems: 'center'}}>
        <SkeletonPlaceholder>
          <View style={{alignItems: 'center', marginTop: 50}}>
            <View
              style={{
                marginTop: 6,
                width: 150,
                height: 150,
                borderRadius: 70,
              }}
            />
            <View style={{marginTop: 8, alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 6,
                  width: 150,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 200,
                  height: 15,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              marginB: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 6,
                  width: 70,
                  height: 100,
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 6,
                  width: 70,
                  height: 100,
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 6,
                  width: 70,
                  height: 100,
                  borderRadius: 4,
                }}
              />
            </View>
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white', padding: 10}}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Image
          source={{uri: userData.userImg}}
          style={{width: 150, height: 150, borderRadius: 70}}
        />
        <View style={{marginTop: 8}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 18,
            }}>{`${userData.fname || ''} ${userData.lname || ''} `}</Text>
        </View>
        <Text>{userData.about || 'No details added.'}</Text>
        {user.uid == userId ? (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}>
              <Text style={styles.outlineButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                dispatch(logout());
              }}>
              <Text style={styles.outlineButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                navigation.navigate('HomeChat', {user: userData.fname});
              }}>
              <Text style={styles.outlineButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                dispatch(logout());
              }}>
              <Text style={styles.outlineButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20}}>
            {userPosts.length}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20}}>
            10,000
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20}}>
            100
          </Text>
          <Text>Following</Text>
        </View>
      </View>
      {userPosts.map(post => {
        return <PostCard post={post} key={post.id} />;
      })}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  outlineButton: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2a59e0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 6,
  },
  outlineButtonText: {
    color: '#2a59e0',
    fontSize: 16,
  },
});
