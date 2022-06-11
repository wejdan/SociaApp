import {userReducer} from './reducers/userReducer';
import {postsReducer} from './reducers/postsReducer';
import {usersReducer} from './reducers/usersReducer';

import {combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createStore} from 'redux';

export const store = createStore(
  combineReducers({
    user: userReducer,
    posts: postsReducer,
    users: usersReducer,
  }),
  applyMiddleware(thunk),
);
