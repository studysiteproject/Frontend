import '../scss/pages/Register.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'

import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserAuthActionList } from '../redux-modules/UserReducer';
import { PasswordReset, SendAuthEmail, SendPasswordResetPageEmail } from '../redux-modules/module/UserAuth';

import { CheckUserInfo } from '../components/util/Checkinfo';
import { REGEX, REGEX_MESSAGE } from '../data/regex';
import IsLogin, { IsLoginAPI } from '../components/util/islogin';
import Background from '../components/base/background';
import InfoFrame from '../components/base/InfoFrame';
import { ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';

// 패스워드 초기화 페이지 요청 위해 아이디와 이메일을 입력하는 페이지
export function PasswordResetReqPage(){

    // 요청 필요한 정보 임시 저장
    const [userid, setuserid] = useState(''); // 유저 ID 값 임시 저장
    const [ableuserid, setableuserid] = useState(false); // 유저 ID 사용가능 여부
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [ableemail, setableemail] = useState(false); // 이메일 사용가능 여부

    const [ablesubmit, setablesubmit] = useState(false); // 요청 버튼 활성화 값 임시 저장

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{
        // 로그인 확인 API 실행
        dispatch(IsLoginAPI());
    },[])

    // 입력값이 변할때 마다 요청이 가능한지 확인
    useEffect(()=>{
        if (ableuserid && ableemail){
            setablesubmit(true);
        }
        else{
            setablesubmit(false);
        }
    }, [ableuserid, ableemail])
    
    // 아이디 사용 가능 여부 확인
    useEffect(()=>{
        if (userid.match(new RegExp(REGEX.ID_regex))){
            setableuserid(true);            
        }
        else{
            setableuserid(false);
        }
    },[userid])

    // 이메일 사용 가능 여부 확인
    useEffect(()=>{
        if (email.match(new RegExp(REGEX.Email_regex))){
            setableemail(true);     
        }
        else{
            setableemail(false);
        }
    },[email])

    if(islogin && typeof islogin !== 'undefined'){
        navigate('/');
        return(<></>);      
    }
    else{
        return (
            <>
                <Header/>
                {/* 입력창 + 버튼 */}
                <Background padding={'100px'}>
                    <InfoFrame width={'50%'}>
                        <div className="Register-View-input-info">

                            {/* 요청을 위한 정보 입력창 */}
                            <form>

                                {/* 유저 아이디 입력창 */}
                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>ID</text>
                                    </div>
                                    <input type="text" 
                                        onChange={(e)=>{setuserid(e.target.value)}} 
                                        className="Register-View-input-info id" 
                                        placeholder="ID를 입력해주세요."
                                        pattern={REGEX.ID_regex} 
                                        title={REGEX_MESSAGE.ID_message} 
                                        required
                                    />
                                </div>

                                {/* 이메일 입력창 */}
                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>Email</text>
                                    </div>
                                    <input type="text" 
                                        onChange={(e)=>{setemail(e.target.value)}} 
                                        className="Register-View-input-info email" 
                                        placeholder="이메일을 입력해주세요."
                                        pattern={REGEX.Email_regex} 
                                        title={REGEX_MESSAGE.Email_message} 
                                        required
                                    />
                                </div>

                            </form>

                            {/* 요청 버튼 */}
                            <div class="Register-View-input-button" style={{marginTop: '10px'}}>
                                
                                {/* 모든 데이터를 정상적으로 입력하면 요청 버튼이 활성화된다. */}
                                <button type="submit" className="Button-Md" 
                                    onClick={()=>{
                                        dispatch(SendPasswordResetPageEmail(userid, email));
                                        dispatch(ActivePopup("info", "메일 전송중입니다."));
                                        dispatch(UnActivePopup(2));                            
                                    }}
                                    disabled={
                                        ablesubmit
                                        ?   false
                                        :   true
                                    }
                                >패스워드 초기화 메일 전송</button>
                            
                            </div>

                        </div>
                    </InfoFrame>
                </Background>
                <Footer/>
            </>
        );
    }
}

// 패스워드 초기화를 위해 새로운 패스워드를 입력하는 페이지
export function PasswordResetPage(){

    const { token } = useParams();

    // 요청에 필요한 정보 임시 저장
    const [newpw, setnewpw] = useState(''); // 패스워드 값 임시 저장
    const [ablenewpw, setablenewpw] = useState(false); // 패스워드 값 사용가능 여부 확인
    const [checkpw, setcheckpw] = useState(''); // 패스워드 확인 값 임시 저장

    const [ablesubmit, setablesubmit] = useState(false); // 요청 버튼 활성화 값 임시 저장

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{
        // 로그인 확인 API 실행
        dispatch(IsLoginAPI());
    },[])

    // 입력값이 변할때 마다 요청이 가능한지 확인
    useEffect(()=>{
        if (newpw == checkpw && ablenewpw){
            setablesubmit(true);
        }
        else{
            setablesubmit(false);
        }
    }, [newpw, checkpw])
    
    // 아이디 사용 가능 여부 확인
    useEffect(()=>{
        if (newpw.match(new RegExp(REGEX.Password_regex))){
            setablenewpw(true);            
        }
        else{
            setablenewpw(false);
        }
    },[newpw])

    if(islogin && typeof islogin !== 'undefined'){
        navigate('/');
        return(<></>);      
    }
    else{
        return (
            <>
                <Header/>
                {/* 입력창 + 버튼 */}
                <Background padding={'100px'}>
                    <InfoFrame width={'50%'}>
                        <div className="Register-View-input-info">

                            {/* 요청을 위한 정보 입력창 */}
                            <form>

                                {/* 새로운 패스워드 입력창 */}
                                <div className="item">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>새로운 패스워드</text>
                                    </div>
                                    <input type="password" 
                                        onChange={(e)=>{setnewpw(e.target.value)}} 
                                        className="Info-View-input password" 
                                        placeholder="새로운 패스워드를 입력해주세요."
                                        pattern={REGEX.Password_regex}
                                        required
                                    />
                                </div>

                                {/* 패스워드 확인 입력창 */}
                                <div className="password">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <text>패스워드 확인</text>
                                    </div>
                                    <input type="text" 
                                        onChange={(e)=>{setcheckpw(e.target.value)}} 
                                        className="Register-View-input-info check" 
                                        placeholder="패스워드 확인을 위해 다시 입력해주세요."
                                        pattern={REGEX.Password_regex} 
                                        title={REGEX_MESSAGE.Password_check_message} 
                                        required
                                    />
                                </div>

                            </form>

                            {/* 요청 버튼 */}
                            <div class="Register-View-input-button" style={{marginTop: '20px'}}>
                                
                                {/* 모든 데이터를 정상적으로 입력하면 요청 버튼이 활성화된다. */}
                                <button type="submit" className="Button-Md" 
                                    onClick={()=>{
                                        dispatch(PasswordReset(token, newpw, checkpw));
                                        navigate('/');
                                    }}
                                    disabled={
                                        ablesubmit
                                        ?   false
                                        :   true
                                    }
                                >패스워드 초기화</button>
                            
                            </div>

                        </div>
                    </InfoFrame>
                </Background>
                <Footer/>
            </>
        );
    }
}