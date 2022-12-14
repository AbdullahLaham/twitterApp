import { FETC_POSTS, CREATE, ADD_LIKE, UPDATE, DELETE, COMMENT, OPEN_COMMENT, FETCH_ONE, CLOSE_COMMENT, DELETE_COMMENT, LIKE_COMMENT, FETCH_USERS } from '../constants'

const reducer = (state = {posts: [], isOpen: false, post: {}, users: [],}, action) => {
    switch(action.type) {
        case FETC_POSTS: {
            return {...state, posts: action.payload}
        }
        case CREATE: {
            return {...state, posts: [...state.posts, action.payload]}
        }
        case UPDATE: {
            return {...state, posts: state.posts.map((post) => post?._id === action?.payload?._id ? action?.payload : post)}
        }
        case DELETE: {
            return {...state, posts: state.posts.filter((post) => post?._id !== action?.payload)}
        }
        case ADD_LIKE: {
            const newPosts = state.posts.map((post) => post?._id == action.payload._id ? action.payload : post)
            return {...state, posts: newPosts}
        }
        case OPEN_COMMENT: {
            return {...state, isOpen: true,}
        }
        case CLOSE_COMMENT : {
            return {...state, isOpen: false,}
        }
        case FETCH_ONE: {
            return {...state, post: action.payload}
        }
        case COMMENT: {
            return {...state, post: action?.payload}
        }
        case LIKE_COMMENT: {
            return {...state, post: action?.payload}
        }
        case DELETE_COMMENT: {

        }
        case FETCH_USERS: {
            return {...state, users: action?.payload}
        }
        default: {
            return {...state, post: action?.payload}
        }
    }
    
}
export default reducer;
