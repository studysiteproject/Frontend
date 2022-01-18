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
  
export default function Reducer(state, action){
    
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
            if(action.payload.islogin == true){
                return {
                    ...state,
                    islogin: true
                }
            }
            else if(action.payload.islogin == false){
                return {
                    ...state,
                    islogin: false
                }
            }
            else{
                return {
                    ...state
                }
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