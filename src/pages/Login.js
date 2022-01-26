import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../scss/pages/Login.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'

import { LoginAPI } from '../redux-modules/module/UserAuth';
import { UserAuthActionList } from '../redux-modules/UserReducer';
import axios from 'axios';
import IsLogin, { IsLoginAPI } from '../components/util/islogin';
import InfoFrame from '../components/base/InfoFrame';
import Background from '../components/base/background';

function LoginPage(){

    // ID & PW 값 임시 저장
    const [id, setid] = useState();
    const [pw, setpw] = useState();
    
    const islogin = useSelector((state) => state.userReducer.islogin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{
        // 로그인 확인 API 실행
        dispatch(IsLoginAPI());
    },[])

    // 엔터 입력 시 로그인 동작 기능
    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            dispatch(LoginAPI(id, pw));
        }
    }

    if (islogin && typeof islogin !== 'undefined'){
        navigate('/');
        return(<></>); 
    }
    else{
        return (
            <>
                <Header/>
                    <Background padding={'100px'}>
                        <InfoFrame width={'33%'} minWidth={'450px'}>
                            <div className="Login-View-input">
        
                                {/* ID & PW 입력 창 */}
                                <form onKeyPress={onCheckEnter} style={{width:'100%'}}>
                                    <div className="Login-View-input-info">
                                        <input type="text" onChange={(e)=>{setid(e.target.value)}} className="Login-View-input-info id" placeholder="ID"/>
                                        <hr style={{margin: '0px', color: 'rgba(0, 0, 0, 0.10)'}}/>
                                        <input type="password" onChange={(e)=>{setpw(e.target.value)}} className="Login-View-input-info password" placeholder="Password"/>
                                    </div>
                                </form>
        
                                {/* 로그인 버튼 */}
                                <div class="Login-View-input-button">
                                    <button className="Button-Md" onClick={()=>{dispatch(LoginAPI(id, pw));}}>
                                        로그인
                                    </button>
                                </div>
                                
                                {/* 이동 버튼 */}
                                <ul className="Login-View-input-links">
                                    <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>아이디 찾기</Link></li>
                                    <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>비밀번호 찾기</Link></li>
                                    <li className="text"><Link to="/register" style={{ textDecoration: 'none', color: '#222222' }}>회원가입</Link></li>
                                    <li className="text"><Link to="/auth/email/resend" style={{ textDecoration: 'none', color: '#222222' }}>이메일 인증하기</Link></li>
                                </ul>
        
                            </div>
                        </InfoFrame>
                    </Background>
                <Footer/>
            </>
        );
    }
}

export default LoginPage;