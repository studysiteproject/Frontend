import axios from "axios"

// 닉네임 / 이메일 / 직업 정보를 얻어온다.
function GetUserInfo(setdata, user_index, include_default=true){
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/basic?user_index=${user_index}`, { withCredentials: true, credentials: "include" })
    .then(res => {

        // 유저의 기본 정보 결과 얻어오기
        const user_info = res.data

        // 인자로 설정한 데이터 설정 함수를 이용하여 얻어온 정보 설정
        setdata.setnickname(user_info["user_name"])
        setdata.setemail(user_info["user_email"])
        setdata.setjob(user_info["user_job"])
        setdata.setprofileimage(`${PROFILE_BASE_URL}/${user_index}/${user_info["img_url"]}`)
        
        if (include_default){
            setdata.setdefaultnickname(user_info["user_name"])
            setdata.setdefaultemail(user_info["user_email"])
        }

        return res
    })
    .catch(error => {
        return error;
    })
}

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

// API에 요청하여 user_index를 가진 사용자의 기술 목록을 얻어온다.
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

// API에 요청하여 user_index를 가진 사용자의 URL 목록을 얻어온다.
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

const PROFILE_BASE_URL = "https://catchstudy-images.s3.ap-northeast-2.amazonaws.com/profile";
const URL_TYPE_ICON_BASE_URL = "/img/icon/url"
const TECH_ICON_BASE_URL = "img/icon/tech"

export const BasicInfo = {
    GetUserInfo,
    PROFILE_BASE_URL,
    URL_TYPE_ICON_BASE_URL,
    TECH_ICON_BASE_URL
}

export const TechInfo = {
    GetAllTechList,
    MyTechList
}

export const UrlInfo = {
    MyUrlList
}