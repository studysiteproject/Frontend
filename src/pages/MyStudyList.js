import '../scss/pages/MyStudyList.scss'

import Footer from "../components/base/footer"
import Header from "../components/base/header"
import { useEffect, useState } from 'react'
import { CheckUserInfo } from '../components/util/Checkinfo';
import { GetEditValue } from '../components/util/GetEditValue';
import { getCookieValue } from '../util';
import { BasicInfo, TechInfo, UrlInfo } from '../data/profile';

function MyStudyListPage(){

    const [profileimage, setprofileimage] = useState("");
    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [job, setjob] = useState(''); // 직업 값 임시 저장
    const [MyTechArray, SetMyTechArray] = useState([]); // 현재 나의 기술 목록
    const [myurlarray, setmyurlarray] = useState([]); // 현재 나의 url 목록

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

    return(
        <>
            <Header/>

                <div className="List-Frame">


                    {/* 프로필 요약 부분 */}
                    <div className="Profile-item">
                        <div className="profile-image">
                            <img src={profileimage}/>
                        </div>

                        <div className="Profile-info">
                            <div className='Font-Md Bold info'>{nickname}</div>
                            <div className='Font-Sm Semi Bold info'>{email}</div>
                            <button class="Button-Sm" style={{width:'100%'}}>프로필 관리</button>
                            <div className='Profile-info-detail'>
                                <div className='item'>
                                    <img class="sm" src="/img/icon/user.svg" style={{marginRight:'5px'}}/>
                                    <div className='Font-Sm Semi Bold info'>{job}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 스터디 목록 조회 부분 */}
                    <div className="StudyList-item">
                        2
                    </div>
                </div>

            <Footer/>
        </>
    )
}

export default MyStudyListPage