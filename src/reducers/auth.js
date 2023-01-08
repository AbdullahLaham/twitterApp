import { AUTH, LOGOUT, LOGIN, SIGNUP } from "../constants";
const reducer = (state={authData: JSON.parse(localStorage.getItem('user'))}, action) => {
    switch(action.type) {
        case AUTH, SIGNUP, LOGIN: {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {...state, authData: action?.payload}
        }
        case LOGOUT: {
            localStorage.setItem('user', null);
            return {...state, authData: null}
        }
        
        default: {
            return state;
        }
    }
}
export default reducer;