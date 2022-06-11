import firestore from '@react-native-firebase/firestore';
export const ADD_POST = 'ADD_POST';
export const SET_POSTS = 'SET_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const SET_POST_ERROR = 'SET_POST_ERROR';
export const SET_POST_LOADING = 'SET_POST_LOADING';
export const EDIT_POST = 'EDIT_POST';
export const addPostAction = post => {
  return {
    type: ADD_POST,
    post,
  };
};
export const setPostError = error => {
  return {
    type: SET_POST_ERROR,
    error,
  };
};

export const setPostLoading = loading => {
  return {
    type: SET_POST_LOADING,
    loading,
  };
};

export const deletePostAction = id => {
  return {
    type: DELETE_POST,
    id,
  };
};
export const setPostsAction = posts => {
  return {
    type: SET_POSTS,
    posts,
  };
};
export const updatePostAction = post => {
  return {
    type: EDIT_POST,
    post,
  };
};
export function addPost(post) {
  return async (dispatch, getState) => {
    dispatch(setPostLoading(true));

    try {
      await firestore().collection('Posts').add(post);
    } catch (e) {
      console.log(e);
    }
    dispatch(setPostLoading(false));
  };
}
export function getAllPosts() {
  return async (dispatch, getState) => {
    dispatch(setPostLoading(true));

    try {
      const posts = await firestore()
        .collection('Posts')
        .orderBy('postTime', 'desc')
        .get();
      let list = [];
      posts.forEach(item => {
        list.push({id: item.id, ...item.data()});
      });
      dispatch(setPostsAction(list));
    } catch (e) {
      console.log(e);
    }
    dispatch(setPostLoading(false));
  };
}

export function deletePost(id) {
  return async (dispatch, getState) => {
    dispatch(setPostLoading(true));

    try {
      await firestore().collection('Posts').doc(id).delete();
    } catch (e) {
      console.log(e);
    }
    dispatch(setPostLoading(false));
  };
}

export function editPost(post) {
  return async (dispatch, getState) => {
    dispatch(setPostLoading(true));

    try {
      await firestore().collection('Posts').doc(post.id).update(post);
    } catch (e) {
      console.log(e);
    }
    dispatch(setPostLoading(false));
  };
}

export function like(post, likes) {
  console.log('updating likes', likes);
  return async (dispatch, getState) => {
    try {
      await firestore().collection('Posts').doc(post.id).update({
        likedBy: likes,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
