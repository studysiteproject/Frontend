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

// let fileUploadHandler = ()=>{
//     const fd = new FormData();

//     let header ={
//       Cookie: document.cookie
//     }

//     fd.append('image', selectFile, selectFile.name);
//     axios.post('http://localhost:8000/profile/image',fd, { headers: header, withCredentials: true, credentials: "include" })
//       .then(res => {
//         console.log(res);
//       });
// }

// let loginHandler = ()=>{

//     let data = {
//         user_id: id,
//         user_pw: pw
//     }

//     axios.post('http://localhost:8000/auth/login', data, { withCredentials: true, credentials: "include" })
//         .then(res => {
//         console.log(res);
//         })
//         .catch(function (error) {
//         console.log(error);
//         });
// }