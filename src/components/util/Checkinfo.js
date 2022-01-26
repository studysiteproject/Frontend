import axios from 'axios';
import { BasicInfo } from '../../data/profile';
import { REGEX, REGEX_MESSAGE, URL_TYPE_REGEX } from '../../data/regex';

const _ = require('lodash');

// ID 중복 & 패턴 확인 함수
function checkID(id, setableid){

    // ID가 입력되었을 때만
    if (id.length > 0){

        // 불필요한 요청을 방지하기 위해 ID의 규격에 맞는 값만 검증
        if (id.match(new RegExp(REGEX.ID_regex))){
            axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/id_duplicate_check?user_id=${id}`, { withCredentials: true, credentials: "include" })
            .then(res => {
                // res.data['available'] == true -> 사용가능한 ID
                // res.data['available'] == false -> 사용할 수 없는 ID
                res.data['available'] ? setableid(true) : setableid(false)
            })
            .catch(error => {
                console.log("사용할 수 없는 ID입니다.");
                setableid(false);
            })
        }
        else{
            setableid(false);
        }

    }

}

// 패스워드 패턴확인 함수
function checkPW(pw, setablepw){
    
    // 패스워드가 입력되었을 때만
    if (pw.length > 0){
        
        // 만약 패스워드의 조건에 맞다면 true
        if (pw.match(new RegExp(REGEX.Password_regex))){
            setablepw(true);
        }
        else{
            setablepw(false);
        }

    }

}

// 이름(닉네임) 중복 & 패턴 확인 함수
function checkNickName(nickname, setablenickname){

    // 닉네임이 입력되었을 때만
    if (nickname.length > 0){
        
        // 불필요한 요청을 방지하기 위해 닉네임의 규격에 맞는 값만 검증
        if (nickname.match(new RegExp(REGEX.Nickname_regex))){
            axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/name_duplicate_check?user_name=${nickname}`, { withCredentials: true, credentials: "include" })
            .then(res => {
                // res.data['available'] == true -> 사용가능한 이름(닉네임)
                // res.data['available'] == false -> 사용할 수 없는 이름(닉네임)
                res.data['available'] ? setablenickname(true) : setablenickname(false)
            })
            .catch(error => {
                console.log("사용할 수 없는 이름(닉네임)입니다.");
                setablenickname(false);
            })
        }
        else{
            setablenickname(false);
        }

    }

}

// 이메일 중복 & 패턴 확인 함수
function checkEmail(email, setableemail){

    // 이메일이 입력되었을 때만
    if (email.length > 0){
        
        // 불필요한 요청을 방지하기 위해 이메일의 규격에 맞는 값만 검증
        if (email.match(new RegExp(REGEX.Email_regex))){
            axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/email_duplicate_check?user_email=${email}`, { withCredentials: true, credentials: "include" })
            .then(res => {
                // res.data['available'] == true -> 사용가능한 이메일
                // res.data['available'] == false -> 사용할 수 없는 이메일
                res.data['available'] ? setableemail(true) : setableemail(false)
            })
            .catch(error => {
                setableemail(false);
            })
        }
        else{
            setableemail(false);
        }

    }

}

// 인증 가능한 이메일인지 확인 함수
// 가입 시 사용하는 연재 사용하지 않는 이메일을 체크하는 목적이라면
// 이 함수는 이메일 인증을 받기위해 기존에 사용중인 Email인지 확인한다.
function AbleAuthEmail(email, setableemail){

    // 이메일이 입력되었을 때만
    if (email.length > 0){
        
        // 불필요한 요청을 방지하기 위해 이메일의 규격에 맞는 값만 검증
        if (email.match(new RegExp(REGEX.Email_regex))){
            axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/email_duplicate_check?user_email=${email}`, { withCredentials: true, credentials: "include" })
            .then(res => {
                // res.data['available'] == true -> 해당 메일로 가입한 기록이 없는 경우(인증 불가)
                // res.data['available'] == false -> 해당 메일로 가입한 기록이 있는 경우(인증 가능)
                res.data['available'] ? setableemail(false) : setableemail(true)
            })
            .catch(error => {
                setableemail(false);
            })
        }
        else{
            setableemail(false);
        }

    }

}

// URL 패턴확인 함수
function checkUrl(url, seturlable){
    
    // URL이 입력되었을 때만
    if (url.length > 0){

        // 만약 URL의 조건에 맞다면 true
        if (url.match(new RegExp(REGEX.URL_regex))){
            seturlable(true);
        }
        else{
            seturlable(false);
        }

    }
    else{
        seturlable(false);
    }

}

// 입력한 URL이 어떤 홈페이지의 URL인지(EX : Github, LinkedIn, Notion, ...)
function CheckUrlType(url){

    // url 타입이 저장된 json 값의 key 목록을 가져온다.
    const url_type_keys = Object.keys(URL_TYPE_REGEX);

    for (var index=0; index<url_type_keys.length; index++) {
        
        let type_name = url_type_keys[index]

        if (url.match(new RegExp(URL_TYPE_REGEX[type_name]))){
            return `${BasicInfo.URL_TYPE_ICON_BASE_URL}/${type_name}.svg`
        }
    }

    return `${BasicInfo.URL_TYPE_ICON_BASE_URL}/default.svg`
}

// 불필요한 요청을 줄이기 위해 입력 데이터 검사 함수는 디바운싱 방식 이용
const checkID_action = _.debounce(checkID, 500);
const checkPW_action = _.debounce(checkPW, 500);
const checkNickName_action = _.debounce(checkNickName, 500);
const checkEmail_action = _.debounce(checkEmail, 500);
const checkUrl_action = _.debounce(checkUrl, 200);

export const CheckUserInfo = {
    checkID_action,
    checkPW_action,
    checkNickName_action,
    checkEmail_action,
    checkUrl_action,
    CheckUrlType,
    AbleAuthEmail
}