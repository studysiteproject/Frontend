import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function EmailAuthPage(){
    
    const { token } = useParams();
    const navigate = useNavigate();

    function VerifyAuthEmail(token){
        
        // 회원가입 API 호출
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/email/verify?user_mail_auth_token=${token}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            alert("계정 활성화에 성공하였습니다!");
            navigate('/');
            return res;
        })
        .catch(error => {
            const account_state = error.response.data['account']

            if (account_state == "active"){
                alert("이미 활성화된 계정입니다!");
            }
            else if (account_state == "block"){
                alert("정지된 계정입니다! 관리자에게 문의하세요.");
            }
            else if (account_state == "sleep"){
                alert("휴면 계정입니다!");
            }
            else {
                alert("계정 활성화에 실패하였습니다!\n관리자에게 문의해주세요.");
            }

            navigate('/');

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