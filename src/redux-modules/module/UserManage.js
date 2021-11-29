import axios from 'axios';

// 유저 로그인을 진행하는 API
export function RegisterAPI(data){

    return function (){

        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/user/create`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            return res;
        })
        .catch(function (error) {
            alert("회원가입에 실패하였습니다.");
            return error;
        });

    }
}