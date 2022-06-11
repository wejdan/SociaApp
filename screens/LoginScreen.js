import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Button from '../components/FormButton';
import Input from '../components/FormInput';
import {
  login,
  setError,
  signInWithGoogle,
  signInWithFacebook,
} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import SocialButton from '../components/SocialButton';
import {Dimensions} from 'react-native';
import LoadingOverlay from '../components/LoadingOverlay';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(store => store.user.error);
  const loading = useSelector(store => store.user.loading);

  function submitHandler() {
    dispatch(
      login({
        email: email.trim(),
        password: password.trim(),
      }),
    );
  }
  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <Image
            style={{width: 150, height: 150}}
            resizeMethod="auto"
            source={{
              uri: 'https://github.com/itzpradip/react-native-firebase-social-app/raw/master/assets/rn-social-logo.png',
            }}
          />
          <Text style={styles.title}>The SocialApp</Text>
        </View>
        <View>
          {error && <Text style={styles.error}>{error}</Text>}

          <Input
            placeholder="Email"
            icon="user"
            value={email}
            onUpdateValue={setEmail}
          />
          <Input
            placeholder="Password"
            icon="lock"
            secure={true}
            value={password}
            onUpdateValue={setPassword}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Button onPress={submitHandler}>Sign In</Button>
        </View>
        <View style={{marginVertical: 30}}>
          <Text style={styles.link}>Forget Password?</Text>
        </View>
        <View>
          <SocialButton
            title="Sign In With Facebook"
            backgroundColor="#e6eaf4"
            color="#4b69ac"
            icon="facebook"
            onPress={() => {
              dispatch(signInWithFacebook());
            }}
          />
          <SocialButton
            title="Sign In With Google"
            backgroundColor="#f5e7ea"
            color="#dc4335"
            icon="google"
            onPress={() => {
              dispatch(signInWithGoogle());
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
          dispatch(setError(null));
        }}>
        <Text style={styles.link}>Don't have an account?Create here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#172a65',
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
