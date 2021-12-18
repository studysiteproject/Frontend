import axios from 'axios';
import { StudyActionList } from '../StudyReducer';

// 스터디 리스트를 얻어오는 기능
export function SetListAPI(){
    
    return function (dispatch){

        let header = {
            Cookie: document.cookie
        }

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/user/testapi`, { headers: header, withCredentials: true, credentials: "include" })
        .then(res => {
            dispatch(StudyActionList.SetList(res.data));
        })
        .catch(error=>{
            return error;
        })
    
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
                alert("이미 즐겨찾기에 추가한 스터디이거나, 존재하지 않는 스터디 입니다.\n스터디를 확인해주세요.");
            }
            else if (status == 401){
                alert('즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요.');
            }
            else{
                alert('즐겨찾기 추가에 실패하였습니다.');
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
                alert("즐겨찾기한 스터디가 아닙니다.\n즐겨찾기 된 스터디가 맞는지 확인해주세요.")
            }
            else if (status == 401){
                alert('즐겨찾기 기능은 로그인 후 사용가능합니다.\n로그인을 진행해주세요.');
            }
            else{
                alert('즐겨찾기 삭제에 실패하였습니다.');
            }

            return error;
        })
    }
}