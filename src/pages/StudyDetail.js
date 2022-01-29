import '../scss/pages/StudyDetail.scss';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BasicInfo } from '../data/profile';
import { AddFavoriteAPI, DeleteFavoriteAPI, DeleteStudyAPI, EditStudyActiveAPI, GetStudyInfoAPI } from '../redux-modules/module/StudyManage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ActiveConfirmPopup, ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import { IsLoginAPI } from '../components/util/islogin';
import TooltipIcon from '../components/util/TooltopIcon';
import InfoFrame from '../components/base/InfoFrame';
import { PopupConfirm, PopupInfo } from '../components/util/Popup';
import UserProfile from '../components/popup/UserProfile';
import StudyRecruit from '../components/popup/StudyRecruit';
import { StudyReport } from '../components/popup/StudyReport';
import options from '../data/options';
import Comments from '../components/Comments';
import NavItem from 'rsuite/esm/Nav/NavItem';

function StudyDetailPage(){

    const _ = require('lodash');

    const { study_id } = useParams();

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(''); // 스터디 제목
    const [description, setdescription] = useState(''); // 스터디의 내용
    const [category, setcategory] = useState(''); // 스터디의 카테고리
    const [place, setplace] = useState(''); // 스터디의 장소
    const [maxman, Setmaxman] = useState(10); // 스터디 최대 인원 설정
    const [StudyTechArray, SetStudyTechArray] = useState([]); // 현재 나의 기술 목록
    
    const [nowman, Setnowman] = useState(10); // 스터디 현재 인원 설정
    const [warncnt, setWarncnt] = useState(0);
    const [createDate, setcreateDate] = useState('');
    const [isfavorite, setisfavorite] = useState(false);
    const [isactive, setisactive] = useState("");

    const [leaderinfo, setleaderinfo] = useState({});   // 스터디 작성자 정보 임시 저장
    const [iswriter, setiswriter] = useState(false);    // 해당 스터디의 작성자인지 확인

    // 프로필 팝업 관련 정보
    const [isProfileView, setisProfileView] = useState({"isactive": false, 'user_id':''});
    
    // 스터디 신청 관련 팝업 정보
    const [isRecruitView, setisRecruitView] = useState({"isactive": false});
    
    // 스터디 신고 관련 팝업 정보
    const [isReportView, setisReportView] = useState({"isactive": false});

    // 선택 창에서 사용할 함수
    const [ok, setok] = useState(()=>()=>{});
    const [no, setno] = useState(()=>()=>{});

    function checkiswritter(study_id){
        
        // 헤더 설정
        let header = {
            Cookie: document.cookie
        }

        if (islogin){
            axios.get(`${process.env.REACT_APP_SPRING_API_URL}/study/check/${study_id}`, { headers: header, withCredentials: true, credentials: "include" })
            .then(res => {
                setiswriter(res.data['iswriter']);  // 작성자 확인
                return res;
            })
            .catch(error => {
                dispatch(ActivePopup("error", "스터디 작성자 여부를 확인할 수 없습니다!"));
                dispatch(UnActivePopup(2));
                setiswriter(false);
                return error
            })
        }
    }
    
    useEffect(()=>{
        checkiswritter(study_id);
    })

    useEffect(()=>{
        dispatch(IsLoginAPI());
    },[])

    // 페이지 로드 시
    useEffect(()=>{
        const SetBasicInfo = {
            setTitle,
            setcategory,
            setplace,
            SetStudyTechArray,
            Setmaxman,
            setdescription,
            Setnowman,
            setWarncnt,
            setcreateDate,
            setisfavorite,
            setisactive,
            setleaderinfo
        }

        // 스터디의 기본정보 얻어오기 
        GetStudyInfoAPI(SetBasicInfo, study_id, true);
    },[]);

    return(
        <>
            <Header/>
                <div className='Study-Detail-Frame' style={{minWidth:'1000px'}}>

                    {/* 스터디 부가 정보(생성자, 즐겨찾기, 경고 등) */}
                    <div className='row-fill-container between-align item'>

                        {/* 유저 정보, 생성시간 */}
                        <div id='User-Info' className='start-align'>

                            {/* 프로필 이미지 */}
                            <div style={{width:'50px', height:'50px', marginRight:'20px'}}>
                                <div className='profile-image'>
                                    {
                                        leaderinfo.img_url == 'default.png'
                                        ?   <img src={`${BasicInfo.PROFILE_DEFAULT_URL}`}/>
                                        :   <img src={`${BasicInfo.PROFILE_BASE_URL}/${leaderinfo.id}/${leaderinfo.img_url}`}/>
                                    }                  
                                </div>
                            </div>

                            {/* 유저 이름 */}
                            <text 
                                className='Font-Md hover-text'
                                onClick={()=>{
                                    setisProfileView({"isactive": true, 'user_id': leaderinfo.id})
                                }}
                                style={{marginRight:'20px'}}
                            >
                                {leaderinfo.user_name}
                            </text>

                            {/* 생성시간 */}
                            <text 
                                className='Font-Sm info'
                            >
                                {createDate.replace('T', ' ')}
                            </text>

                        </div>
                        
                        {/* 아이콘 & 모집중 여부 */}
                        <div className='center-align'>
                            
                            {/* 신고 횟수가 5번을 넘으면 경고 표시 */}
                            {
                                warncnt > 5
                                ?   <div className='row-fill-container end-align' style={{marginBottom: '20px'}}>
                                        <img className='md' src={`${BasicInfo.ICON_BASE_URL}/warning.svg`}/>
                                    </div>
                                :   null
                            }

                            {/* 즐겨찾기 옵션 활성화 시 스터디 즐겨찾기 버튼(하트) 추가 */}
                            {
                                isfavorite && islogin
                                ?   <img
                                        className='icon' 
                                        src={`${BasicInfo.ICON_BASE_URL}/heart_fill.svg`} 
                                        onClick={()=>{
                                            dispatch(DeleteFavoriteAPI(study_id));
                                            setisfavorite(false);
                                        }}
                                    />
                                :   <img
                                        className='icon'
                                        src={`${BasicInfo.ICON_BASE_URL}/heart_unfill.svg`} 
                                        onClick={()=>{
                                            dispatch(AddFavoriteAPI(study_id));
                                            setisfavorite(true);
                                        }}
                                    />
                            }

                            {/* 모집중 / 모집 완료 확인 */}
                            <button className='Button-Sm' style={{width:'100px'}}>
                            {
                                isactive
                                ?   "모집중"
                                :   "모집 종료"
                            }
                            </button>

                        </div>

                    </div>
                    
                    {/* 스터디 제목 */}
                    <div className='Info-View-input row-fill-container item title'>
                        {title}
                    </div>
                    
                    {/* 스터디 상세 정보 */}
                    <div className='Info-View-input row-fill-container item'>
                        <div className='Study-Info-Detail start-column-align'>
                            
                            {/* 지역 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>지역</text>
                                <text className='start-align Font-Sm Semi'>{place}</text>
                            </div>

                            {/* 모집분야 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>모집분야</text>
                                <text className='start-align Font-Sm Semi'>{options.category_ko[category]}</text>
                            </div>

                            {/* 최대 모집 인원 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>모집인원</text>
                                <text className='start-align Font-Sm Semi'>{`${maxman}명`}</text>
                            </div>

                            {/* 현재인원 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>현재인원</text>
                                <text className='start-align Font-Sm Semi'>{`${nowman}명`}</text>
                            </div>

                            {/* 기술스택 */}
                            <div className='title-item-row item-detail'>
                                {/* <text className='start-align Font-Sm Semi Bold'>기술스택</text> */}
                                <div className='title-item-row row-fill-container'>
                                    <TooltipIcon Array={StudyTechArray}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 스터디 상세 내용 */}
                    <textarea 
                        className='Info-View-input row-fill-container item' 
                        style={{minHeight:'200px', resize: 'none'}}
                        value={description}
                        readOnly
                    />
                    
                    {/* 로그인한 작성자만 편집 & 삭제 버튼 활성화 */}
                    {
                        islogin && iswriter
                        ?   <div className='evenly-align'>

                                {/* 스터디 편집 이동 버튼 */}
                                <button 
                                    className='Button-Md'
                                    onClick={()=>{
                                        navigate(`/study/edit/${study_id}`);
                                    }}
                                >
                                스터디 편집하기
                                </button>

                                {/* 스터디 모집 상태 변경 버튼 */}
                                <button 
                                    className='Button-Md'
                                    onClick={()=>{
                                        setok(()=>()=>{
                                            dispatch(EditStudyActiveAPI(study_id));
                                            navigate('/study/manage');
                                        });
                                        setno(()=>()=>{dispatch(UnActivePopup())});

                                        if(isactive) dispatch(ActiveConfirmPopup("info", "스터디의 팀원 모집을 종료하시겠습니까?"));
                                        else dispatch(ActiveConfirmPopup("info", "스터디의 팀원 모집을 활성화하시겠습니까?"));
                                    }}
                                >
                                {
                                    isactive
                                    ?   "모집 종료"
                                    :   "모집 활성화"
                                }
                                </button>

                                {/* 스터디 삭제 버튼 */}
                                <button 
                                    className='Button-Md'
                                    onClick={()=>{
                                        setok(()=>()=>{
                                            dispatch(DeleteStudyAPI(study_id));
                                            window.location.href = '/';
                                        });
                                        setno(()=>()=>{dispatch(UnActivePopup())});
                                        dispatch(ActiveConfirmPopup("info", "이 스터디를 정말 삭제하시겠습니까?"));        
                                    }}
                                >
                                스터디 삭제하기
                                </button>
                            </div>
                        :   <div className='evenly-align'>
                                <button 
                                    className='Button-Md'
                                    onClick={()=>{
                                        if(islogin){
                                            setisRecruitView({"isactive": true})
                                        }
                                        else{
                                            dispatch(ActivePopup("error", "스터디 신청은 로그인 후 가능합니다."));
                                            dispatch(UnActivePopup(2));
                                        }
                                    }}
                                    disabled={!isactive}    // 스터디 마감 시 신청 제한
                                >
                                스터디 신청하기
                                </button>
                                <button 
                                    className='Button-Md'
                                    onClick={()=>{
                                        if(islogin){
                                            setisReportView({"isactive": true})
                                        }
                                        else{
                                            dispatch(ActivePopup("error", "스터디 신고는 로그인 후 가능합니다."));
                                            dispatch(UnActivePopup(2));
                                        }
                                    }}
                                >
                                스터디 신고하기
                                </button>
                            </div>
                    }

                    <hr/>

                    <Comments
                        study_id={study_id}
                        setok={setok}
                        setno={setno}
                        setisProfileView={setisProfileView}
                        iswriter={iswriter}
                    />

                </div>
            <Footer/>

            <PopupConfirm ok={ok} no={no}/>
            
            {/* 유저 프로필 팝업 부분 */}
            {
                isProfileView.isactive
                ?   <PopupInfo padding={"5%"}>
                        <InfoFrame width={'800px'}>
                            <UserProfile
                                user_id={isProfileView.user_id}
                                setisProfileView={setisProfileView}
                            />
                        </InfoFrame>
                    </PopupInfo>
                :   null
            }

            {/* 스터디 신청 팝업 부분 */}
            {
                isRecruitView.isactive
                ?   <PopupInfo padding={"5%"}>
                        <InfoFrame width={'800px'}>
                            <StudyRecruit
                                study_id={study_id}
                                setisRecruitView={setisRecruitView}
                            />
                        </InfoFrame>
                    </PopupInfo>
                :   null
            }

            {/* 스터디 신고 팝업 부분 */}
            {
                isReportView.isactive
                ?   <PopupInfo padding={"5%"}>
                        <InfoFrame width={'800px'}>
                            <StudyReport
                                study_id={study_id}
                                setisReportView={setisReportView}
                            />
                        </InfoFrame>
                    </PopupInfo>
                :   null
            }
        </>
    )

}

export default StudyDetailPage