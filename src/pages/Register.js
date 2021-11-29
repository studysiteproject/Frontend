/*eslint-disable*/

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../scss/pages/Register.scss'

import { RegisterAPI } from '../redux-modules/module/UserManage';
import { UserAuthActionList } from '../redux-modules/UserReducer';

import { REGEX, REGEX_MESSAGE } from '../data/regex';

import axios from 'axios';

function RegisterPage(){

    // 회원가입에 필요한 정보 임시 저장
    let [id, setid] = useState('');   // ID 값 임시 저장
    let [ableid, setableid] = useState(false); // ID 사용가능 여부

    let [pw, setpw] = useState('');   // 패스워드 임시 저장
    let [checkpw, setcheckpw] = useState(); // 패스워드 확인 값 임시 저장
    let [ablepw, setablepw] = useState(false); // PW 사용가능 여부

    let [nickname, setnickname] = useState(''); // 닉네임 값 임시 저장
    let [ablenickname, setablenickname] = useState(false); // 닉네임 사용가능 여부

    let [email, setemail] = useState(''); // 이메일 값 임시 저장
    let [ableemail, setableemail] = useState(false); // 이메일 사용가능 여부

    // 로그인 상태 확인
    let islogin = useSelector((state) => state.userReducer.islogin);
    let dispatch = useDispatch();

    let navigate = useNavigate();

    // 패스워드 확인 정규식은 현재 입력한 패스워드 값이 필요하기 때문에, 이 파일에 정의
    const Password_check_regex = `^${pw}$`;

    // 로그인 여부 확인
    useEffect(() => {
        if (typeof window !== 'undefined') {

            // localStorage에서 islogin 값을 얻어온다.
            const value = JSON.parse(window.localStorage.getItem("islogin"));
            if(value) dispatch(UserAuthActionList.SetLoginState(value))

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있을 때(로그인한 상태일 때)
            if (!document.cookie.includes('access_token') || !document.cookie.includes('index'))
            {   
                dispatch(UserAuthActionList.SetLoginState(false));
                localStorage.setItem("islogin", false);
            }
        }
    },[]);

    // ID 중복확인 함수
    function checkID(id){

        // ID가 입력되었을 때만
        if (id.length > 0){

            // ID 패턴에 만족하는 ID만 확인 (불필요한 요청 방지)
            if (id.match(new RegExp(REGEX.ID_regex))){
                axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/id_duplicate_check?user_id=${id}`, { withCredentials: true, credentials: "include" })
                .then(res => {
                    setableid(true);
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

    function checkPW(pw){
        
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

    function checkNickName(nickname){

        // 닉네임이 입력되었을 때만
        if (nickname.length > 0){
            
            // 만약 패스워드의 조건에 맞다면 true
            if (nickname.match(new RegExp(REGEX.Nickname_regex))){
                setablenickname(true);
            }
            else{
                setablenickname(false);
            }

        }

    }

    function checkEmail(email){

        // 이메일이 입력되었을 때만
        if (email.length > 0){
            
            // 만약 이메일의 조건에 맞다면 true
            if (email.match(new RegExp(REGEX.Email_regex))){
                console.log("!!!!!");
                setableemail(true);
            }
            else{
                setableemail(false);
            }

        }

    }
    
    // 이미 로그인된 상태일 때, 메인페이지로 강제 이동
    if (islogin){
        navigate('/');
        return(<></>);
    }
    else{
        return (
            <>
                <form className="Register" onSubmit={()=>{alert("회원가입 테스트 버튼");}}>
                    <div className="Register-View">
                        <img src="img/docker.svg" />
                        <div className="Register-View-input">

                            {/* 회원가입을 위한 정보 입력창 */}
                            <div className="Register-View-input-info">

                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>ID</text>
                                        <text className={`checkData ${ableid ? "able" : "error"}`}>{ableid ? "사용 가능한 ID입니다." : "사용할 수 없는 ID입니다."}</text>
                                    </div>
                                    <input type="text" onChange={(e)=>{setid(e.target.value);checkID(e.target.value)}} className="Register-View-input-info id" placeholder="ID" 
                                    pattern={REGEX.ID_regex} title={REGEX_MESSAGE.ID_message} required/>
                                </div>

                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>Password</text>
                                        <text className={`checkData ${ablepw ? "able" : "error"}`}>{ablepw ? "사용 가능한 PW입니다." : "사용할 수 없는 PW입니다."}</text>
                                    </div>
                                    <input type="password" onChange={(e)=>{setpw(e.target.value);checkPW(e.target.value)}} className="Register-View-input-info password" placeholder="Password"
                                    required/>
                                </div>

                                <div className="item">
                                    <text>Password 확인</text>
                                    <input type="password" onChange={(e)=>{setcheckpw(e.target.value)}} className="Register-View-input-info password" placeholder="Password Check"
                                    pattern={Password_check_regex} title={REGEX_MESSAGE.Password_check_message} required/>
                                </div>
                            
                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>닉네임</text>
                                        <text className={`checkData ${ablenickname ? "able" : "error"}`}>{ablenickname ? "사용 가능한 닉네임입니다." : "사용할 수 없는 닉네임입니다."}</text>
                                    </div>
                                    <input type="text" onChange={(e)=>{setnickname(e.target.value);checkNickName(e.target.value)}} className="Register-View-input-info nickname" placeholder="닉네임"
                                    pattern={REGEX.Nickname_regex} title={REGEX_MESSAGE.Nickname_message} required/>
                                </div>

                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>Email</text>
                                        <text className={`checkData ${ableemail ? "able" : "error"}`}>{ableemail ? "사용 가능한 Email입니다." : "사용할 수 없는 Email입니다."}</text>
                                    </div>
                                    <input type="text" onChange={(e)=>{setemail(e.target.value);checkEmail(e.target.value)}} className="Register-View-input-info email" placeholder="Email"
                                    pattern={REGEX.Email_regex} title={REGEX_MESSAGE.Email_message} required/>
                                </div>

                            </div>

                            {/* 회원가입 버튼 */}
                            <div class="Register-View-input-button">
                                <button type="submit" className="Button-Md">
                                    <text>회원가입</text>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default RegisterPage;