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
                dispatch(StudyActionList.Initaction());
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

// 스터디 즐겨찾기를 추가합니다
export function AddFavoriteAPI(id){

    return function (dispatch){

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/favorite/add?study_id=${id}`, { withCredentials: true, credentials: "include" })
        .then((res) => {
            dispatch(StudyActionList.ChangeFavorite(id));
            return res;
        })
        .catch((error) => {
            if (typeof error.response !== 'undefined'){
                if(error.response['status'] == 400){
                    dispatch(ActivePopup("error", "이미 즐겨찾기에 추가한 스터디이거나, 존재하지 않는 스터디 입니다.\n스터디를 확인해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else if (error.response['status'] == 401){
                    dispatch(ActivePopup("error", "즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else{
                    dispatch(ActivePopup("error", "즐겨찾기 추가에 실패하였습니다."));
                    dispatch(UnActivePopup(2));
                }
            }

            return error;
        })
    }
}

// 스터디 즐겨찾기를 해제합니다
export function DeleteFavoriteAPI(id){

    return function (dispatch){

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/favorite/delete?study_id=${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(StudyActionList.ChangeFavorite(id));
            return res;
        })
        .catch(error => {
            if (typeof error.response !== 'undefined'){
                if(error.response['status'] == 400){
                    dispatch(ActivePopup("error", "즐겨찾기한 스터디가 아닙니다.\n즐겨찾기 된 스터디가 맞는지 확인해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else if (error.response['status'] == 401){
                    dispatch(ActivePopup("error", "즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요."));
                    dispatch(UnActivePopup(2));
                }
                else{
                    dispatch(ActivePopup("error", "즐겨찾기 삭제에 실패하였습니다."));
                    dispatch(UnActivePopup(2));
                }
            }

            return error;
        })
    }
}

// 스터디를 삭제합니다
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

// 스터디를 탈퇴합니다
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

// 스터디를 신청합니다
export function RecruitStudyAPI(id, description){
    
    return function (dispatch){

        const data = {
            "description": description
        }

        axios.post(`${process.env.REACT_APP_SPRING_API_URL}/study/recruit/${id}`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "스터디 신청이 완료되었습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if (status == 400){
                dispatch(ActivePopup("error", "이미 신청한 스터디이거나, 신청글이 너무 깁니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "스터디를 신청하기 위해서는 로그인이 필요합니다."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "스터디 신청에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

// 스터디를 신고합니다
export function ReportStudyAPI(id, description){
    
    return function (dispatch){

        const data = {
            "description": description
        }

        axios.post(`${process.env.REACT_APP_SPRING_API_URL}/study/report/${id}`, data, { withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "스터디 신고가 완료되었습니다."));
            dispatch(UnActivePopup(2));
            return res;
        })
        .catch(error => {
            const status = error.response['status'];

            if (status == 400){
                dispatch(ActivePopup("error", "이미 신고하였거나, 존재하지 않는 스터디입니다."));
                dispatch(UnActivePopup(2));
            }
            else if (status == 401){
                dispatch(ActivePopup("error", "스터디를 신고하기 위해서는 로그인이 필요합니다."));
                dispatch(UnActivePopup(2));
            }
            else{
                dispatch(ActivePopup("error", "스터디 신고에 실패하였습니다."));
                dispatch(UnActivePopup(2));
            }

            return error;
        })
    }
}

// 스터디의 상세 정보를 얻어온다.
export function GetStudyInfoAPI(setdata, id, detail=false){
    axios.get(`${process.env.REACT_APP_SPRING_API_URL}/study/${id}`, { withCredentials: true, credentials: "include" })
    .then(res => {

        // 유저의 기본 정보 결과 얻어오기
        const study_info = res.data

        // 인자로 설정한 데이터 설정 함수를 이용하여 얻어온 정보 설정
        setdata.setTitle(study_info["title"]);
        setdata.setcategory(study_info["category"]);
        setdata.setplace(study_info["place"]);
        setdata.SetStudyTechArray(study_info["tech_info"]);
        setdata.Setmaxman(study_info["maxman"]);
        setdata.setdescription(study_info["description"]);
        
        if (detail){
            setdata.Setnowman(study_info["nowman"]);
            setdata.setWarncnt(study_info["warn_cnt"]);
            setdata.setcreateDate(study_info["create_date"]);
            setdata.setisfavorite(study_info["isfavorite"]);
            setdata.setisactive(study_info["isactive"]);
            setdata.setleaderinfo(study_info["user_info"]);
        }

        return res
    })
    .catch(error => {
        return error;
    })
}

// 승인된 사람은 신청자 목록으로, 신청자 목록인 사람은 승인하는 API
export function EditUserPermissionAPI(study_id, user_id){
    return function (dispatch){

        let header = {
            Cookie: document.cookie
        }

        axios.put(`${process.env.REACT_APP_SPRING_API_URL}/study/member?studyId=${study_id}&userId=${user_id}`,{},{ withCredentials: true, credentials: "include" })
        .then(res => {
            return res
        })
        .catch(error => {
            dispatch(ActivePopup("error", "사용자의 스터디 참여 상태 변경에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
    }
}

// 팀원인 유저는 추방, 신청자인 유저는 신청을 거부하는 API
export function DeleteUserAPI(study_id, user_id){

    return function (dispatch){

        let header = {
            Cookie: document.cookie
        }

        axios.delete(`${process.env.REACT_APP_SPRING_API_URL}/study/member?studyId=${study_id}&userId=${user_id}`, { headers: header, withCredentials: true, credentials: "include" })
        .then(res => {
            return res
        })
        .catch(error => {
            dispatch(ActivePopup("error", "사용자의 스터디 참여 상태 삭제에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
    }
}

// 승인된 사람은 신청자 목록으로, 신청자 목록인 사람은 승인하는 API
export function EditStudyActiveAPI(study_id){
    return function (dispatch){

        let header = {
            Cookie: document.cookie
        }

        axios.put(`${process.env.REACT_APP_SPRING_API_URL}/study/recruit/${study_id}`,{},{ withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(ActivePopup("info", "스터디 모집 상태 변경에 성공하였습니다."));
            dispatch(UnActivePopup(2));
            return res
        })
        .catch(error => {
            dispatch(ActivePopup("error", "스터디 모집 상태 변경에 실패하였습니다."));
            dispatch(UnActivePopup(2));
            return error;
        })
    }
}