import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActivePopup, UnActivePopup } from './InfoManage';

// 유저 로그인을 진행하는 API
export function RegisterAPI(data){

    return function (dispatch){
        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/user/create`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "회원가입에 성공하였습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(function (error) {
            dispatch(ActivePopup("error", "회원가입에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        });
    }

}

export function GetUserResumeAPI(setdata, study_id, user_id){
    
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/user/resume?study_id=${study_id}&user_id=${user_id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            setdata.setnickname(res.data['user_name'])
            setdata.setemail(res.data['user_email'])
            setdata.setjob(res.data['user_job'])
            setdata.setprofileimage(res.data['profile'])
            setdata.setdescription(res.data['description'])
            setdata.setwarning_cnt(res.data['warning_cnt'])
            setdata.SetUserTechArray(res.data['tech_info'])
            setdata.SetUserUrlArray(res.data['user_url'])
            
            return res;
        })
        .catch(function (error) {
            dispatch(ActivePopup("error", "유저 정보를 불러오는데 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        });
    }
}