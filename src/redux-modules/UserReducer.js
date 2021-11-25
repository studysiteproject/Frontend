import { createAction } from 'redux-actions';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_LOGIN_STATE = "SET_LOGIN_STATE";

const INITIAL_STATE = {
    islogin : false
}

// 스터디 목록 얻어오기 액션
const Login = createAction(LOGIN);
const Logout = createAction(LOGOUT);
const SetLoginState = createAction(SET_LOGIN_STATE, (islogin) => ({islogin}));
  
export default function Reducer(state=INITIAL_STATE, action){

    switch(action.type){
        
        case LOGIN:
            return {
                ...state,
                islogin: true
            }
        case LOGOUT:
            return {
                ...state,
                islogin: false
            }
        case SET_LOGIN_STATE:
            return {
                ...state,
                islogin: action.payload.islogin
            }
        default:
            return {
                ...state
            }           
    }
  
}

const UserAuthActionList = {
    Login,
    Logout,
    SetLoginState
}
export { UserAuthActionList }