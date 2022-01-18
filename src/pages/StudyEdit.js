import '../scss/pages/StudyEdit.scss'
import "rsuite/dist/rsuite.min.css";

import Footer from "../components/base/footer";
import Header from "../components/base/header";
import SearchSelectBox from '../components/searchselectbox';
import SelectBox from '../components/selectbox';

import options from '../data/options';
import { UserAuthActionList } from '../redux-modules/UserReducer';
import { useEffect, useState } from 'react';
import { BasicInfo, TechInfo } from '../data/profile';
import { Slider, RangeSlider } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { ActivePopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import IsLogin, { IsLoginAPI } from '../components/util/islogin';
import { GetStudyInfo, StudyAuth } from '../redux-modules/module/StudyManage';

function StudyEditPage(){

    // URL에 입력한 스터디 ID확인
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

    const [AllTechList, SetAllTechList] = useState([]); // 전체 기술 목록
    const [StudyTechArray, SetStudyTechArray] = useState([]); // 현재 나의 기술 목록
    const [techsearch, setTechsearch] = useState(''); // 기술 검색 값 임시 저장

    const [ableSubmit, SetableSubmit] = useState(false);    // 스터디 수정 요청 가능 여부

    // 스터디 추가를 위한 데이터 검증 & 전송
    function Submit(title, maxman, description, place, category){
        
        // 모든 항목에서 사용가능한 데이터를 입력했을 경우
        if (ableSubmit){

            const tech = [];
            StudyTechArray.map((item)=>{
                tech.push(item.name);
            })

            // 스터디 수정 API에서 사용될 데이터
            const data = {
                "title": title,
                "maxman": maxman,
                "description": description,
                "place": place,
                "category": category,
                "tech": tech
            }
            
            // 스터디 수정 API 호출
            axios.put(`${process.env.REACT_APP_SPRING_API_URL}/study/${study_id}`, data, { withCredentials: true, credentials: "include" })
            .then(res => {
                dispatch(ActivePopup("info", "스터디 수정이 완료되었습니다."));
                dispatch(UnActivePopup(2));
                setTimeout(()=>{navigate('/study/manage')}, 2000)
                return res;
            })
            .catch(error => {
                dispatch(ActivePopup("error", "스터디 수정에 실패하였습니다!"));
                dispatch(UnActivePopup(2));
                return error;
            });

        }

        else{
            dispatch(ActivePopup("error", "입력값을 확인해주세요."));
            dispatch(UnActivePopup(2));
        }

    }

    // 기술테크에 기술 추가
    function AddStudytech(id, name, category, icon_url){

        let newarray = [...StudyTechArray];
        
            // 이미 존재하는 스킬인지 확인
            let isExist = false
    
            // 만약 이미 존재하는 스킬일경우 isExist 값을 참으로 변경
            newarray.map((item)=>{
                if (item.id == id){
                    isExist = true
                }
            })
    
            // 이미 존재하는 기술일경우 추가하지 않는다.
            if (!isExist){
                newarray.push({
                    "id":id,
                    "name":name,
                    "category": category,
                    "icon_url":icon_url
                });
    
                // 변경된 배열 적용
                SetStudyTechArray(newarray);
        }    

    }

    // 기술테크에서 기술 삭제
    function DeleteStudytech(id){
        var newarray = [...StudyTechArray];
        
        // 삭제를 원하는 기술이 존재할 경우 목록에서 삭제
        newarray.map((item, i)=>{
            if (item.id == id){
                newarray.splice(i,1);
            }
        })

        // 변경된 배열 적용
        SetStudyTechArray(newarray);   
    }

    // 기술 추가에 사용되는 목록 설정
    const techoption = (AllTechList) => {
        var array = []

        AllTechList.map((item)=>{
            array.push({
                "value": item.name,
                "label": 
                    <div onClick={()=>{AddStudytech(item.id, item.name, item.category, item.icon_url)}}>
                        <img class="md" src={`${BasicInfo.TECH_ICON_BASE_URL}/${item.category}/${item.icon_url}`} style={{marginRight:'10px'}}/>
                        <text>{item.name}</text>
                    </div>
            })
        })

        return array;
    }

    // 로그인 확인 후 페이지 이동
    useEffect(()=>{
        // 로그인 확인 API 실행
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
            if (res.data['iswriter'] == true){

                // 전체 기술 목록 얻어오기
                TechInfo.GetAllTechList(SetAllTechList);

                // 스터디의 정보를 저장하는 State들의 설정 함수 모음
                const SetBasicInfo = {
                    setTitle,
                    setcategory,
                    setplace,
                    SetStudyTechArray,
                    Setmaxman,
                    setdescription
                }

                // 스터디의 기본정보 얻어오기 
                setTimeout(()=>{GetStudyInfo(SetBasicInfo, study_id)}, 1000);
                
            }
            else {
                dispatch(ActivePopup("error", "해당 스터디의 작성자가 아닙니다!"));
                dispatch(UnActivePopup(2));
                setTimeout(()=>{navigate('/')},2000);
            }

            return res;
        })
        .catch(error => {
            dispatch(ActivePopup("error", "스터디 작성자 여부를 확인할 수 없습니다!"));
            dispatch(UnActivePopup(2));
            setTimeout(()=>{navigate('/')},2000);
            return error
        })

    },[]);

    // 스터디 수정 버튼 활성화 / 비활성화
    useEffect(()=>{

        if (title.length > 0 && 
            description.length > 0 && 
            category.length > 0 && 
            place.length > 0 &&
            maxman > 0 &&
            StudyTechArray != []){
                SetableSubmit(true);
            }

        else {
            SetableSubmit(false);
        }
    },[title, description, category, place, maxman, StudyTechArray])

    // if(!islogin && typeof islogin !== 'undefined'){
    //     navigate('/login');
    //     return(<></>);      
    // }
    // else{
    return(
        <>
            <Header/>
                <div className="Frame" style={{paddingTop:'5%'}}>
                    
                    {/* 스터디의 제목 설정 */}
                    <div className='Study-Info'>
                        <div className='Study-Info-Title item-input'>
                            <input
                                className='input-box'
                                placeholder='스터디의 제목을 입력해 주세요.'
                                onChange={(e)=>{setTitle(e.target.value)}}
                                value={title}
                            />
                        </div>
                    </div>

                    {/* 스터디의 상세 내용 설정 */}
                    <div className='Study-Info'>

                        {/* Select를 사용하는 스터디 설정 */}
                        <div className='Study-Info-select item'>

                            {/* 스터디의 모집 분야 선택 */}
                            <div className='title-item-column'>
                                <div className='title'>모집 분야</div>
                                <div style={{width: '100%', maxWidth:'300px'}}>
                                    <SelectBox
                                        choice={category}
                                        setChoice={setcategory}
                                        placeholder={"모집 분야를 선택하세요."}
                                        options={options.category}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>

                            {/* 스터디의 장소 선택 */}
                            <div className='title-item-column'>
                                <div className='title'>스터디 장소</div>
                                <div style={{width: '100%', maxWidth:'300px'}}>
                                    <SelectBox
                                        choice={place}
                                        setChoice={setplace}
                                        placeholder={"스터디 장소를 선택하세요."}
                                        options={options.place}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* 스터디의 기술 스택을 설정하는 부분 */}
                        <div className='Study-Info-tech item'>
                            <div className='title-item-column'>
                                <div className='title'>기술 스택</div>
                                <div className='tech'>

                                    {/* 현재 스터디의 기술 목록을 나타내는 리스트 */}
                                    {/* 현재는 item의 X 클릭 시 삭제되도록 설정 */}
                                    <div className='tech-list'>
                                        {
                                            StudyTechArray.map((item)=>{
                                                return(
                                                    <div className="tech-item-box">
                                                        <div>
                                                            <img class="sm" src={`${BasicInfo.TECH_ICON_BASE_URL}/${item.category}/${item.icon_url}`} style={{marginRight: '15px'}}></img>
                                                            {item.name}
                                                            <img class="sm" src="/img/icon/coolicon.svg" style={{marginLeft: '15px'}}
                                                                onClick={()=>{DeleteStudytech(item.id)}}
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
                        </div>
                        
                        {/* 스터디의 최대 인원수를 설정하는 부분 */}
                        <div className='Study-Info-users item'>
                            <div className='title-item-column'>
                                <div className='title'>모집 인원</div>
                                <div style={{display:'flex', width: '100%', height:'auto', margin:'auto'}}>
                                    <div style={{width:'80%', marginRight:'30px'}}>
                                        <Slider
                                            progress
                                            defaultValue={maxman}
                                            max={50}
                                            onChange={value => {
                                                Setmaxman(value);
                                            }}
                                        />
                                    </div>
                                    <div className='title'>{`${maxman}명`}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 스터디의 내용 설정 */}
                    <div className='Study-Info'>
                        <div className='Study-Info-Content item-input'>
                            <input
                                className='input-box'
                                placeholder="스터디를 소개할 글을 적으세요. &#13;&#10; (무엇을 목표로 하고 어떤 활동을 할 것 인지.)"
                                onChange={(e)=>{setdescription(e.target.value)}}
                                style={{minHeight:'200px'}}
                                value={description}
                            />
                        </div>
                    </div>
                                            
                    {/* 스터디 수정하기 버튼 설정 */}
                    <div className='Study-Info'>
                        {
                            // 스터디 수정하기 버튼 활성화 / 비활성화
                            ableSubmit
                            ?   <button className='Button-Md' style={{width:'100%'}} onClick={()=>{Submit(title, maxman, description, place, category)}}>스터디 수정하기</button>
                            :   <button className='Button-Md disabled' style={{width:'100%'}} disabled>스터디 수정하기</button>
                        }
                    </div>

                </div>
            <Footer/>
        </>
    )
    // }

}

export default StudyEditPage;