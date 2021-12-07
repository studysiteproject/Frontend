import axios from 'axios';
import { UserAuthActionList } from '../UserReducer';

// 유저 로그인을 진행하는 API
export function LoginAPI(id, pw){

    return function (dispatch){

        const data = {
            user_id: id,
            user_pw: pw
        }

        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/auth/login`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(UserAuthActionList.SetLoginState(true));
            localStorage.setItem('islogin', true);
            return res;
        })
        .catch(error => {
            const account_status = error.response.data['account'];

            if (account_status == 'inactive'){
                alert("계정에 로그인하기 위해서는 이메일 인증이 필요합니다.\n회원가입 시 작성한 이메일에 전송된 인증 메일을 확인해주세요.");
            }
            else if (account_status == 'block'){
                alert("계정이 신고 등으로 정지된 상태입니다.\n관리자에게 문의해주세요.");
            }
            else if (account_status == 'sleep'){
                alert("계정에 로그인하기 위해서는 이메일 인증이 필요합니다.\n이메일에 전송된 인증 메일을 확인해주세요.");
            }
            if (account_status == 'error'){
                alert("계정의 상태를 확인할 수 없습니다.\n관리자에게 문의해주세요.");
            }

            dispatch(UserAuthActionList.SetLoginState(false));
            localStorage.setItem('islogin', false);
            return error;
        });

    }
}