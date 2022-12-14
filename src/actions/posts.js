// import { async } from "@firebase/util";
import axios from "axios"
import * as api from '../api/index'
import { FETC_POSTS, CREATE, ADD_LIKE, UPDATE, DELETE, COMMENT, OPEN_COMMENT, FETCH_ONE, CLOSE_COMMENT, DELETE_COMMENT, LIKE_COMMENT } from '../constants'

export const getPosts =  (userEmail) => async (dispatch) => {
    try {
        const {data} = await api.getPosts(userEmail);
        console.log('getget', data);
        dispatch({type: FETC_POSTS, payload: data});
    }
    catch(error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    const {data} = await api.createPost(post);
    dispatch({type: CREATE, payload: data});

}

export const deletePost = (id) => async (dispatch) => {
    console.log('deleted')
    const {data} = await api.deletePost(id);
    dispatch({type: DELETE, payload: id});
}

export const likePost = (id) => async (dispatch) => {
    console.log('likedkkkkkkkkkkkkkkkkk');
    const {data} = await api.likePost(id);
    dispatch({type: ADD_LIKE, payload: data,});
}

export const openCommentSection = () => (dispatch) => {
    dispatch({type: OPEN_COMMENT,});
}

export const getSinglePost = (id) => async (dispatch) => {
    const {data} = await api.fetchPost(id);
    dispatch({type: FETCH_ONE, payload: data});
}
export const closeCommentSection = () => (dispatch) => {
    dispatch({type: CLOSE_COMMENT,});
}
export const sendComment = (commentData) => async (dispatch) => {
    console.log('commented');
    const {data} = await api.sendComment(commentData);
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
    dispatch({type: COMMENT, payload: data,});
}

export const deleteComment = (commentData) => async (dispatch) => {
    const {data} = await api.deleteComment(commentData)
    dispatch({type: DELETE_COMMENT, payload: data});
}

export const likeComment = (commentData) => async (dispatch) => {
    const {data} = await api.likeComment(commentData);
    dispatch({type: LIKE_COMMENT, payload: data,})
}







