import axios from "axios"

// API에 요청하여 전체 기술 목록을 얻어온다.
function GetAllTechList(setdata){
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/tech/all`, { withCredentials: true, credentials: "include" })
    .then(res => {
        setdata(res.data)
        return res
    })
    .catch(error => {
        return error;
    })
}

function MyTechList(setdata, user_index){
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/tech?user_index=${user_index}`, { withCredentials: true, credentials: "include" })
    .then(res => {
        setdata(res.data);
        return res;
    })
    .catch(error => {
        return error;
    })
}

function MyUrlList(setdata, user_index){
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/url?user_index=${user_index}`, { withCredentials: true, credentials: "include" })
    .then(res => {
        setdata(res.data);
        return res;
    })
    .catch(error => {
        return error;
    })
}


export const TechInfo = {
    GetAllTechList,
    MyTechList
}

export const UrlInfo = {
    MyUrlList
}