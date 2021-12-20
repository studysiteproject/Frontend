import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function LogoutPage(){
    
    const navigate = useNavigate();

    function Logout(){
        
        // 회원가입 API 호출
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/logout`, { withCredentials: true, credentials: "include" })
        .then(res => {
            navigate('/');
            return res;
        })
        .catch(error => {

            const status = error.response['status'];

            if (status == 401){
                alert("로그인 후 로그아웃이 가능합니다.");
            }
            else if (status == 500){
                alert("로그아웃에 실패하였습니다.");
            }

            navigate('/');

            return error;
        });

    }

    useEffect(()=>{
        Logout();
    },[]);

    return (
        <> 
        </>
    );
}

export default LogoutPage