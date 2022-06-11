import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ERROR = 'SET_ERROR';

const API_KEY = ' AIzaSyAfn91thblVslP2jJVEhCYAFIhF3iMwfgY ';

export const loginAction = user => {
  return {
    type: LOGIN,
    user,
  };
};
export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
export const setUserInfo = data => {
  return {
    type: SET_USER_INFO,
    data,
  };
};
export const setLoading = loading => {
  return {
    type: SET_LOADING,
    loading,
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    error,
  };
};
export const registerAction = userData => {
  return {
    type: REGISTER,
    userData,
  };
};

export function login(loginData) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await auth().signInWithEmailAndPassword(
        loginData.email,
        loginData.password,
      );
      //console.log('login result', response.data);
      //const userData = await getUserData(response.data.idToken);
      // dispatch(loginAction(response.data.idToken, userData));
    } catch (error) {
      console.log('error');
      dispatch(setLoading(false));

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.error.message);
        if (error.response.data.error.message == 'EMAIL_NOT_FOUND') {
          dispatch(
            setError(
              'There is no user record corresponding to this identifier. The user may have been deleted.',
            ),
          );
        }
        if (error.response.data.error.message == 'INVALID_PASSWORD') {
          dispatch(
            setError(
              'The password is invalid or the user does not have a password',
            ),
          );
        }
        if (error.response.data.error.message == 'USER_DISABLED') {
          dispatch(
            setError('The user account has been disabled by an administrator.'),
          );
        }
        if (
          error.response.data.error.message == 'TOO_MANY_ATTEMPTS_TRY_LATER'
        ) {
          dispatch(
            setError(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            ),
          );
        }
      } else if (error.request) {
        console.log(error.request);
        dispatch(setError(error.message));
      } else {
        console.log('Error', error.message);
        dispatch(setError(error.message));
      }
    }
  };
}
export function logout() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      await auth().signOut();
    } catch (e) {
      dispatch(setLoading(false));

      console.log(e);
    }
  };
}
export function register(regData) {
  return async (dispatch, store) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await auth().createUserWithEmailAndPassword(
        regData.email,
        regData.password,
      );
    } catch (error) {
      dispatch(setLoading(false));

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.error.message);
        if (error.response.data.error.message == 'EMAIL_EXISTS') {
          dispatch(
            setError('The email address is already in use by another account'),
          );
        }
      } else if (error.request) {
        console.log(error.request);
        dispatch(setError(error.request));
      } else {
        console.log('Error', error.message);
        dispatch(setError(error.message));
      }
    }
  };
}

export function signInWithGoogle() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  };
}

export function signInWithFacebook() {
  return async (dispatch, getState) => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
}
