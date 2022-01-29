import '../scss/pages/MyStudyList.scss'

import Footer from "../components/base/footer"
import Header from "../components/base/header"
import Category from '../components/category';
import Search from '../components/input';
import CreateStudyButton from '../components/button';
import StudyList from '../components/StudyList';

import { CheckUserInfo } from '../components/util/Checkinfo';
import { GetEditValue } from '../components/util/GetEditValue';
import { getCookieValue } from '../util';
import { DeleteUserAPI, EditUserPermissionAPI, GetStudyListAPI } from '../redux-modules/module/StudyManage';
import { BasicInfo, TechInfo, UrlInfo } from '../data/profile';

import { useEffect, useState } from 'react'
import { Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserAuthActionList } from '../redux-modules/UserReducer';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from 'axios';
import { map, times } from 'lodash';
import { StudyActionList } from '../redux-modules/StudyReducer';
import IsLoginPage, { IsLoginAPI } from '../components/util/islogin';
import { PopupConfirm, PopupInfo } from '../components/util/Popup';
import InfoFrame from '../components/base/InfoFrame';
import { ActiveConfirmPopup, ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import UserInStudy from '../components/popup/UserInStudy';
import UserResume from '../components/popup/UserResume';
import options from '../data/options';

function MyStudyListPage(){

    const islogin = useSelector((state) => state.userReducer.islogin);

    // 프로필에서 사용되는 사용자의 정보를 저장
    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [job, setjob] = useState(''); // 직업 값 임시 저장
    const [profileimage, setprofileimage] = useState("");

    // 프로필에서 사용되는 사용자의 URL 목록을 저장
    const [myurlarray, setmyurlarray] = useState([]); // 현재 나의 url 목록
    
    // 프로필에서 사용되는 사용자의 기술 목록을 저장
    const [MyTechArray, SetMyTechArray] = useState([]); // 현재 나의 기술 목록
    const renderTooltip = (value) => (
        <Tooltip>{value}</Tooltip>  // 사용자의 기술 이름을 표시해준다.
    );

    // 선택한 카테고리에 대한 정보
    const [select, setselect] = useState(0);   // 몇 번째 카테고리를 선택했는지 저장
    var categorylist = ['내가 생성한 스터디', '신청한 스터디', '즐겨찾기 목록'];   // 카테고리 종류
    
    // 스터디 리스트에서 사용할 옵션
    const [option, setOption] = useState({
        "users": false,
        "edit": false,
        "delete": false,
        "exit": false,
        "leader": false,
        "favorite": false
    })

    // 검색창의 검색 내용
    const [MainSearch, setMainSearch] = useState("");

    // 스터디 목록
    const studylist = useSelector((state) => state.studyReducer.studylist);
    let studylistlenth = studylist.length;

    // 스터디의 팀원 & 유저 정보를 확인하기 위한 팝업
    const [isUsersView, setisUsersView] = useState({"isactive": false, "study_id": ''});
    const [onlyview, setonlyview] = useState(false);
    const [isResumeView, setisResumeView] = useState({"isactive": false, "study_id": '', 'user_id':''});

    // 선택 창에서 사용할 함수
    const [ok, setok] = useState(()=>()=>{});
    const [no, setno] = useState(()=>()=>{});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function SetInit(){
        return new Promise(()=>{
            StudyActionList.Initaction();
        })
    }

    function GetStudy(category){
        return new Promise(()=>{
            dispatch(GetStudyListAPI(category));
        })
    }

    function SetOption(option){
        return new Promise(()=>{
            setOption(option);
        })
    }

    function SetStudy(select){

        if (islogin || typeof islogin === 'undefined')
        {   
            switch (select){
                case 0:
                    SetInit()
                    .then(GetStudy("created"))
                    .then(SetOption({
                    "users": true,
                    "edit": true,
                    "delete": true,
                    "exit": false,
                    "leader": false,
                    "favorite": false
                    }))
                    setonlyview(false)
                    break;
                case 1:
                    SetInit()
                    .then(GetStudy("applicationlist"))
                    .then(SetOption({
                        "users": true,
                        "edit": false,
                        "delete": false,
                        "exit": true,
                        "leader": false,
                        "favorite": false
                    }))
                    setonlyview(true)
                    break;
                case 2:
                    SetInit()
                    .then(GetStudy("favorite"))
                    .then(SetOption({
                        "users": false,
                        "edit": false,
                        "delete": false,
                        "exit": false,
                        "leader": true,
                        "favorite": true
                    }))             
                    break;
            }
        }
    }

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{

        // 로그인 확인 API 실행
        dispatch(IsLoginAPI());
        
    },[])

    // 사용자의 정보 받아오기
    useEffect(()=>{

        // 로그인한 사용자의 쿠키 값에서 index 얻어오기
        const user_index = getCookieValue("index");
        
        const SetBasicInfo = {
            setnickname,
            setemail,
            setjob,
            setprofileimage,
        }

        // 닉네임, 이메일, 직업정보, 프로필 이미지 조회
        BasicInfo.GetUserInfo(SetBasicInfo, user_index, false);

        // 현재 나의 URL 목록 얻어오기
        UrlInfo.MyUrlList(setmyurlarray, user_index);
                
        // 현재 나의 기술 목록 얻어오기
        TechInfo.MyTechList(SetMyTechArray, user_index);

    },[]);

    // 카테고리 변경 시 스터디 목록 옵션 변경
    useEffect(()=>{
        SetStudy(select);
    },[select]);

    if(!islogin && typeof islogin !== 'undefined'){
        navigate('/login');
        return(<></>); 
    }
    else{
        return(
            <>
                <Header/>
                    <div className="List-Frame">
                        
                        {/* 프로필 요약 부분 */}
                        <div className="Profile-item">
    
                            {/* 프로필 이미지 부분 */}
                            <div className="profile-image" style={{width:'80%', marginBottom: '10px'}}>
                                {
                                    profileimage.includes('default.png')
                                    ?   <img src={`${BasicInfo.PROFILE_DEFAULT_URL}`}/>
                                    :   <img src={profileimage}/>
                                }
                            </div>
    
                            {/* 회원 상세 정보 */}
                            <div className="Profile-info">
    
                                {/* 이름 */}
                                <div className='Font-Md Bold ellipsis-div'>{nickname}</div>
    
                                {/* 이메일 */}
                                <div className='Font-Sm Semi Bold ellipsis-div'>{email}</div>
    
                                {/* 프로필 관리 버튼 */}
                                <button class="Button-Sm" style={{width:'100%'}} onClick={()=>{navigate('/profile')}}>프로필 관리</button>
    
                                {/* 직업, 기술목록, URL 정보 */}
                                <div className='Profile-info-detail'>
    
                                    {/* 직업 */}
                                    <div className='item'>
                                        <img class="sm" src="/img/icon/user.svg" style={{marginRight:'5px'}}/>
                                        <div className='Font-Sm Semi Bold'>{options.job_ko[job]}</div>
                                    </div>
    
                                    {/* URL 목록 */}
                                    {
                                        myurlarray.map((item)=>{
                                            return(
                                                <div className='item'>
                                                    <img class="sm" src={CheckUserInfo.CheckUrlType(item)} style={{marginRight:'5px'}}/>
                                                    <div className='Font-Sm Bold start-align ellipsis-div start-align'>
                                                        <a class="Font-Sm Semi" href={item} target="_blank">{item}</a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
    
                                    {/* 구분선 */}
                                    <hr style={{margin:'10px 0px 10px 0px'}}/>
                                    
                                    {/* 기술 목록 확인 */}
                                    <div className='Profile-info-detail tech'>
                                        {
                                            MyTechArray.map((item)=>{
                                                return(
                                                    <OverlayTrigger placement="top" overlay={renderTooltip(item['name'])}>
                                                        <img
                                                            className='icon'
                                                            src={`${BasicInfo.TECH_ICON_BASE_URL}/${item['category']}/${item['icon_url']}`}
                                                        />
                                                    </OverlayTrigger>
                                                )
                                            })
                                        }
                                    </div>
    
                                </div>
                            </div>
    
                        </div>
    
                        {/* 스터디 목록 조회 부분 */}
                        <div className="StudyList-item">
    
                            {/* 스터디 목록의 카테고리 */}
                            <Category 
                                select={select} 
                                setselect ={setselect} 
                                categorylist={categorylist}
                            />
    
                            {/* 검색창, 스터디 추가 버튼 */}
                            <div className="flex-row-end" style={{width:'100%', margin:'0px'}}>
                                <Search setMainSearch={setMainSearch}/>
                                <CreateStudyButton/>
                            </div>
    
                            {/* 스터디 목록 */}
                            <StudyList
                                studylist={studylist} 
                                studylistlenth={studylistlenth}                             
                                MainSearch={MainSearch}
                                option={option}
                                ismain={false}
                                setisUsersView={setisUsersView}
                                setok={setok}
                                setno={setno}
                            />
                            
                        </div>
                    </div>
                <Footer/>
                
                {/* 스터디에 신청 / 참여 중인 유저 목록 확인 팝업 */}
                {
                    isUsersView.isactive
                    ?   <PopupInfo>
                            <InfoFrame width={'800px'}>
                                <UserInStudy
                                    study_id={isUsersView.study_id}
                                    setisUsersView={setisUsersView}
                                    setisResumeView={setisResumeView}
                                    setok={setok}
                                    setno={setno}
                                    onlyview={onlyview}
                                />
                            </InfoFrame>
                        </PopupInfo>
                    :   null
                }

                {
                    isResumeView.isactive
                    ?   <PopupInfo padding={"5%"}>
                            <InfoFrame width={'800px'}>
                                <UserResume
                                    user_id={isResumeView.user_id}
                                    study_id={isResumeView.study_id}
                                    setisResumeView={setisResumeView}
                                />
                            </InfoFrame>
                        </PopupInfo>
                    :   null
                }

                <PopupConfirm ok={ok} no={no}/>
                    
            </>
        )
    }

}

export default MyStudyListPage