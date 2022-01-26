import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'rsuite';
import OverlayTrigger from 'rsuite/esm/Overlay/OverlayTrigger';
import options from '../../data/options';
import { BasicInfo } from '../../data/profile';
import { URL_TYPE_REGEX } from '../../data/regex';
import TESTPAGE from '../../pages/TEST';
import { UnActivePopup } from '../../redux-modules/module/InfoManage';
import { GetUserResumeAPI } from '../../redux-modules/module/UserManage';
import '../../scss/popup/UserResume.scss';
import { CheckUserInfo } from '../util/Checkinfo';
import TooltipIcon from '../util/TooltopIcon';

function UserResume(props){

    const dispatch = useDispatch();
    
    const [profileimage, setprofileimage] = useState("");
    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [job, setjob] = useState(''); // 직업 값 임시 저장
    const [description, setdescription] = useState('') // 스터디 신청글 임시 저장
    const [warningcnt, setwarning_cnt] = useState(0); // 스터디 신고 횟수 임시 저장

    // 이력서에서 사용되는 사용자의 기술 목록을 저장
    const [UserTechArray, SetUserTechArray] = useState([]); // 현재 유저의 기술 목록
    const renderTooltip = (value) => (
        <Tooltip>{value}</Tooltip>  // 사용자의 기술 이름을 표시해준다.
    );

    const [UserUrlArray, SetUserUrlArray] = useState([]); // 현재 유저의 url 목록

    useEffect(()=>{
 
        const SetBasicInfo = {
            setnickname,
            setemail,
            setjob,
            setprofileimage,
            setdescription,
            setwarning_cnt,
            SetUserTechArray,
            SetUserUrlArray,
        }
        dispatch(GetUserResumeAPI(SetBasicInfo, props.study_id, props.user_id));

    },[])

    return (
        <>
            <div className='user-resume-frame'>
                
                {/* 유저 프로필 사진 */}
                <div className='row-fill-container center-align'>
                    <div className="profile-image" style={{width:'30%', height:'30%', marginBottom: '20px'}}>
                        <img src={`${BasicInfo.PROFILE_BASE_URL}/${props.user_id}/${profileimage}`}/>
                    </div>
                </div>

                {/* 신고 횟수가 5번을 넘으면 경고 표시 */}
                {
                    warningcnt > 5
                    ?   <div className='row-fill-container end-align' style={{marginBottom: '20px'}}>
                            <img className='md' src={`${BasicInfo.ICON_BASE_URL}/warning.svg`}/>
                        </div>
                    :   null
                }

                {/* 유저 닉네임 */}
                <div className='users-resume-item'>
                    <div className='start-align row-fill-container'>
                        <text className='title'>닉네임</text>
                        <input className='Info-View-input row-fill-container'
                            value={nickname}
                            readOnly
                        />
                    </div>
                </div>

                {/* 유저 이메일 */}
                <div className='users-resume-item'>
                    <div className='start-align row-fill-container'>
                        <text className='title'>이메일</text>
                        <input className='Info-View-input row-fill-container'
                            value={email}
                            readOnly
                        />
                    </div>
                </div>

                {/* 유저 직업 */}
                <div className='users-resume-item'>
                    <div className='start-align row-fill-container'>
                        <text className='title'>직업</text>
                        <input className='Info-View-input row-fill-container'
                            value={options.job_ko[job]}
                            readOnly
                        />
                    </div>
                </div>

                {/* 유저 URL */}
                <div className='users-resume-item'>
                    <div className='title-item-column row-fill-container'>
                        <text className='title'>URL</text>

                        <div className='users-resume-item'>
                            {
                                UserUrlArray.map((item)=>{
                                    return(
                                        <div className='start-align row-fill-container'>
                                            <img className='md img-title' src={CheckUserInfo.CheckUrlType(item)}/>
                                            <input className='Info-View-input row-fill-container'
                                                value={item}
                                                readOnly
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* 유저 신청글 */}
                <div className='users-resume-item'>
                    <div className='start-align row-fill-container'>
                        <text className='title'>신청글</text>
                        <textarea className='Info-View-input row-fill-container'
                            value={description}
                            style={{minHeight:'250px'}}
                            readOnly
                        />
                    </div>
                </div>

                {/* 유저 기술스택 */}
                <div className='users-resume-item'>
                    <text className='title'>기술 스택</text>
                    <div className='title-item-row row-fill-container'>
                        <TooltipIcon Array={UserTechArray}/>
                    </div>
                </div>
                
                {/* 창닫기 버튼 */}
                <div className='center-align'>
                    <button 
                        className='Button-Sm'
                        onClick={()=>{props.setisResumeView({"isactive": false, "study_id": '', 'user_id':''})}}
                    >창닫기</button>
                </div>

            </div>

        </>
    )

}

export default UserResume;