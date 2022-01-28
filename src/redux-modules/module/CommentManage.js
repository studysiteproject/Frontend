import axios from "axios";
import { ActivePopup, UnActivePopup } from './InfoManage';

// 스터디 리스트를 얻어오는 기능
export function GetCommentsAPI(study_id, setdata){
    
    return function (dispatch){
        
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/study/${study_id}/comments`, { withCredentials: true, credentials: "include" })
        .then(res => {
            setdata(res.data);
            return res;
        })
        .catch(error=>{
            dispatch(ActivePopup("error", "스터디의 댓글 목록을 받아오는데 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
        
    }
    
}

export function UpdateCommentAPI(study_id, comment_id, comment){
    
    return function (dispatch){
        
        const data = {
            "comment": comment
        }

        axios.put(`${process.env.REACT_APP_DJANGO_API_URL}/study/${study_id}/comments/${comment_id}`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "댓글 수정에 성공하였습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error=>{
            dispatch(ActivePopup("error", "댓글 수정에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
        
    }
    
}

export function DeleteCommentAPI(study_id, comment_id){
    
    return function (dispatch){
        
        axios.delete(`${process.env.REACT_APP_DJANGO_API_URL}/study/${study_id}/comments/${comment_id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            return res;
        })
        .catch(error=>{
            dispatch(ActivePopup("error", "댓글 삭제에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
        
    }
    
}

export function UpdateCommentVisibleAPI(study_id, comment_id, flag){
    
    return function (dispatch){
        axios.put(`${process.env.REACT_APP_DJANGO_API_URL}/study/${study_id}/comments/${comment_id}/visible?flag=${flag}`, {}, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "댓글의 가시여부 수정에 성공하였습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error=>{
            dispatch(ActivePopup("error", "댓글의 가시여부 수정에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
    }
    
}