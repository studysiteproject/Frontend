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
import { IsLoginAPI } from '../components/util/islogin';
import { StudyActionList } from '../redux-modules/StudyReducer';

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

        switch (select){
            case 1:
                dispatch(GetStudyListAPI("dev"));
                break;
            case 2:
                dispatch(GetStudyListAPI("design"));
                break;
            case 3:
                dispatch(GetStudyListAPI("official"));
                break;
            default:
                dispatch(GetStudyListAPI("all"));
        }

    },[select]);

    useEffect(() => {
        dispatch(IsLoginAPI());
    },[]);

    useEffect(() => {
        return ()=>{
            dispatch(StudyActionList.Initaction());
            setTimeout(()=>{},100);
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
                ismain={true}
            />
            </div>
            <Footer/>
        </>
    );
}

export default MainPage