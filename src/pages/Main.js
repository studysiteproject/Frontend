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
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function MainPage(){

    const [select, setselect] = useState(0);
    const [MainSearch, setMainSearch] = useState("");

    const dispatch = useDispatch();

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
            <Category select={select} setselect ={setselect}/>
            <Banner/>
            <div className="flex-row-end">
                <Search setMainSearch={setMainSearch}/>
                <CreateStudyButton/>
            </div>
            <StudyList MainSearch={MainSearch}/>
            <Footer/>
        </>
    );
}

export default MainPage