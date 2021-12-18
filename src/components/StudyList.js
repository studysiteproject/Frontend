import { useState, useEffect } from 'react';
import '../scss/StudyList.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useSelector, useDispatch } from 'react-redux';
import { SetListAPI, AddFavoriteAPI, DeleteFavoriteAPI } from '../redux-modules/module/StudyManage';

function StudyList(props){

    const studylist = useSelector((state) => state.studyReducer.studylist);
    const dispatch = useDispatch();

    let StudyListLength = studylist.length;

    useEffect(()=>{
       dispatch(SetListAPI())
    },[StudyListLength]);

    if (StudyListLength > 0){
        return(
            <div className="StudyList">
                {
                    studylist.map((item)=>{
                        return(
                            <Item item={item}></Item>
                        )
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

    const renderTooltip = (props, value) => (
        <Tooltip {...props}>{value}</Tooltip>
    );

    return(
        <div className="StudyList-Item">
            {/* 모집 스터디 제목 */}
            <div className="StudyList-Item-title" onClick={()=>{alert(props.item.id + "번 스터디입니다.")}}>
                <text>{props.item.title}</text>
            </div>

            {/* 제목을 제외한 나머지 부분 (사용 기술 아이콘 / 인원 수 / 프로필 등) */}
            <div style={{display:'flex'}}>

                {/* 아이콘 목록 */}
                <div>
                    <div className="StudyList-Item-tech-icon">
                        {
                            props.item.tech_info.map((tech_item)=>{
                                return(
                                    <OverlayTrigger placement="top" overlay={renderTooltip(props, tech_item.tech_name)}>
                                        <img src={tech_item.img_url}></img>
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

                {/* 스터디 주최자 정보 */}
                <div className="StudyList-Item-Profile">
                    <div className="StudyList-Item-Profile-img">
                        <img src={props.item.user_info.img_url}></img>
                    </div>
                    <text className="StudyList-Item-Profile-name">{props.item.user_info.user_name}</text>
                </div>

                {/* 스터디 즐겨찾기 버튼(하트) 추가 */}
                {
                    props.item.isfavorite
                    ? <img src="/img/heart_fill.svg" onClick={()=>{
                        dispatch(DeleteFavoriteAPI(props.item.id));
                    }}></img>
                    : <img src="/img/heart_unfill.svg" onClick={()=>{
                        dispatch(AddFavoriteAPI(props.item.id));
                    }}></img>
                }
            </div>

        </div>
    )
}

export default StudyList;