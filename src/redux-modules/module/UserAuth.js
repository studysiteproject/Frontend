import axios from 'axios';
import { UserAuthActionList } from '../UserReducer';

// 유저 로그인을 진행하는 API
export function LoginAPI(id, pw){

    return function (dispatch){

        let data = {
            user_id: id,
            user_pw: pw
        }

        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/auth/login`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(UserAuthActionList.SetLoginState(true));
            localStorage.setItem('islogin', true);
            return res;
        })
        .catch(function (error) {
            alert("로그인에 실패하였습니다.");
            dispatch(UserAuthActionList.SetLoginState(false));
            localStorage.setItem('islogin', false);
            return error;
        });

    }
}