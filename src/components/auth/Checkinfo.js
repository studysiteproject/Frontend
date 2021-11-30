import axios from 'axios';
import { REGEX, REGEX_MESSAGE } from '../../data/regex';

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
                console.log("사용할 수 없는 이메일입니다.");
                setableemail(false);
            })
        }
        else{
            setableemail(false);
        }

    }

}

export const CheckUserInfo = {
    checkID,
    checkPW,
    checkNickName,
    checkEmail
}