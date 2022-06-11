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
import {register, setError} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import SocialButton from '../components/SocialButton';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreen = ({navigation}) => {
  const error = useSelector(store => store.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  function submitHandler() {
    dispatch(
      register({
        email: email.trim(),
        password: password.trim(),
      }),
    );
  }
  return (
    <View style={styles.container}>
      <Icon
        onPress={() => {
          navigation.goBack();
        }}
        name="arrow-back"
        size={22}
        color="#172a65"
      />
      <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 30}}>
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <Text style={styles.title}>Create an account</Text>
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
          <Input
            placeholder="Confirm Password"
            icon="lock"
            secure={true}
            value={confirmPassword}
            onUpdateValue={setConfirmPassword}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Button onPress={submitHandler}>Sign Up</Button>
        </View>
        <View style={{}}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 30,
              fontSize: 14,
            }}>
            by registering, you confirm that you accept our
            <Text style={{color: '#eaa371'}}>Terms of service</Text> and
            <Text style={{color: '#eaa371'}}>Privacy policy</Text>
          </Text>
        </View>
        <View>
          <SocialButton
            title="Sign In With Facebook"
            backgroundColor="#e6eaf4"
            color="#4b69ac"
            icon="facebook"
            onPress={submitHandler}
          />
          <SocialButton
            title="Sign In With Google"
            backgroundColor="#f5e7ea"
            color="#dc4335"
            icon="google"
            onPress={submitHandler}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
          dispatch(setError(null));
        }}>
        <Text style={styles.link}>Have an account?Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
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
