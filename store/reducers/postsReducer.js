import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SET_POSTS,
  SET_POST_LOADING,
  SET_POST_ERROR,
} from '../actions/postsActions';
import {LOGOUT} from '../actions/userActions';
const initState = {
  error: null,
  postsList: [],
  loading: false,
};

export const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {...state, postsList: [action.post, ...state.postsList]};
    case DELETE_POST:
      return {
        ...state,
        postsList: state.postsList.filter(item => {
          return item.id != action.id;
        }),
      };
    case LOGOUT:
      return initState;
    case EDIT_POST:
      const newList = state.postsList.map(item => {
        if (item.id == action.post.id) {
          return action.post;
        } else {
          return item;
        }
      });
      return {...state, postsList: newList};
    case SET_POSTS:
      return {...state, postsList: action.posts};
    case SET_POST_LOADING:
      return {...state, loading: action.loading};

    case SET_POST_ERROR:
      return {...state, error: action.error};

    default:
      return state;
  }
};
