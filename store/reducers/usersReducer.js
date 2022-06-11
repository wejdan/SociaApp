import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SET_USERS,
  SET_USERS_LOADING,
  SET_USERS_ERROR,
} from '../actions/usersActions';

const initState = {
  error: null,
  usersList: [],
  loading: false,
};

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, usersList: [action.user, ...state.usersList]};
    case DELETE_USER:
      return {
        ...state,
        usersList: state.usersList.filter(item => {
          return item.id != action.id;
        }),
      };
    case EDIT_USER:
      const newList = state.usersList.map(item => {
        if (item.id == action.user.id) {
          return action.user;
        } else {
          return item;
        }
      });
      return {...state, usersList: newList, loading: false};
    case SET_USERS:
      return {...state, usersList: action.users};
    case SET_USERS_LOADING:
      return {...state, loading: action.loading};

    case SET_USERS_ERROR:
      return {...state, error: action.error};

    default:
      return state;
  }
};
