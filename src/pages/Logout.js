import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ActivePopup, UnActivePopup } from "../redux-modules/module/InfoManage";
import { StudyActionList } from "../redux-modules/StudyReducer";

function LogoutPage(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function Logout(){
        
        // 로그아웃 API 호출
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/logout`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(StudyActionList.Initaction())
            navigate('/');
            return res;
        })
        .catch(error => {

            const status = error.response['status'];

            if (status == 401){
                dispatch(ActivePopup("error", "로그인 후 로그아웃이 가능합니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 500){
                dispatch(ActivePopup("error", "로그아웃에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            setTimeout(()=>{navigate('/')}, 2000);

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