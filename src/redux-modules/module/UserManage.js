import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActivePopup, UnActivePopup } from './InfoManage';

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

export function GetUserProfileAPI(setdata, user_id){
    
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/user/profile?user_id=${user_id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            setdata.setnickname(res.data['user_name'])
            setdata.setemail(res.data['user_email'])
            setdata.setjob(res.data['user_job'])
            setdata.setprofileimage(res.data['profile'])
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

export function ChangePasswordAPI(pw, newpw, checkpw){
    return function (dispatch){

        let data = {
            "user_pw": pw,
            "new_user_pw": newpw,
            "check_new_pw": checkpw
        }

        axios.put(`${process.env.REACT_APP_DJANGO_API_URL}/user/update/password`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "패스워드 변경에 성공하였습니다.\n변경된 패스워드로 다시 로그인해주세요."));
            dispatch(UnActivePopup(4));
            return res;
        })
        .catch(function (error) {
            dispatch(ActivePopup("error", "패스워드 변경에 실패하였습니다!"));
            dispatch(UnActivePopup(2));
            return error;
        });
    }
}

export function ReportUserAPI(study_id, user_id, description){
    
    return function (dispatch){

        const data = {
            "study_id": study_id,
            "reported_id": user_id,
            "description": description
        }

        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/user/report`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "팀원의 신고가 완료되었습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if (status == 400){
                dispatch(ActivePopup("error", "유효하지 않은 팀원이거나, 존재하지 않는 스터디입니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "팀원을 신고하기 위해서는 로그인이 필요합니다."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "팀원 신고에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

export function LeaveUserAPI(){
    return function (dispatch){

        axios.delete(`${process.env.REACT_APP_DJANGO_API_URL}/user/delete`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "회원 탈퇴가 완료되었습니다.\n그동안 이용해주셔서 감사합니다."));
            dispatch(UnActivePopup(4));
            return res;
        })
        .catch(function (error) {
            dispatch(ActivePopup("error", "회원 탈퇴를 실패하였습니다!"));
            dispatch(UnActivePopup(2));
            return error;
        });
    }
}