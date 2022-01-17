import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserAuthActionList } from '../UserReducer';
import { ActivePopup, UnActivePopup } from './InfoManage';

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
            
            const status = error.response['status'];

            if (status == 400){
                dispatch(ActivePopup("error", "확인할 수 없는 계정입니다.\n아이디와 패스워드를 다시 확인해주세요."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401 || status == 500){
                
                if (account_status == 'inactive'){
                    dispatch(ActivePopup("error", "계정에 로그인하기 위해서는 이메일 인증이 필요합니다.\n회원가입 시 작성한 이메일에 전송된 인증 메일을 확인해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else if (account_status == 'block'){
                    dispatch(ActivePopup("error", "계정이 신고 등으로 정지된 상태입니다.\n관리자에게 문의해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else if (account_status == 'sleep'){
                    dispatch(ActivePopup("error", "계정에 로그인하기 위해서는 이메일 인증이 필요합니다.\n이메일에 전송된 인증 메일을 확인해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else if (account_status == 'error'){
                    dispatch(ActivePopup("error", "계정의 상태를 확인할 수 없습니다.\n관리자에게 문의해주세요."));
                    dispatch(UnActivePopup(2));
                }

            }

            dispatch(UserAuthActionList.SetLoginState(false));
            localStorage.setItem('islogin', false);
            return error;
        });

    }
}

export function SendAuthEmail(email){

    return function (dispatch){

        // 이메일 인증 API 호출
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/email/send?user_email=${email}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "인증메일 전송에 성공하였습니다.\n입력하신 메일에 전송된 인증메일을 확인해주세요."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error => {
            dispatch(ActivePopup("error", "인증메일 전송에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        });

    }

}