import { AUTH, LOGOUT, LOGIN, SIGNUP } from "../constants";
const reducer = (state={authData: null}, action) => {
    switch(action.type) {
        case AUTH, SIGNUP, LOGIN: {
            return {...state, authData: action?.payload}
        }
        case LOGOUT: {
            return {...state, authData: null}
        }
        
        default: {
            return state;
        }
    }
}
export default reducer;