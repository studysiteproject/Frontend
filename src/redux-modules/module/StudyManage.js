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
            console.log(error);
        })
    
    }
    
}