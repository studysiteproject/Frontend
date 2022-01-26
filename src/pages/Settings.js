import '../scss/pages/Settings.scss';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import Background from "../components/base/background";
import InfoFrame from "../components/base/InfoFrame";

import { useEffect, useState } from 'react';
import { IsLoginAPI } from '../components/util/islogin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckUserInfo } from '../components/util/Checkinfo';
import { REGEX_MESSAGE } from '../data/regex';
import { PopupConfirm } from '../components/util/Popup';
import { ActiveConfirmPopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import { ChangePasswordAPI, LeaveUserAPI } from '../redux-modules/module/UserManage';

function SettingsPage() {

    const [pw, setpw] = useState('');   // 패스워드 임시 저장
    const [newpw, setnewpw] = useState('');   // 새로운 패스워드 임시 저장
    const [checkpw, setcheckpw] = useState(''); // 패스워드 확인 값 임시 저장
    const [ablepw, setablepw] = useState(false); // 패스워드 사용가능 여부
    const [ablechangepw, setablechangepw] = useState(false); // 패스워드 사용가능 여부

    // 패스워드 확인 정규식은 현재 입력한 패스워드 값이 필요하기 때문에, 이 파일에 정의
    const Password_check_regex = `^${pw}$`;

    // 선택 창에서 사용할 함수
    const [ok, setok] = useState(()=>()=>{});
    const [no, setno] = useState(()=>()=>{});    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);

    useEffect(()=>{
        dispatch(IsLoginAPI());
    },[])

    // 입력값이 변할때 마다 회원가입이 가능한지 확인
    useEffect(()=>{
        if (newpw == checkpw && newpw.length > 0 && checkpw.length > 0){
            setablechangepw(true);
        }
        else{
            setablechangepw(false);
        }
    }, [pw, newpw, checkpw])

    if (!islogin && typeof islogin !== 'undefined'){
        navigate('/login');
        return(<></>);
    }
    else{
        return(
            <>
                <Header/>
                    <Background padding={'100px'}>
                        <InfoFrame width={'50%'} minWidth={'450px'}>

                            {/* 패스워드 변경 부분 */}
                            <div className="title-item-column" style={{padding:'10%'}}>
                                <text className="title" style={{marginBottom:'30px'}}>패스워드 변경</text>
                                <div className="start-column-align row-fill-container center-align">
                                    
                                    {/* 기존 패스워드 입력 */}
                                    <div className='title-item-column item'>
                                        <div className="title-item-row between-align">
                                            <text className="Font-Sm Bold">기존 패스워드 입력</text>
                                        </div>
                                        <input type="password" 
                                            onChange={(e)=>{setpw(e.target.value)}} 
                                            className="Info-View-input"
                                            placeholder="8글자 이상 입력해주세요."
                                            required
                                        />
                                    </div>

                                    {/* 새로운 패스워드 입력 */}
                                    <div className='title-item-column item'>
                                        <div className="title-item-row between-align">
                                            <text className="Font-Sm Bold">새로운 패스워드 입력</text>
                                            {
                                                newpw.length
                                                ? <text className={`checkData ${ablepw ? "able" : "error"}`}>{ablepw ? "사용 가능한 PW입니다." : "사용할 수 없는 PW입니다."}</text>
                                                : <text className={`checkData none`}>{"패스워드를 입력해주세요."}</text>
                                            }
                                        </div>
                                        <input 
                                            type="password" 
                                            onChange={(e)=>{
                                                setnewpw(e.target.value);
                                                CheckUserInfo.checkPW_action(e.target.value, setablepw)
                                            }} 
                                            className="Info-View-input" 
                                            placeholder="8글자 이상 입력해주세요."
                                            required
                                        />
                                    </div>

                                    {/* 확인 패스워드 입력 */}
                                    <div className='title-item-column item'>
                                        <div className="title-item-row between-align">
                                            <text className="Font-Sm Bold">확인 패스워드 입력</text>
                                            {
                                                checkpw.length
                                                ? <text className={`checkData ${newpw == checkpw ? "able" : "error"}`}>
                                                    {newpw == checkpw 
                                                        ? <img class="sm" src="/img/icon/check_bold.svg" style={{margin:'0'}}/> 
                                                        : "패스워드와 동일하게 입력해주세요."}
                                                </text>
                                                : <text className={`checkData none`}>{"패스워드 확인 값을 입력해주세요."}</text>
                                            }
                                        </div>
                                        <input type="password" 
                                            onChange={(e)=>{
                                                setcheckpw(e.target.value)
                                            }} 
                                            className="Info-View-input" 
                                            placeholder="패스워드와 동일하게 입력해주세요."
                                            pattern={Password_check_regex} 
                                            title={REGEX_MESSAGE.Password_check_message} 
                                            required
                                        />
                                    </div>
                                        
                                    {/* 패스워드 변경 버튼 */}
                                    <div>
                                        <button 
                                            className='Button-Md'
                                            onClick={()=>{
                                                setok(()=>()=>{
                                                    dispatch(ChangePasswordAPI(pw, newpw, checkpw));
                                                    setTimeout(()=>{navigate('/login')}, 4500)
                                                });
                                                setno(()=>()=>{dispatch(UnActivePopup())});
                                                dispatch(ActiveConfirmPopup("info", "패스워드를 변경하시겠습니까?"));
                                            }}
                                            disabled={
                                                ablechangepw
                                                ?   pw.length > 0
                                                    ? false
                                                    : true
                                                :   true
                                            }
                                        >
                                        패스워드 변경하기
                                        </button>
                                    </div>

                                </div>
                            </div>
                            
                            {/* 회원탈퇴 부분 */}
                            <div className="title-item-column" style={{padding:'10%', paddingTop:'0'}}>
                                <text className="title" style={{marginBottom:'30px'}}>회원 탈퇴</text>

                                {/* 회원탈퇴 변경 버튼 */}
                                <div>
                                    <button 
                                        className='Button-Md'
                                        onClick={()=>{
                                            setok(()=>()=>{
                                                dispatch(LeaveUserAPI());
                                                setTimeout(()=>{navigate('/')}, 4500)
                                            });
                                            setno(()=>()=>{dispatch(UnActivePopup())});
                                            dispatch(ActiveConfirmPopup("error", "탈퇴 시 복구가 불가능하며, 생성한 스터디의 정보도 모두 사라집니다.\n정말 탈퇴하시겠습니까?"));
                                        }}
                                    >
                                    회원 탈퇴하기
                                    </button>
                                </div>
                            </div>

                        </InfoFrame>
                    </Background>
                <Footer/>

                <PopupConfirm ok={ok} no={no}/>

            </>
        );
    }

}

export default SettingsPage