import {
  LOGIN,
  LOGOUT,
  SET_USER_INFO,
  SET_LOADING,
  SET_ERROR,
} from '../actions/userActions';

const initState = {
  error: null,
  user: null,
  loading: true,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.user};
    case LOGOUT:
      return {...state, user: null};
    case SET_LOADING:
      return {...state, loading: action.loading};
    case SET_ERROR:
      return {...state, error: action.error};

    default:
      return state;
  }
};
