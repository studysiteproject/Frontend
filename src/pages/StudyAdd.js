import '../scss/pages/StudyAdd.scss'
import "rsuite/dist/rsuite.min.css";

import Footer from "../components/base/footer";
import Header from "../components/base/header";
import { useEffect, useState } from 'react';
import options from '../data/options';
import SelectBox from '../components/selectbox';
import { BasicInfo, TechInfo } from '../data/profile';
import SearchSelectBox from '../components/searchselectbox';
import { Slider, RangeSlider } from 'rsuite';

function StudyAddPage(){

    const [category, setcategory] = useState('');
    const [place, setplace] = useState('');

    const [AllTechList, SetAllTechList] = useState([]); // 전체 기술 목록
    const [StudyTechArray, SetStudyTechArray] = useState([]); // 현재 나의 기술 목록
    const [techsearch, setTechsearch] = useState(''); // 기술 검색 값 임시 저장

    const [users, Setusers] = useState(10);

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

    // 페이지 로드 시
    useEffect(()=>{
        // 전체 기술 목록 얻어오기
        TechInfo.GetAllTechList(SetAllTechList);
    },[]);

    return(
        <>
            <Header/>
                <div className="Frame">
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
                            <div className='title-item-row'>
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
                        
                        <div className='Study-Info-users item'>
                            <div className='title-item-column'>
                                <div className='title'>모집 인원</div>
                                <div style={{display:'flex', width: '100%', height:'auto', margin:'auto'}}>
                                    <div style={{width:'80%', marginRight:'20px'}}>
                                        <Slider
                                            progress
                                            defaultValue={users}
                                            max={50}
                                            onChange={value => {
                                                Setusers(value);
                                            }}
                                        />
                                    </div>
                                    <div className='title'>{`${users}명`}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='Study-Setting'>

                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default StudyAddPage;