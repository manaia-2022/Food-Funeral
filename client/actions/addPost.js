export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'
import { addPost } from '../apis/posts'

export const addPostRequest = () => ({
  type: ADD_POST_REQUEST,
})

export const addPostSuccess = (post) => ({
  type: ADD_POST_SUCCESS,
  payload: post,
})

export const addPostFailure = (errMessage) => ({
  type: ADD_POST_FAILURE,
  payload: { errMessage },
})

export const addNewPost = (post) => (dispatch) => {
  dispatch(addPostRequest())
  return addPost(post)
    .then((post) => {
      dispatch(addPostSuccess(post))
    })
    .catch((error) => {
      dispatch(addPostFailure(error.message))
    })
}