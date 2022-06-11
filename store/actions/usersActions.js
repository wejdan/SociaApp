import firestore from '@react-native-firebase/firestore';
export const ADD_USER = 'ADD_USER';
export const SET_USERS = 'SET_USERS';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';

export const SET_USER_ERROR = 'SET_USER_ERROR';
export const SET_USERS_LOADING = 'SET_USER_LOADING';

export const addUserAction = user => {
  return {
    type: ADD_USER,
    user,
  };
};
export const setuserError = error => {
  return {
    type: SET_USER_ERROR,
    error,
  };
};

export const setUserLoading = loading => {
  return {
    type: SET_USERS_LOADING,
    loading,
  };
};

export const deleteUserAction = id => {
  return {
    type: DELETE_USER,
    id,
  };
};
export const setUsersAction = users => {
  return {
    type: SET_USERS,
    users,
  };
};
export const updateUserAction = user => {
  return {
    type: EDIT_USER,
    user,
  };
};
export function addUser(uid, user) {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true));

    try {
      console.log('add user is called', user);
      await firestore().collection('Users').doc(uid).set(user);
      console.log('user Added', user);
      dispatch(addUserAction({id: uid, ...user}));
    } catch (e) {
      console.log('error add user');
      console.log(e);
    }
    dispatch(setUserLoading(false));
  };
}

export async function getAllUsers() {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true));

    try {
      const users = await firestore().collection('Users').get();

      let list = [];
      users.forEach(item => {
        list.push({uid: item.id, ...item.data()});
      });
      console.log('list::::', list);
      dispatch(setUsersAction(list));
      dispatch(setUserLoading(false));

      return list;
    } catch (e) {
      console.log(e);
    }
    dispatch(setUserLoading(false));
  };
}

export function deleteUser(id) {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true));

    try {
      await firestore().collection('Users').doc(id).delete();
      dispatch(deleteUserAction(id));
    } catch (e) {
      console.log(e);
    }
    dispatch(setUserLoading(false));
  };
}

export function editUser(uid, userData) {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true));

    try {
      await firestore().collection('Users').doc(uid).update(userData);
      dispatch(updateUserAction({id: uid, ...userData}));
    } catch (e) {
      console.log(e);
    }
  };
}
