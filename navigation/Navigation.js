import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AddPostScreen from '../screens/AddPostScreen';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfileScreen from '../screens/EditProfile2';

import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  loginAction,
  logoutAction,
  setLoading,
} from '../store/actions/userActions';
import {
  getAllUsers,
  addUser,
  getUsers,
  setUsersAction,
} from '../store/actions/usersActions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingOverlay from '../components/LoadingOverlay';
import firestore from '@react-native-firebase/firestore';
import MapScreen from '../screens/MapScreen';
import AnimationScreen from '../screens/AnimationScreen';
import Bottom from '../screens/Bottom';

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [alreadyLaunched, setAlreadyLaunched] = useState(null);
  let routeName;
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      console.log(value);
      if (value !== null) {
        setAlreadyLaunched(true);
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setAlreadyLaunched(false);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (alreadyLaunched == null) {
    return null;
  } else if (alreadyLaunched == true) {
    routeName = 'Login';
  } else {
    routeName = 'OnBoardingScreen';
  }
  console.log(routeName);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routeName}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'RN SocialApp',
          headerTintColor: '#265ae1',
          headerTitleAlign: 'center',
          headerRight: () => (
            <MaterialIcons
              onPress={() => {
                navigation.navigate('AddPost');
              }}
              name="add"
              size={22}
              color="#265ae1"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={{
          title: '',

          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{marginLeft: 15}}>
              <Ionicons name="arrow-back" size={25} color="#2e64e5" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="HomeChat"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.user,
        })}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{headerShown: false}}
        component={ProfileScreen}
      />

      <Stack.Screen
        name="EditProfileScreen"
        options={{title: 'Edit'}}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
}
function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagesScreen"
        options={{title: 'Messages'}}
        component={MessagesScreen}
      />

      <Stack.Screen
        name="ChatScreen"
        options={({route}) => ({
          title: route.params.user,
        })}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function AuthenticatedTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'MessagesStack') {
            iconName = 'message';
          } else if (route.name === 'ProfileStack') {
            iconName = 'person';
          } else if (route.name === 'MapScreen') {
            iconName = 'map';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#265ae1',
      })}>
      <Tab.Screen
        name="HomeStack"
        options={{tabBarLabel: 'Home', title: 'Home'}}
        component={HomeStack}
      />
      <Tab.Screen
        name="MessagesStack"
        options={({route}) => ({
          tabBarStyle: {
            display:
              getFocusedRouteNameFromRoute(route) == 'ChatScreen'
                ? 'none'
                : 'flex',
          },
          tabBarLabel: 'Messages',
          title: 'Messages',
        })}
        component={MessagesStack}
      />

      <Tab.Screen
        name="ProfileStack"
        options={{tabBarLabel: 'Profile', title: 'Profile'}}
        component={ProfileStack}
      />

      <Tab.Screen
        name="MapScreen"
        options={{tabBarLabel: 'Explore', title: 'Explore'}}
        component={MapScreen}
      />
    </Tab.Navigator>
  );
}
export default function Navigation() {
  const dispatch = useDispatch();

  const loading = useSelector(store => store.user.loading);
  const user = useSelector(store => store.user.user);
  const usersList = useSelector(store => store.users.usersList);

  // Handle user state changes
  async function onAuthStateChanged(user) {
    console.log('user::::', user);

    if (user == null) {
      dispatch(logoutAction());
    } else {
      const users = await firestore().collection('Users').get();

      let list = [];
      users.forEach(item => {
        list.push({id: item.id, ...item.data()});
      });
      dispatch(setUsersAction(list));

      const foundUser = list.find(item => item.id == user.uid);
      console.log('foundUser', foundUser);
      if (!foundUser) {
        const userObj = {
          fname: user.displayName == 'null' ? '' : user.displayName,
          lname: '',
          email: user.email,
          createdAt: user.metadata.creationTime,
          userImg: user.photoURL
            ? user.photoURL
            : 'https://timesaver247.com/wp-content/uploads/2020/10/default-user-image.png',
        };
        console.log('userObj', userObj);
        dispatch(addUser(user.uid, userObj));
      }
      dispatch(loginAction(user));
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '346544647290-2gikmnfqs0egtthqo2ur8tog8h7k0g14.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading)
    return (
      <LottieView
        source={require('../assets/105599-moody-dog.json')}
        autoPlay
        loop
      />
    );
  return (
    <NavigationContainer>
      {user ? <AuthenticatedTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
