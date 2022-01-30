import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ActivePopup, UnActivePopup } from "../redux-modules/module/InfoManage";

function EmailAuthPage(){
    
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function VerifyAuthEmail(token){
        
        // 이메일 인증 API 호출
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/email/verify?user_mail_auth_token=${token}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "계정 활성화에 성공하였습니다!"));
            dispatch(UnActivePopup(2));
            setTimeout(()=>{navigate('/')}, 2000);
            return res;
        })
        .catch(error => {
            const account_state = error.response.data['account']

            if (account_state == "active"){
                dispatch(ActivePopup("error", "이미 활성화된 계정입니다!"));
                dispatch(UnActivePopup(2));
            }
            else if (account_state == "block"){
                dispatch(ActivePopup("error", "정지된 계정입니다! 관리자에게 문의하세요."));
                dispatch(UnActivePopup(2));
            }
            else if (account_state == "sleep"){
                dispatch(ActivePopup("error", "휴면 계정입니다!"));
                dispatch(UnActivePopup(2));
            }
            else {
                dispatch(ActivePopup("error", "계정 활성화에 실패하였습니다!\n관리자에게 문의해주세요."));
                dispatch(UnActivePopup(2));
            }

            setTimeout(()=>{navigate('/')}, 2000);

            return error;
        });

    }

    useEffect(()=>{
        VerifyAuthEmail(token);
    },[]);

    return (
        <> 
        </>
    );
}

export default EmailAuthPage