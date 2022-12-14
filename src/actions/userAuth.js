import * as api from '../api/index'
import {SIGNUP, LOGIN, FETCH_USERS, FOLLOW_USER} from '../constants'
export const loginRequest = (details) => async (dispatch) => {
    const {data} = await api.loginRequest(details);
    localStorage.setItem('user', JSON.stringify(data));
    dispatch({type: LOGIN, payload: data})
    console.log(data);
    window.location.reload();
}


export const signupRequest = (details) => async (dispatch) => {
    const {data} = await api.signupRequest(details);
    console.log('rrrrrrrrrrrrrrrrrrr', data);
    localStorage.setItem('user', JSON.stringify(data));
    dispatch({type: SIGNUP, payload: data});
    window.location.reload();
    // console.log('new useruuuuuuuuuuuuuuuuuuuuuuuu', data);
    
    
    // navigate('/')
}
export const fetchUsers = () => async (dispatch) => {
    const {data} = await api.fetchUsers();
    
    console.log('rooooooooorrrrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    dispatch({type: FETCH_USERS, payload: data});   
}

export const followUser = (followerId, followedId) => async (dispatch) => {
    const {data} = await api.followUser(followerId, followedId);  
    dispatch({type: FOLLOW_USER, payload: data});   
}
export const googleAuth = (user) => async (dispatch) => {
    const {data} = await api.googleAuth(user);
    console.log('tyyyyyyyy', data)
    dispatch({type: LOGIN, payload: data});
}




