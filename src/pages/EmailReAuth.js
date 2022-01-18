import '../scss/pages/Register.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'

import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserAuthActionList } from '../redux-modules/UserReducer';
import { SendAuthEmail } from '../redux-modules/module/UserAuth';

import { CheckUserInfo } from '../components/util/Checkinfo';
import { REGEX, REGEX_MESSAGE } from '../data/regex';
import IsLogin, { IsLoginAPI } from '../components/util/islogin';

function EmailReAuthPage(){

    // 회원가입에 필요한 정보 임시 저장
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [ableemail, setableemail] = useState(false); // 이메일 사용가능 여부

    const [ablesubmit, setablesubmit] = useState(false); // 회원가입 버튼 활성화 값 임시 저장

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{
        // 로그인 확인 API 실행
        dispatch(IsLoginAPI());
    },[])

    // 입력값이 변할때 마다 회원가입이 가능한지 확인
    useEffect(()=>{
        if (ableemail){
            setablesubmit(true);
        }
        else{
            setablesubmit(false);
        }
    }, [ableemail])
    
    if(islogin && typeof islogin !== 'undefined'){
        navigate('/');
        return(<></>);      
    }
    else{
        return (
            <>
                <Header/>
                <div className="Register">
        
                        <div className="Register-View">
                            
                            <img src="/img/docker.svg" />
    
                            <div className="Register-View-input">
    
                                {/* 입력창 + 버튼 */}
                                <div className="Register-View-input-info">
    
                                    {/* 회원가입을 위한 정보 입력창 */}
                                    <form>
    
                                        {/* 이메일 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>Email</text>
                                                <text className={`checkData ${ableemail ? "able" : "error"}`}>{ableemail ? "유효한 Email입니다." : "유효하지 않은 Email입니다."}</text>
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setemail(e.target.value);CheckUserInfo.AbleAuthEmail(e.target.value, setableemail)}} 
                                                className="Register-View-input-info email" 
                                                placeholder="이메일을 입력해주세요."
                                                pattern={REGEX.Email_regex} 
                                                title={REGEX_MESSAGE.Email_message} 
                                                required
                                            />
                                        </div>
    
                                    </form>
    
                                    {/* 회원가입 버튼 */}
                                    <div class="Register-View-input-button" style={{marginTop: '10px'}}>
    
                                        {/* 모든 데이터를 정상적으로 입력하면 회원가입 버튼이 활성화된다. */}
                                        {
                                            ablesubmit
                                            ? <button type="submit" className="Button-Md" 
                                                    onClick={()=>{
                                                        dispatch(SendAuthEmail(email));
                                                    }}
                                                >인증메일 재전송</button>
    
                                            : <button type="submit" className="Button-Md" value={"인증메일 재전송"} disabled>
                                                인증메일 재전송                                                
                                            </button>
                                        }
    
                                    </div>
    
                                </div>
                                
                            </div>
    
                        </div>
                    
                </div>
                <Footer/>
            </>
        );
    }
}

export default EmailReAuthPage;