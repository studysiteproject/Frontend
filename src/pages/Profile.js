import '../scss/pages/Profile.scss'
import '../scss/base/icon.scss'

import Header from "../components/base/header";
import Footer from "../components/base/footer";
import SelectBox from '../components/selectbox';
import SearchSelectBox from '../components/searchselectbox';
import Search from '../components/input';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import { UserAuthActionList } from "../redux-modules/UserReducer";
import { CheckUserInfo } from '../components/util/Checkinfo';

import { REGEX, REGEX_MESSAGE, URL_TYPE_REGEX } from '../data/regex';
import job_data from '../data/job';
import { getCookieValue } from '../util';

import axios from "axios";
import { BasicInfo, TechInfo, UrlInfo } from '../data/profile';
import { SendAuthEmail } from '../redux-modules/module/UserAuth';

function ProfilePage(){
    
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileimage, setprofileimage] = useState(''); // 프로필 이미지 경로
    const hiddenFileInput = React.useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const [nickname, setnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [defaultnickname, setdefaultnickname] = useState(''); // 이름(닉네임) 값 임시 저장
    const [ablenickname, setablenickname] = useState(true); // 이름(닉네임) 사용가능 여부

    const [email, setemail] = useState(''); // 이메일 값 임시 저장
    const [defaultemail, setdefaultemail] = useState(''); // 이메일 값 임시 저장
    const [ableemail, setableemail] = useState(true); // 이메일 사용가능 여부

    const [job, setjob] = useState(''); // 직업 값 임시 저장
    
    const [AllTechList, SetAllTechList] = useState([]); // 전체 기술 목록
    const [MyTechArray, SetMyTechArray] = useState([]); // 현재 나의 기술 목록
    const [techsearch, setTechsearch] = useState(''); // 기술 검색 값 임시 저장

    const [myurlarray, setmyurlarray] = useState([]); // 현재 나의 url 목록
    const [newurl, setnewurl] = useState(""); // url 추가를 위해 입력한 새로운 url 값
    const [newurlable, setnewurlable] = useState(false); // 새로운 url 값의 사용 가능 여부

    const [ablesubmit, setablesubmit] = useState(false); // 회원 수정 버튼 활성화 값 임시 저장

    // 엔터 입력 시 URL 추가 동작 기능
    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            AddUrl(newurl);
        }
    }

    function UploadProfile(files){
        
        const user_index = getCookieValue("index");
        const uploadFile = files[0];

        const formData = new FormData();
        formData.append('files',uploadFile);
        
        // 프로필 이미지 업로드 API 호출
        axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/profile/image`, formData, { 'Content-Type': 'multipart/form-data', withCredentials: true, credentials: "include" })
        .then(res => {
            setprofileimage(
                `${BasicInfo.PROFILE_BASE_URL}/${user_index}/${res.data['filename']}`
            );
            return res;
        })
        .catch(error => {
            alert("업로드에 실패하였습니다!");
            return error;
        });

    }

    // 기술테크에 기술 추가
    function AddMytech(id, name, icon_url){

        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/tech/add?tech_index=${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            let newarray = [...MyTechArray];
        
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
                    "name":name,
                    "icon_url":icon_url
                });
    
                // 변경된 배열 적용
                SetMyTechArray(newarray);
            }    
        })
        .catch(error => {
            return error;
        })

    }

    // 기술테크에서 기술 삭제
    function DeleteMytech(id){
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/tech/delete?tech_index=${id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            var newarray = [...MyTechArray];
        
            // 삭제를 원하는 기술이 존재할 경우 목록에서 삭제
            newarray.map((item, i)=>{
                if (item.id == id){
                    newarray.splice(i,1);
                }
            })
    
            // 변경된 배열 적용
            SetMyTechArray(newarray);    
        })
        .catch(error => {
            return error;
        })
    }

    // 기술 추가에 사용되는 목록 설정
    const techoption = (AllTechList) => {
        var array = []

        AllTechList.map((item)=>{
            array.push({
                "value": item.name,
                "label": 
                    <div onClick={()=>{AddMytech(item.id, item.name, item.icon_url)}}>
                        <img class="md" src={`${BasicInfo.TECH_ICON_BASE_URL}/${item.icon_url}`} style={{marginRight:'10px'}}/>
                        <text>{item.name}</text>
                    </div>
            })
        })

        return array
    }

    // URL 목록에 새로운 URL을 추가
    function AddUrl(url){

        // 추가 가능한 URL 값인지 확인
        if (newurlable){
            axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/url/add?input_url=${newurl}`, { withCredentials: true, credentials: "include" })
            .then(res => {
                // 만약 이미 존재하는 url을 추가하려는 경우
                if (myurlarray.includes(url)){
                    alert("이미 존재하는 url 입니다.");
                }
                else{
                    // 배열에 새로운 값을 추가하기 위한 배열 복제
                    var newarray = [...myurlarray];
            
                    // 새롭게 입력한 url값 추가 후 적용
                    newarray.push(url);
                    setmyurlarray(newarray);
                }
    
                // input 태그의 값과 사용가능 여부 초기화
                setnewurl("");
                setnewurlable(false);
            })
            .catch(error => {
                return error;
            })
        }

        // 사용할 수 없는 URL 값인 경우 알림
        else{
            alert("이미 존재하는 URL 이거나 사용할 수 없는 URL값 입니다.");
        }
    }

    // URL 목록에서 URL을 삭제
    function DeleteUrl(url){
        
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/profile/url/delete?input_url=${url}`, { withCredentials: true, credentials: "include" })
        .then(res => {

            if (myurlarray.includes(url)){
                
                // 배열에 새로운 값을 추가하기 위한 배열 복제
                var newarray = [...myurlarray];
                
                // 삭제를 원하는 기술이 존재할 경우 목록에서 삭제
                newarray.map((item, i)=>{
                    if (item == url){
                        newarray.splice(i,1);
                    }
                })
    
                // 변경된 배열 적용
                setmyurlarray(newarray);   
                
            }
            // 만약 존재하지 않는 url을 삭제하려는 경우
            else{
                alert("존재하지 않는 url 입니다.");
            }
        })
        .catch(error => {
            return error;
        })

    }

    // 입력한 URL이 어떤 홈페이지의 URL인지(EX : Github, LinkedIn, Notion, ...)
    function CheckUrlType(url){

        // url 타입이 저장된 json 값의 key 목록을 가져온다.
        const url_type_keys = Object.keys(URL_TYPE_REGEX);

        for (var index=0; index<url_type_keys.length; index++) {
            
            let type_name = url_type_keys[index]

            if (url.match(new RegExp(URL_TYPE_REGEX[type_name]))){
                return `${BasicInfo.URL_TYPE_ICON_BASE_URL}/${type_name}.svg`
            }
        }

        return `${BasicInfo.URL_TYPE_ICON_BASE_URL}/default.svg`
    }

    // 회원 정보 수정 요청 함수
    function Submit(nickname, email, job){
        
        // 모든 항목에서 사용가능한 데이터를 입력했을 경우
        if (ablesubmit){

            // 회원가입 API에서 사용될 데이터
            var data = {
                "user_job": job
            }

            if (defaultnickname != nickname){
                data["user_name"] = nickname;
            }
            if (defaultemail != email){
                data["user_email"] = email;
            }
            
            // 회원가입 API 호출
            axios.put(`${process.env.REACT_APP_DJANGO_API_URL}/user/update`, data, { withCredentials: true, credentials: "include" })
            .then(res => {
                alert("회원정보 수정에 성공하였습니다!");

                if (defaultemail != email){
                    SendAuthEmail(email);
                    alert("이메일을 변경하여 임시 휴면 상태로 전환되었습니다.\n계정을 다시 활성화 하기 위해서는 변경한 이메일에 전송된 인증 메일을 확인해주세요.");
                }

                navigate('/');
                return res;
            })
            .catch(error => {
                alert("회원정보 수정에 실패하였습니다!");
                return error;
            });

        }
        else{
            alert("입력값을 확인해주세요.");
        }

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

    // 입력값이 변할때 마다 회원가입이 가능한지 확인
    useEffect(()=>{
        if (ablenickname && ableemail && job.length > 0){
            setablesubmit(true);
        }
        else{
            setablesubmit(false);
        }
    }, [ablenickname, ableemail, job])

    // 사용자의 정보 받아오기
    useEffect(()=>{

        // 로그인한 사용자의 쿠키 값에서 index 얻어오기
        const user_index = getCookieValue("index");
        
        const SetBasicInfo = {
            setnickname,
            setdefaultnickname,
            setemail,
            setdefaultemail,
            setjob,
            setprofileimage,
        }

        // 닉네임, 이메일, 직업정보, 프로필 이미지 조회
        BasicInfo.GetUserInfo(SetBasicInfo, user_index);

        // 현재 나의 URL 목록 얻어오기
        UrlInfo.MyUrlList(setmyurlarray, user_index);
        
        // 전체 기술 목록 얻어오기
        TechInfo.GetAllTechList(SetAllTechList);
        
        // 현재 나의 기술 목록 얻어오기
        TechInfo.MyTechList(SetMyTechArray, user_index);

    },[]);

    // 로그인 되었을 때
    if (islogin){
        return(
            <>
                <Header/>
                    
                    <div className="Profile-Frame">

                        <div className='Profile-View-Frame'>

                            {/* 프로필 이미지 부분 */}
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                
                                {/* 이미지 확인 부분 */}
                                <div className="Profile-image" style={{margin: '20px'}}>
                                    <img src={profileimage}></img>
                                </div>

                                {/* 이미지 업로드 버튼 부분 */}
                                <button class="Button-Md" onClick={handleClick}>
                                    이미지 업로드
                                </button>
                                <input type="file"
                                    ref={hiddenFileInput}
                                    style={{display:'none'}}
                                    accept=".png, .jpg"
                                    onChange={(e)=>{UploadProfile(e.target.files)}}
                                />
                            </div>

                            <div className='Profile-View-input'>

                                {/* 회원 정보 */}
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
                                                onChange={(e)=>{

                                                    setnickname(e.target.value);

                                                    if (e.target.value == defaultnickname){
                                                        setablenickname(true);
                                                    }
                                                    else {
                                                        CheckUserInfo.checkNickName_action(e.target.value, setablenickname)
                                                    }
                                                }} 
                                                className="Register-View-input-info nickname" 
                                                placeholder="3 ~ 20자를 입력해주세요."
                                                pattern={REGEX.Nickname_regex} 
                                                title={REGEX_MESSAGE.Nickname_message}
                                                value={nickname}
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
                                                onChange={(e)=>{
                                                    setemail(e.target.value);

                                                    if (e.target.value == defaultemail){
                                                        setableemail(true);
                                                    }
                                                    else {
                                                        CheckUserInfo.checkEmail_action(e.target.value, setableemail)
                                                    }
                                                }} 
                                                className="Register-View-input-info email" 
                                                placeholder="이메일을 입력해주세요."
                                                pattern={REGEX.Email_regex} 
                                                title={REGEX_MESSAGE.Email_message} 
                                                value={email}
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

                                        {/* 제목 */}
                                        <div className='title'>
                                            <text>기술스택</text>
                                        </div>

                                        <div className='tech'>

                                            {/* 현재 나의 기술 목록을 나타내는 리스트 */}
                                            {/* 현재는 item 클릭 시 삭제되도록 설정(테스트) */}
                                            <div className='tech-list' style={{marginBottom:'10px'}}>
                                                {
                                                    MyTechArray.map((item)=>{
                                                        return(
                                                            <div className="tech-item-box">
                                                                <div>
                                                                    <img class="sm" src={`${BasicInfo.TECH_ICON_BASE_URL}/${item.icon_url}`} style={{marginRight: '15px'}}></img>
                                                                    {item.name}
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
                                                options={techoption(AllTechList)}
                                            />
                                        </div>
                                    </div>

                                    {/* URL 제목 */}
                                    <div className="item" style={{flexDirection:"column"}}>
                                        <div className='title' style={{display: "flex", alignSelf:"start"}}>
                                            <text>URL</text>
                                        </div>
                                    </div>
                                     
                                    {/* URL 조회 & 입력*/}
                                    <div style={{marginBottom:"50px"}}>

                                        {/* 나의 url 갯수만큼 아이템을 보여준다. */}
                                        {
                                            myurlarray.map((item)=>{
                                                return(
                                                    <div className="item">
                                                        <div style={{paddingRight: '50px'}}>
                                                            <img class="md" src={CheckUrlType(item)} style={{marginRight: '15px'}}></img>
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
                                                            style={{marginRight: '20px'}}
                                                        />
                                                        <img 
                                                            class="sm"
                                                            src={"img/icon/trash_full.svg"}
                                                            onClick={()=>{DeleteUrl(item)}}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }

                                        {/* URL 입력 부분 */}
                                        <div style={{display:'flex', justifyContent: 'center'}}>
                                            
                                            {/* 입력창 */}
                                            <div style={{
                                                borderBottom: '1px solid black',
                                                width: (newurl.length * 0.65) + "em",
                                                minWidth: "40%",
                                                display:'flex',
                                                alignItems:'center'
                                            }}
                                            onKeyPress={onCheckEnter}
                                            >
                                                <input
                                                    placeholder='추가를 원하는 URL 값을 입력해주세요.'
                                                    onChange={(e)=>{
                                                        
                                                        setnewurl(e.target.value);

                                                        if(myurlarray.includes(e.target.value)){
                                                            setnewurlable(false);
                                                        }
                                                        else{
                                                            CheckUserInfo.checkUrl_action(e.target.value, setnewurlable);
                                                        }

                                                    }}
                                                    style={{
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        display: 'flex',
                                                        alignSelf: 'center'
                                                    }}
                                                    value={newurl}
                                                />
                                                <img 
                                                    className='sm' 
                                                    src={
                                                        newurlable
                                                        ? "img/icon/check_bold.svg"
                                                        : "img/icon/coolicon.svg"
                                                    }
                                                />
                                            </div>
                                            {/* </form> */}
                                            {/* url 추가 */}
                                            <img class="md" src={"img/icon/plus_circle.svg"}
                                                style={{
                                                    marginLeft: '30px'
                                                }}
                                                onClick={(e)=>{AddUrl(newurl);}}
                                            />

                                        </div>

                                    </div>
                                
                                </form>

                                {/* 수정하기 버튼 */}
                                <div
                                    style={{display:'flex', justifyContent:'flex-end', width:'100%', marginBottom:'50px'}}
                                    >
                                    <button 
                                        class="Button-Md"
                                        style={{width:'30%'}}
                                        onClick={()=>{

                                            // 회원 정보 수정 여부 확인
                                            var result = window.confirm("회원 정보를 수정하시겠습니까?");
                                            
                                            // 확인 시 회원 정보 수정 함수 실행
                                            if (result){
                                                Submit(nickname, email, job);
                                            }

                                        }}
                                    >프로필 수정하기
                                    </button>
                                </div>                                

                            </div>

                        </div>

                    </div>

                <Footer/>
            </>
        );
    }
    // 로그인 되지 않았을 때
    else{
        // 로그인창으로 이동
        navigate('/login');
        return(<></>);
    }
}

export default ProfilePage