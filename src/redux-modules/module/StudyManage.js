import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StudyActionList } from '../StudyReducer';
import { ActivePopup, UnActivePopup } from './InfoManage';



// 스터디 리스트를 얻어오는 기능
export function GetStudyListAPI(study_type=""){
    
    return function (dispatch){

        let header = {
            Cookie: document.cookie
        }
        let URL = "";

        // 인자로 사용한 URL을 이용하여 스터디의 정보를 얻어오는 콜백함수
        const ReqStudyData = (URL) => {
            axios.get(URL, { headers: header, withCredentials: true, credentials: "include" })
            .then(res => {
                dispatch(StudyActionList.SetList(res.data));
            })
            .catch(error=>{
                return error;
            })
        }
        
        switch (study_type){

            // 개발 카테고리인 스터디 목록
            case "all":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study`;
                ReqStudyData(URL);
                break;

            // 개발 카테고리인 스터디 목록
            case "dev":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study?category=dev`;
                ReqStudyData(URL);
                break;

            // 디자인 카테고리인 스터디 목록
            case "design":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study?category=design`;
                ReqStudyData(URL);
                break;

            // 공무원 카테고리인 스터디 목록
            case "official":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study?category=official`;
                ReqStudyData(URL);
                break;

            // 내가 생성한 스터디 목록
            case "created":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study/created`;
                ReqStudyData(URL);
                break;

            // 내가 즐겨찾기한 스터디 목록
            case "favorite":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study/favorite`;
                ReqStudyData(URL);
                break;
            
            // 내가 참여한 스터디 목록
            case "applicationlist":
                URL = `${process.env.REACT_APP_SPRING_API_URL}/study/applicationlist`;
                ReqStudyData(URL);
                break;

        }
        
    }
    
}

export function AddFavoriteAPI(id){

    return function (dispatch){

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/favorite/add?study_id=${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(StudyActionList.ChangeFavorite(id));
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if(status == 400){
                dispatch(ActivePopup("error", "이미 즐겨찾기에 추가한 스터디이거나, 존재하지 않는 스터디 입니다.\n스터디를 확인해주세요."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "즐겨찾기 추가에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

export function DeleteFavoriteAPI(id){

    return function (dispatch){

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/favorite/delete?study_id=${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(StudyActionList.ChangeFavorite(id));
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if(status == 400){
                dispatch(ActivePopup("error", "즐겨찾기한 스터디가 아닙니다.\n즐겨찾기 된 스터디가 맞는지 확인해주세요."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "즐겨찾기 삭제에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

export function DeleteStudyAPI(id){
    return function (dispatch){

        axios.delete(`${process.env.REACT_APP_SPRING_API_URL}/study/${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "스터디 삭제가 완료되었습니다."));
            dispatch(UnActivePopup(2));
            dispatch(GetStudyListAPI("created"))
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if(status == 400){
                dispatch(ActivePopup("error", "잘못된 입력값입니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "해당 스터디를 생성한 사용자가 아닙니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 404){
                dispatch(ActivePopup("error", "존재하지 않는 스터디 입니다."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "즐겨찾기 삭제에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

export function ExitStudyAPI(id){
    
    return function (dispatch){

        axios.delete(`${process.env.REACT_APP_SPRING_API_URL}/study/applicationlist/${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "스터디 탈퇴가 완료되었습니다."));
            dispatch(UnActivePopup(2));
            dispatch(GetStudyListAPI("applicationlist"))
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if (status == 401){
                dispatch(ActivePopup("error", "해당 스터디를 생성한 사용자가 아닙니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 404){
                dispatch(ActivePopup("error", "존재하지 않는 스터디 입니다."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "스터디 탈퇴에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}