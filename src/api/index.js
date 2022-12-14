import { async } from '@firebase/util';
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
        req.headers.theId = JSON.parse(localStorage.getItem('user'))?._id;
    }   
    return req;
});

export const getPosts = async (userEmail) => {
    const res = await API.get('/posts', {userEmail});
    return res;
}

export const createPost = async (post) => {
    const res = await API.post('/posts', post)
}

export const deletePost = async (id) => {
    const res = await API.delete(`/posts/${id}`);
}

export const likePost = async (id) => {
    console.log('likeeeeeeeeeepost', id)
    const res = await API.patch(`/posts/${id}/likePost`);
}

export const fetchPost = async (id) => {
    const res = await API.get(`/posts/${id}`);
    return res;
}

export const sendComment = async (commentData) => {
    const {comment, postId} = commentData;
    console.log(commentData)
    const res = await API.patch(`/posts/${postId}/commentPost`, comment);
    return res;
}

export const deleteComment = async (commentData) => {
    const {postId, commentId} = commentData;
    const res = await API.delete(`/posts/${postId}/deleteComment/${commentId}`);
    return res;
}

export const likeComment = async (commentData) => {
    const {postId, commentId} = commentData;
    const res = await API.patch(`/posts/${postId}/likeComment/${commentId}`);
    return res;
}



export const loginRequest = async (details) => {
    const res = await API.post('/auth/login', details);
    return res;
}

export const signupRequest = async (details) => {   
    const res = await API.post('/auth/signup', details);
    return res;
}
export const fetchUsers = async () => {
    const res = await API.get('/auth/allUsers');
    return res;
}
export const followUser = async (followerId, followedId) => {
    const res = await API.post(`/auth/${followerId}/followUser/${followedId}`);
    return res;
}
export const googleAuth = async (data) => {
    const res = await API.post('auth/googleAuth', data);
    return res;
}