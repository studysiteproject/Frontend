import axios from "axios"

// 닉네임 / 이메일 / 직업 정보를 얻어온다.
function GetUserInfo(setdata, user_index){
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/basic?user_index=${user_index}`, { withCredentials: true, credentials: "include" })
    .then(res => {

        // 유저의 기본 정보 결과 얻어오기
        const user_info = res.data

        // 인자로 설정한 데이터 설정 함수를 이용하여 얻어온 정보 설정
        setdata.setnickname(user_info["user_name"])
        setdata.setdefaultnickname(user_info["user_name"])
        setdata.setemail(user_info["user_email"])
        setdata.setdefaultemail(user_info["user_email"])
        setdata.setjob(user_info["user_job"])
        setdata.setprofileimage(user_info["img_url"])

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

export const BasicInfo = {
    GetUserInfo
}

export const TechInfo = {
    GetAllTechList,
    MyTechList
}

export const UrlInfo = {
    MyUrlList
}