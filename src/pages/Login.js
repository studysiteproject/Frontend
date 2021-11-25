import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../scss/pages/Login.scss'

import { LoginAPI } from '../redux-modules/module/UserAuth';
import { UserAuthActionList } from '../redux-modules/UserReducer';

function LoginPage(){

    // ID & PW 값 임시 저장
    let [id, setid] = useState();
    let [pw, setpw] = useState();

    // 로그인 상태 확인
    let islogin = useSelector((state) => state.userReducer.islogin);
    let dispatch = useDispatch();

    let navigate = useNavigate();

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

    // 이미 로그인된 상태일 때, 메인페이지로 강제 이동
    if (islogin){
        navigate('/');
        return(<></>);
    }
    else{
        return (
            <>
                <div className="Login">
                    <div className="Login-View">
                        <img src="img/docker.svg" />
                        <div className="Login-View-input">

                            {/* ID & PW 입력 창 */}
                            <div className="Login-View-input-info">
                                <input type="text" onChange={(e)=>{setid(e.target.value)}} className="Login-View-input-info id" placeholder="ID"/>
                                <hr style={{margin: '0px', color: 'rgba(0, 0, 0, 0.10)'}}/>
                                <input type="password" onChange={(e)=>{setpw(e.target.value)}} className="Login-View-input-info password" placeholder="Password"/>
                            </div>

                            {/* 로그인 버튼 */}
                            <div class="Login-View-input-button">
                                <button className="Button-Md" onClick={()=>{dispatch(LoginAPI(id, pw));}}>
                                    <text>로그인</text>
                                </button>
                            </div>
                            
                            {/* 이동 버튼 */}
                            <ul className="Login-View-input-links">
                                <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>아이디 찾기</Link></li>
                                <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>비밀번호 찾기</Link></li>
                                <li className="text"><Link to="/signup" style={{ textDecoration: 'none', color: '#222222' }}>회원가입</Link></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginPage;