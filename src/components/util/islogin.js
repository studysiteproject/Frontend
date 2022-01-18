import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAuthActionList } from "../../redux-modules/UserReducer";
import axios from "axios";

export function IsLoginAPI() {

    return function (dispatch){

        // 로그인 여부 확인
        if (typeof window !== 'undefined') {

            // localStorage에서 islogin 값을 얻어온다.
            const value = JSON.parse(window.localStorage.getItem("islogin"));
            // alert(value)
            if(value && typeof value !== 'undefined') dispatch(UserAuthActionList.SetLoginState(value))

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있지 않을 때
            if (!document.cookie.includes('access_token') || !document.cookie.includes('index'))
            {   
                dispatch(UserAuthActionList.SetLoginState(false));
                localStorage.setItem("islogin", false);
            }

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있을 때 유효한 토큰인지 확인
            else{
                axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/verify_user`, { withCredentials: true, credentials: "include" })
                .then(res => {
                    dispatch(UserAuthActionList.SetLoginState(true));
                    localStorage.setItem("islogin", true);
                    return res;
                })
                .catch(error => {
                    dispatch(UserAuthActionList.SetLoginState(false));
                    localStorage.setItem("islogin", false);
                    return error;
                });
            }
        }

    }
}

function IsLogin(props) {

    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{

        // 로그인 되었는지 확인
        dispatch(IsLoginAPI());

    },[]);

    if(islogin && typeof islogin !== 'undefined'){
        
        // 만약 로그인 시 이동될 경로를 설정했는지 확인
        if(typeof props.OnLoginUrl !== 'undefined'){
            navigate(props.OnLoginUrl);
        }

    }
    else{
        
        // 만약 미 로그인 시 이동될 경로를 설정했는지 확인
        if(typeof props.NotLoginUrl !== 'undefined'){
            navigate(props.NotLoginUrl);
        }

    }        

    return(<></>);

}

export default IsLogin;