import { useState, useEffect } from 'react';
import '../scss/base/font.scss'
import '../scss/StudyList.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useSelector, useDispatch } from 'react-redux';
import { GetStudyListAPI, AddFavoriteAPI, DeleteFavoriteAPI, DeleteStudyAPI, ExitStudyAPI } from '../redux-modules/module/StudyManage';
import { REGEX } from '../data/regex';
import { BasicInfo } from '../data/profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Category from './category';
import { PopupConfirm } from './util/Popup';
import { ActiveConfirmPopup, UnActivePopup } from '../redux-modules/module/InfoManage';

function StudyList(props){

    if (props.studylistlenth > 0){
        return(
            <div className="StudyList">
                {
                    props.studylist.map((item)=>{

                        // 유효한 검색어가 존재하는 경우
                        if (!"[\[\]?*+|{}\\()@.nr]".includes(props.MainSearch)){
                            if(item.title.match(new RegExp(props.MainSearch,'i')) != null){
                                return (
                                    <Item 
                                        item={item}
                                        option={props.option}
                                    />
                                )
                            }
                        }

                        // 검색어를 입력하지 않은 경우
                        else {
                            return(
                                item.title.includes(props.MainSearch)
                                ? <Item 
                                    item={item}
                                    option={props.option}
                                />
                                : null
                                
                            )
                        }
                    })
                }
            </div>
        );
    }
    else{
        return(<></>);
    }
}

{/* 각 스터디 아이템 (하나의 스터디) */}
function Item(props){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ok, setok] = useState(()=>()=>{})
    const [no, setno] = useState(()=>()=>{})

    const renderTooltip = (props, value) => (
        <Tooltip {...props}>{value}</Tooltip>
    );

    return(
        <>
            <div className="StudyList-Item">

                {/* 모집 스터디 제목 */}
                <div className="StudyList-Item-title" onClick={()=>{alert(props.item.id + "번 스터디입니다.")}}>
                    <text className='Font-Md'>{props.item.title}</text>
                </div>

                {/* 제목을 제외한 나머지 부분 (사용 기술 아이콘 / 인원 수 / 프로필 등) */}
                <div style={{display:'flex', alignItems:'center'}}>

                    {/* 기술 스택 아이콘 목록 */}
                    <div>
                        <div className="StudyList-Item-tech-icon">
                            {
                                props.item.tech_info.map((tech_item)=>{
                                    return(
                                        <OverlayTrigger placement="top" overlay={renderTooltip(props, tech_item.name)}>
                                            <img src={`${BasicInfo.TECH_ICON_BASE_URL}/${tech_item.category}/${tech_item.icon_url}`}></img>
                                        </OverlayTrigger>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* 스터디 인원 정보 */}
                    <div className="StudyList-Item-UserState">
                        <text>{props.item.nowman} / {props.item.maxman}</text>
                    </div>

                    {/* 스터디 주최자 옵션 활성화 시 스터디 주최자 정보 표시 */}
                    {
                        props.option['leader']
                        ? <div className="StudyList-Item-Profile">
                            <div className="StudyList-Item-Profile-img">
                                {
                                    props.item.user_info.img_url == "default.png"
                                    ?   <img src={`${BasicInfo.PROFILE_BASE_URL}/${props.item.user_info.img_url}`}/>
                                    :   <img src={`${BasicInfo.PROFILE_BASE_URL}/${props.item.user_info.id}/${props.item.user_info.img_url}`}/>
                                }
                            </div>
                            <text className="StudyList-Item-Profile-name">{props.item.user_info.user_name}</text>
                        </div>
                        : null
                    }
                    
                    {/* 팀원(유저)확인 옵션 활성화 시 팀원(유저) 버튼 추가 */}
                    {
                        props.option['users']
                        ? <img 
                            className='icon'
                            src={`${BasicInfo.ICON_BASE_URL}/users.svg`}
                            onClick={()=>{navigate(`/study/${props.item.id}/users`)}}
                        />
                        : null
                    }

                    {/* 수정 옵션 활성화 시 수정 버튼 추가 */}
                    {
                        props.option['edit']
                        ? <img
                            className='icon'
                            src={`${BasicInfo.ICON_BASE_URL}/edit.svg`}
                            onClick={()=>{navigate(`/study/edit/${props.item.id}`)}}
                        />
                        : null
                    }

                    {/* 삭제 옵션 옵션 활성화 시 삭제 버튼 추가 */}
                    {
                        props.option['delete']
                        ? <img
                            className='icon'
                            src={`${BasicInfo.ICON_BASE_URL}/trash.svg`}
                            onClick={()=>{
                                setok(()=>()=>{dispatch(DeleteStudyAPI(props.item.id))});
                                setno(()=>()=>{dispatch(UnActivePopup())});
                                dispatch(ActiveConfirmPopup("info", "이 스터디를 정말 삭제하시겠습니까?"));
                            }}
                        />
                        : null
                    }

                    {/* 탈퇴 옵션 옵션 활성화 시 삭제 버튼 추가 */}
                    {
                        props.option['exit']
                        ? <img
                            className='icon'
                            src={`${BasicInfo.ICON_BASE_URL}/exit.svg`}
                            onClick={()=>{
                                setok(()=>()=>{dispatch(ExitStudyAPI(props.item.id))});
                                setno(()=>()=>{dispatch(UnActivePopup())});
                                dispatch(ActiveConfirmPopup("info", "이 스터디를 정말 탈퇴하시겠습니까?"));
                            }}
                        />
                        : null
                    }

                    {/* 즐겨찾기 옵션 활성화 시 스터디 즐겨찾기 버튼(하트) 추가 */}
                    {
                        props.option['favorite']
                        ? props.item.isfavorite
                            ? <img
                                className='icon' 
                                src={`${BasicInfo.ICON_BASE_URL}/heart_fill.svg`} 
                                onClick={()=>{
                                console.log(props)
                                dispatch(DeleteFavoriteAPI(props.item.id));
                            }}
                            />
                            : <img
                                className='icon'
                                src={`${BasicInfo.ICON_BASE_URL}/heart_unfill.svg`} 
                                onClick={()=>{
                                dispatch(AddFavoriteAPI(props.item.id));
                            }}
                            />
                        : null
                    }
                </div>

            </div>
            <PopupConfirm ok={ok} no={no}/>
        </>
    )
}

export default StudyList;