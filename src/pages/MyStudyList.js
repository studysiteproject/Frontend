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
import { GetStudyListAPI } from '../redux-modules/module/StudyManage';
import { BasicInfo, TechInfo, UrlInfo } from '../data/profile';

import { useEffect, useState } from 'react'
import { Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserAuthActionList } from '../redux-modules/UserReducer';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from 'axios';
import { times } from 'lodash';
import { StudyActionList } from '../redux-modules/StudyReducer';
import IsLoginPage, { IsLoginAPI } from '../components/util/islogin';


function MyStudyListPage(){

    const islogin = useSelector((state) => state.userReducer.islogin);

    // 프로필에서 사용되는 사용자의 정보를 저장
    const [profileimage, setprofileimage] = useState("");
    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [job, setjob] = useState(''); // 직업 값 임시 저장
    const job_ko = {
        "student": "학생",
        "university" : "대학생",
        "job-seeker" : "취준생",
        "salaryman" : "직장인"
    }

    // 프로필에서 사용되는 사용자의 URL 목록을 저장
    const [myurlarray, setmyurlarray] = useState([]); // 현재 나의 url 목록
    
    // 프로필에서 사용되는 사용자의 기술 목록을 저장
    const [MyTechArray, SetMyTechArray] = useState([]); // 현재 나의 기술 목록
    const renderTooltip = (value) => (
        <Tooltip>{value}</Tooltip>  // 사용자의 기술 이름을 표시해준다.
    );

    // 선택한 카테고리에 대한 정보
    const [select, setselect] = useState(0);   // 몇 번째 카테고리를 선택했는지 저장
    var categorylist = ['내가 생성한 스터디', '참여중인 스터디', '즐겨찾기 목록'];   // 카테고리 종류
    
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
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function GetStudy(select){
        if (islogin || typeof islogin === 'undefined')
        {   
            switch (select){
                case 0:
                    dispatch(GetStudyListAPI("created"))
                    setOption({
                        "users": true,
                        "edit": true,
                        "delete": true,
                        "exit": false,
                        "leader": false,
                        "favorite": false
                    })
                    break;
                case 1:
                    dispatch(GetStudyListAPI("applicationlist"))
                    setOption({
                        "users": true,
                        "edit": false,
                        "delete": false,
                        "exit": true,
                        "leader": false,
                        "favorite": false
                    });
                    break;
                case 2:
                    dispatch(GetStudyListAPI("favorite"))
                    setOption({
                        "users": false,
                        "edit": false,
                        "delete": false,
                        "exit": false,
                        "leader": true,
                        "favorite": true
                    });
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
        GetStudy(select);
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
                                <img src={profileimage}/>
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
                                        <div className='Font-Sm Semi Bold'>{job_ko[job]}</div>
                                    </div>
    
                                    {/* URL 목록 */}
                                    {
                                        myurlarray.map((item)=>{
                                            return(
                                                <div className='item'>
                                                    <img class="sm" src="/img/icon/url.svg" style={{marginRight:'5px'}}/>
                                                    <div className='Font-Sm Bold start-align ellipsis-div start-align'>
                                                        <a class="Font-Sm Semi" href={item} target="_blank">{item}</a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
    
                                    {/* 구분선 */}
                                    <hr style={{marginBottom:'10px'}}/>
                                    
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
                            />
                            
                        </div>
                    </div>
    
                <Footer/>
            </>
        )
    }

}

export default MyStudyListPage