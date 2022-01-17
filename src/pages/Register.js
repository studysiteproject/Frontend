import '../scss/pages/Register.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import SelectBox from '../components/selectbox';

import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserAuthActionList } from '../redux-modules/UserReducer';
import { SendAuthEmail } from '../redux-modules/module/UserAuth';

import { CheckUserInfo } from '../components/util/Checkinfo';
import { REGEX, REGEX_MESSAGE } from '../data/regex';
import options from '../data/options';

import axios from 'axios';
import { ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import IsLogin, { IsLoginAPI } from '../components/util/islogin';

function RegisterPage(){

    // 회원가입에 필요한 정보 임시 저장
    const [id, setid] = useState('');   // ID 값 임시 저장
    const [ableid, setableid] = useState(false); // ID 사용가능 여부

    const [pw, setpw] = useState('');   // 패스워드 임시 저장
    const [checkpw, setcheckpw] = useState(''); // 패스워드 확인 값 임시 저장
    const [ablepw, setablepw] = useState(false); // 패스워드 사용가능 여부

    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [ablenickname, setablenickname] = useState(false); // 이름(닉네임) 사용가능 여부

    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [ableemail, setableemail] = useState(false); // 이메일 사용가능 여부

    const [job, setjob] = useState(''); // 직업 값 임시 저장

    const [ablesubmit, setablesubmit] = useState(false); // 회원가입 버튼 활성화 값 임시 저장

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 패스워드 확인 정규식은 현재 입력한 패스워드 값이 필요하기 때문에, 이 파일에 정의
    const Password_check_regex = `^${pw}$`;

    useEffect(()=>{
        dispatch(IsLoginAPI());
    },[])

    // 입력값이 변할때 마다 회원가입이 가능한지 확인
    useEffect(()=>{
        if (ableid && ablepw && ablenickname && ableemail && job.length > 0 && pw == checkpw){
            setablesubmit(true);
        }
        else{
            setablesubmit(false);
        }
    }, [ableid, ablepw, checkpw, ablenickname, ableemail, job])

    // 회원가입을 위한 데이터 검증 & 전송
    function Submit(id, pw, nickname, email, job){
        
        // 모든 항목에서 사용가능한 데이터를 입력했을 경우
        if (ablesubmit){

            // 회원가입 API에서 사용될 데이터
            const data = {
                "user_id": id,
                "user_pw": pw,
                "user_name": nickname,
                "user_email": email,
                "user_job": job
            }
            
            // 회원가입 API 호출
            axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/user/create`, data, { withCredentials: true, credentials: "include" })
            .then(res => {
                dispatch(ActivePopup("info", "회원가입에 성공하였습니다!\n로그인을 위해 회원가입 시 작성한 이메일로 전송된 인증 메일을 확인해주세요."));
                dispatch(UnActivePopup(2));
                dispatch(SendAuthEmail(email));
                setTimeout(()=>{navigate('/')}, 2000)
                return res;
            })
            .catch(error => {
                dispatch(ActivePopup("info", "회원가입에 실패하였습니다!"));
                dispatch(UnActivePopup(2));
                return error;
            });

        }

        else{
            dispatch(ActivePopup("info", "입력값을 확인해주세요."));
            dispatch(UnActivePopup(2));
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
                <Header/>
                <div className="Register">
        
                        <div className="Register-View">
                            
                            <img src="/img/docker.svg" />
    
                            <div className="Register-View-input">
    
                                {/* 입력창 + 버튼 */}
                                <div className="Register-View-input-info">
    
                                    {/* 회원가입을 위한 정보 입력창 */}
                                    <form>
    
                                        {/* ID 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>ID</text>
                                                {
                                                    id.length
                                                    ? <text className={`checkData ${ableid ? "able" : "error"}`}>{ableid ? "사용 가능한 ID입니다." : "사용할 수 없는 ID입니다."}</text>
                                                    : <text className={`checkData none`}>{"ID를 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setid(e.target.value);CheckUserInfo.checkID_action(e.target.value, setableid)}} 
                                                className="Register-View-input-info id" 
                                                placeholder="6 ~ 20자리를 입력해주세요." 
                                                pattern={REGEX.ID_regex} title={REGEX_MESSAGE.ID_message} 
                                                required
                                            />
                                        </div>
    
                                        {/* PW 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>Password</text>
                                                {
                                                    pw.length
                                                    ? <text className={`checkData ${ablepw ? "able" : "error"}`}>{ablepw ? "사용 가능한 PW입니다." : "사용할 수 없는 PW입니다."}</text>
                                                    : <text className={`checkData none`}>{"패스워드를 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="password" 
                                                onChange={(e)=>{setpw(e.target.value);CheckUserInfo.checkPW_action(e.target.value, setablepw)}} 
                                                className="Register-View-input-info password" 
                                                placeholder="8글자 이상 입력해주세요."
                                                required
                                            />
                                        </div>
    
                                        {/* PW 확인 값 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>Password 확인</text>
                                                {
                                                    checkpw.length
                                                    ? <text className={`checkData ${pw == checkpw ? "able" : "error"}`}>
                                                        {pw == checkpw 
                                                            ? <img class="sm" src="/img/icon/check_bold.svg" style={{margin:'0'}}/> 
                                                            : "패스워드와 동일하게 입력해주세요."}
                                                    </text>
                                                    : <text className={`checkData none`}>{"패스워드 확인 값을 입력해주세요."}</text>
                                                }
                                                
                                            </div>
                                            <input type="password" 
                                                onChange={(e)=>{setcheckpw(e.target.value)}} 
                                                className="Register-View-input-info passwordcheck" 
                                                placeholder="패스워드와 동일하게 입력해주세요."
                                                pattern={Password_check_regex} 
                                                title={REGEX_MESSAGE.Password_check_message} 
                                                required
                                            />
                                        </div>
    
                                        {/* 이름(닉네임) 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>닉네임</text>
                                                {
                                                    nickname.length
                                                    ? <text className={`checkData ${ablenickname ? "able" : "error"}`}>{ablenickname ? "사용 가능한 닉네임입니다." : "사용할 수 없는 닉네임입니다."}</text>
                                                    : <text className={`checkData none`}>{"닉네임을 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setnickname(e.target.value);CheckUserInfo.checkNickName_action(e.target.value, setablenickname)}} 
                                                className="Register-View-input-info nickname" 
                                                placeholder="3 ~ 20자를 입력해주세요."
                                                pattern={REGEX.Nickname_regex} 
                                                title={REGEX_MESSAGE.Nickname_message} 
                                                required
                                            />
                                        </div>
    
                                        {/* 이메일 입력창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>Email</text>
                                                {
                                                    email.length
                                                    ? <text className={`checkData ${ableemail ? "able" : "error"}`}>{ableemail ? "사용 가능한 Email입니다." : "사용할 수 없는 Email입니다."}</text>
                                                    : <text className={`checkData none`}>{"이메일을 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setemail(e.target.value);CheckUserInfo.checkEmail_action(e.target.value, setableemail)}} 
                                                className="Register-View-input-info email" 
                                                placeholder="이메일을 입력해주세요."
                                                pattern={REGEX.Email_regex} 
                                                title={REGEX_MESSAGE.Email_message} 
                                                required
                                            />
                                        </div>
    
                                        {/* 직업 선택창 */}
                                        <div className="item">
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <text>직업</text>
                                            </div>
                                            <SelectBox
                                                choice={job}
                                                setChoice={setjob}
                                                placeholder={"직업을 선택하세요."}
                                                options={options.job_data}
                                                isSearchable={false}
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
                                                    Submit(id, pw, nickname, email, job);
                                                }}>
                                                회원가입
                                            </button>
                                            : <button type="submit" className="Button-Md" disabled>
                                                회원가입
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

export default RegisterPage;