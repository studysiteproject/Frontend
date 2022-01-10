import '../scss/pages/Main.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import Category from "../components/category";
import Banner from '../components/base/banner';
import Search from "../components/input";
import CreateStudyButton from "../components/button";
import StudyList from '../components/StudyList';

import axios from 'axios';

import { UserAuthActionList } from '../redux-modules/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetStudyListAPI } from '../redux-modules/module/StudyManage';

function MainPage(){

    // 카테고리 선택
    const [select, setselect] = useState(0);
    var categorylist = ['전체', '개발', '디자인', '공무원'];

    // 검색어 설정
    const [MainSearch, setMainSearch] = useState("");

    // 스터디 목록
    const studylist = useSelector((state) => state.studyReducer.studylist);
    let studylistlenth = studylist.length;

    const option = {
        "users": false,
        "edit": false,
        "delete": false,
        "leader": true,
        "favorite": true
    }

    const dispatch = useDispatch();

    // 스터디 목록 얻어오기
    useEffect(()=>{
        dispatch(GetStudyListAPI())
    },[studylistlenth]);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            // localStorage에서 islogin 값을 얻어온다.
            const value = JSON.parse(window.localStorage.getItem("islogin"));
            if(value) dispatch(UserAuthActionList.SetLoginState(value))

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있지 않을 때
            if (!document.cookie.includes('access_token') || !document.cookie.includes('index'))
            {   
                dispatch(UserAuthActionList.SetLoginState(false));
                localStorage.setItem("islogin", false);
            }

            // 토큰 & 유저 인덱스가 쿠키에 설정되어 있을 때 유효한 토큰인지 확인
            else{
                axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/auth/verify_user`, { withCredentials: true, credentials: "include" })
                .then(res => {
                    dispatch(UserAuthActionList.SetLoginState(true));
                    localStorage.setItem("islogin", true);
                    return res;
                })
                .catch(error => {
                    dispatch(UserAuthActionList.SetLoginState(false));
                    localStorage.setItem("islogin", false);
                    return error;
                });
            }
        }
    },[]);

    return (
        <>
            <Header/>
            <div style={{width:'80%', margin: 'auto'}}>
                <Category select={select} setselect ={setselect} categorylist={categorylist}/>
            </div>
            <Banner/>
            <div className="flex-row-end">
                <Search setMainSearch={setMainSearch}/>
                <CreateStudyButton/>
            </div>
            <div style={{width:'80%', margin: 'auto'}}>
            <StudyList 
                studylist={studylist} 
                studylistlenth={studylistlenth} 
                MainSearch={MainSearch}
                option={option}
            />
            </div>
            <Footer/>
        </>
    );
}

export default MainPage