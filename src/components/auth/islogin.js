import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function IsLogin() {

    // 로그인 상태 확인
    let [islogin, setislogin] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            // localStorage에서 islogin 값을 얻어온다.
            const value = JSON.parse(window.localStorage.getItem("islogin"));
            if(value) setislogin(value);

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있을 때(로그인한 상태일 때)
            if (!document.cookie.includes('access_token') || !document.cookie.includes('index'))
            {   
                setislogin(false);
            }
        }
    },[]);


    if (islogin){
        navigate('/');
    }

    return (<></>)
  
}

export default IsLogin;