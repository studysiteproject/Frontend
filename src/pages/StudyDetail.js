import '../scss/pages/StudyDetail.scss';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BasicInfo } from '../data/profile';
import { AddFavoriteAPI, DeleteFavoriteAPI, GetStudyInfoAPI } from '../redux-modules/module/StudyManage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import { IsLoginAPI } from '../components/util/islogin';
import TooltipIcon from '../components/util/TooltopIcon';
import UserResume from '../components/popup/UserResume';
import InfoFrame from '../components/base/InfoFrame';
import { PopupInfo } from '../components/util/Popup';
import UserProfile from '../components/popup/UserProfile';

function StudyDetailPage(){

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
    const [iswriter, setiswriter] = useState(false);    // 해당 스터디의 작성자인지

    const [isProfileView, setisProfileView] = useState({"isactive": false, 'user_id':''});

    useEffect(()=>{
        dispatch(IsLoginAPI());
    },[])

    // 페이지 로드 시
    useEffect(()=>{

        // 헤더 설정
        let header = {
            Cookie: document.cookie
        }

        axios.get(`${process.env.REACT_APP_SPRING_API_URL}/study/check/${study_id}`, { headers: header, withCredentials: true, credentials: "include" })
        .then(res => {

            // 작성자 확인
            setiswriter(res.data['iswriter'])

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

            return res;
        })
        .catch(error => {
            dispatch(ActivePopup("error", "스터디 작성자 여부를 확인할 수 없습니다!"));
            dispatch(UnActivePopup(2));
            setiswriter(false);
            return error
        })

    },[]);

    return(
        <>
            <Header/>
                <div className='Study-Detail-Frame' style={{minWidth:'1000px'}}>

                    {/* 스터디 부가 정보(생성자, 즐겨찾기, 경고 등) */}
                    <div className='row-fill-container between-align item'>

                        {/* 유저 정보 */}
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
                            >
                                {leaderinfo.user_name}
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
                                isfavorite
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
                                isactive == ""
                                ?   "로딩중" 
                                :   isactive
                                    ?   "모집중"
                                    :   "모집 종료"
                            }
                            </button>

                        </div>

                    </div>
                    
                    {/* 스터디 제목 */}
                    <div className='Info-View-input row-fill-container item title'>
                        {`${study_id}번 스터디입니다.`}
                    </div>
                    
                    {/* 스터디 상세 정보 */}
                    <div className='Info-View-input row-fill-container item'>
                        <div className='Study-Info-Detail start-column-align'>
                            
                            {/* 지역 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>지역</text>
                                <text className='start-align Font-Sm Semi'>123</text>
                            </div>

                            {/* 모집분야 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>모집분야</text>
                                <text className='start-align Font-Sm Semi'>123</text>
                            </div>

                            {/* 최대 모집 인원 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>모집인원</text>
                                <text className='start-align Font-Sm Semi'>123</text>
                            </div>

                            {/* 현재인원 */}
                            <div className='title-item-row item-detail'>
                                <text className='start-align Font-Sm Semi Bold'>현재인원</text>
                                <text className='start-align Font-Sm Semi'>123</text>
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
                    <textarea className='Info-View-input row-fill-container item' style={{minHeight:'200px'}}>
                        {`${study_id}번 스터디입니다.`}
                    </textarea>
                    
                    {/* 로그인한 작성자만 편집 & 삭제 버튼 활성화 */}
                    {
                        islogin && iswriter
                        ?   <div className='evenly-align'>
                                <button className='Button-Md'>스터디 편집하기</button>
                                <button className='Button-Md'>스터디 삭제하기</button>
                            </div>
                        :   <div className='evenly-align'>
                                <button className='Button-Md'>스터디 신청하기</button>
                                <button className='Button-Md'>스터디 신고하기</button>
                            </div>
                    }

                </div>
            <Footer/>

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
        </>
    )

}

export default StudyDetailPage