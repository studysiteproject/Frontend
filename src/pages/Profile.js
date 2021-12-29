import '../scss/pages/Profile.scss'
import '../scss/base/icon.scss'

import Header from "../components/base/header";
import Footer from "../components/base/footer";
import SelectBox from '../components/selectbox';
import SearchSelectBox from '../components/searchselectbox';
import Search from '../components/input';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { UserAuthActionList } from "../redux-modules/UserReducer";
import { CheckUserInfo } from '../components/util/Checkinfo';

import { REGEX, REGEX_MESSAGE } from '../data/regex';
import job_data from '../data/job';

import axios from "axios";
import { Select } from '@material-ui/core';
import All_Tech_List from '../data/tech';

function ProfilePage(){
    
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [ablenickname, setablenickname] = useState(false); // 이름(닉네임) 사용가능 여부

    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [ableemail, setableemail] = useState(true); // 이메일 사용가능 여부

    const [job, setjob] = useState(''); // 직업 값 임시 저장

    // 기술 검색 값 임시 저장
    const [techsearch, setTechsearch] = useState('');

    const All_Tech_List = [
        {
           "id":1,
           "tech_name":"Spring",
           "img_url":"img/icon/tech/spring.svg"
        },
        {
           "id":2,
           "tech_name":"Github",
           "img_url":"img/icon/tech/github.svg"
        }
    ] // 전체 기술 목록

    const [mytecharray, setmytecharray] = useState([]); // 현재 나의 기술 목록(테스트)
    
    const [myurlarray, setmyurlarray] = useState([
        "https://dongyeon1201.kr",
        "https://profile.dongyeon1201.kr"
    ]); // 현재 나의 url 목록(테스트)

    const [newurl, setnewurl] = useState("");

    // 기술테크에 기술 추가
    function AddMytech(id, tech_name, url){
        let newarray = [...mytecharray];
        
        // 이미 존재하는 스킬인지 확인
        let isExist = false

        // 만약 이미 존재하는 스킬일경우 isExist 값을 참으로 변경
        newarray.map((item)=>{
            if (item.id == id){
                isExist = true
            }
        })

        // 이미 존재하는 스터디일경우 추가하지 않는다.
        if (!isExist){
            newarray.push({
                "id":id,
                "tech_name":tech_name,
                "img_url":url
            });

            // 변경된 배열 적용
            setmytecharray(newarray);
        }
    }

    // 기술테크에서 기술 삭제
    function DeleteMytech(id){
        var newarray = [...mytecharray];
        
        // 삭제를 원하는 기술이 존재할 경우 목록에서 삭제
        newarray.map((item, i)=>{
            if (item.id == id){
                newarray.splice(i,1);
            }
        })

        // 변경된 배열 적용
        setmytecharray(newarray);
    }

    // 기술 추가에 사용되는 목록 설정
    const techoption = (All_Tech_List) => {
        var array = []

        All_Tech_List.map((item)=>{
            array.push({
                "value": item.tech_name,
                "label": 
                    <div onClick={()=>{AddMytech(item.id, item.tech_name, item.img_url)}}>
                        <img class="md" src={item.img_url}></img>
                        <text>{item.tech_name}</text>
                    </div>
            })
        })

        return array
    }

    function AddUrl(newurl){
        alert(newurl);
        setnewurl("");
    }

    // 로그인 여부 확인
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

    // 정보 받아오기
    useEffect(()=>{

    },[]);

    // 로그인 되지 않았을 때
    // if (islogin){
        return(
            <>
                <Header/>
                    
                    <div className="Profile-Frame">

                        <div className='Profile-View-Frame'>

                            {/* 프로필 이미지 부분 */}
                            <div className="Profile-image">

                            </div>

                            <div className='Profile-View-input'>

                                <form>

                                    {/* 닉네임 조회, 변경 */}
                                    <div className="item">
                                        <div className='title'>
                                            <text>닉네임</text>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                                {
                                                    nickname.length
                                                    ? <text className={`checkData ${ablenickname ? "able" : "error"}`}>{ablenickname ? "사용 가능한 닉네임입니다." : "사용할 수 없는 닉네임입니다."}</text>
                                                    : <text className={`checkData none`}>{"닉네임을 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setnickname(e.target.value);CheckUserInfo.checkNickName_action(e.target.value, setablenickname)}} 
                                                className="Register-View-input-info nickname" 
                                                placeholder="3 ~ 20자를 입력해주세요."
                                                pattern={REGEX.Nickname_regex} 
                                                title={REGEX_MESSAGE.Nickname_message} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* 이메일 입력창 */}
                                    <div className="item">
                                        <div className='title'>
                                            <text>Email</text>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                                {
                                                    email.length
                                                    ? <text className={`checkData ${ableemail ? "able" : "error"}`}>{ableemail ? "사용 가능한 Email입니다." : "사용할 수 없는 Email입니다."}</text>
                                                    : <text className={`checkData none`}>{"이메일을 입력해주세요."}</text>
                                                }
                                            </div>
                                            <input type="text" 
                                                onChange={(e)=>{setemail(e.target.value);CheckUserInfo.checkEmail_action(e.target.value, setableemail)}} 
                                                className="Register-View-input-info email" 
                                                placeholder="이메일을 입력해주세요."
                                                pattern={REGEX.Email_regex} 
                                                title={REGEX_MESSAGE.Email_message} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* 직업 선택창 */}
                                    <div className="item">
                                        <div className='title' style={{display: "flex", alignSelf:"start"}}>
                                            <text>직업</text>
                                        </div>
                                        <div style={{width: '100%'}}>
                                            <SelectBox
                                                choice={job}
                                                setChoice={setjob}
                                                placeholder={"직업을 선택하세요."}
                                                options={job_data}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>

                                    {/* 기술스택 조회, 편집 */}
                                    <div className="item">
                                        <div className='title'>
                                            <text>기술스택</text>
                                        </div>
                                        <div className='tech'>

                                            {/* 현재 나의 기술 목록을 나타내는 리스트 */}
                                            {/* 현재는 item 클릭 시 삭제되도록 설정(테스트) */}
                                            <div className='tech-list'>
                                                {
                                                    mytecharray.map((item)=>{
                                                        return(
                                                            <div className="tech-item-box">
                                                                <div>
                                                                    <img class="md" src={item.img_url} style={{marginRight: '15px'}}></img>
                                                                    {item.tech_name}
                                                                    <img class="sm" src="/img/icon/coolicon.svg" style={{marginLeft: '15px'}}
                                                                        onClick={()=>{DeleteMytech(item.id)}}
                                                                    ></img>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            {/* 기술 목록 검색, 선택 박스 */}
                                            <SearchSelectBox
                                                choice={techsearch}
                                                setChoice={setTechsearch}
                                                placeholder={"원하는 기술을 검색하세요."}
                                                options={techoption(All_Tech_List)}
                                            />
                                        </div>
                                    </div>

                                    {/* URL 입력창 */}
                                    <div className="item" style={{flexDirection:"column"}}>
                                        <div className='title' style={{display: "flex", alignSelf:"start"}}>
                                            <text>URL</text>
                                        </div>
                                    </div>
                                                
                                    <div style={{marginBottom:"50px"}}>

                                        {/* 나의 url 갯수만큼 아이템을 보여준다. */}
                                        {
                                            myurlarray.map((item)=>{
                                                return(
                                                    <div className="item">
                                                        <div style={{paddingRight: '50px'}}>
                                                            <img class="md" src={"img/icon/tech/github.svg"} style={{marginRight: '15px'}}></img>
                                                        </div>
                                                            <input type="text" 
                                                                onChange={(e)=>{setemail(e.target.value);CheckUserInfo.checkEmail_action(e.target.value, setableemail)}} 
                                                                className="Register-View-input-info email" 
                                                                placeholder="URL을 입력해주세요."
                                                                pattern={REGEX.Email_regex} 
                                                                title={REGEX_MESSAGE.Email_message} 
                                                                required
                                                                readOnly
                                                                value={item}
                                                            />
                                                    </div>
                                                )
                                            })
                                        }


                                        <div style={{display:'flex', justifyContent: 'center'}}>
                                            
                                            {/* 입력창 */}
                                            <div style={{
                                                borderBottom: '1px solid black',
                                                width: (newurl.length * 0.65) + "em",
                                                minWidth: "30%"
                                            }}>
                                                <input
                                                    placeholder='URL을 입력해주세요.'
                                                    onChange={(e)=>{setnewurl(e.target.value)}}
                                                    style={{
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        display: 'flex',
                                                        alignSelf: 'center'
                                                    }}
                                                    value={newurl}
                                                ></input>
                                            </div>

                                            {/* url 추가 */}
                                            <img class="md" src={"img/icon/plus_circle.svg"}
                                                style={{
                                                    marginLeft: '15px'
                                                }}
                                                onClick={(e)=>{AddUrl(newurl);}}
                                            ></img>
                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                <Footer/>
            </>
        );
    // }
    // else{
    //     navigate('/login');
    //     return(<></>);
    // }
}

export default ProfilePage