import { useState } from 'react';
import '../scss/StudyList.scss';

import TestCase from '../test/study'

import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function StudyList(){

    let [testcase, settestcase] = useState(TestCase)

   return(
        <div className="StudyList">
            {
                testcase.map((item)=>{
                    return(
                        <Item item={item}></Item>
                    )
                })
            }
        </div>
   );
}

{/* 각 스터디 아이템 (하나의 스터디) */}
function Item(props){

    const renderTooltip = (props, value) => (
        <Tooltip {...props}>{value}</Tooltip>
    );

    return(
        <div className="StudyList-Item">
            {/* 모집 스터디 제목 */}
            <div className="StudyList-Item-title">
                <text >{props.item.title}</text>
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
                        {/* <img src="img/profile/default.png"></img> */}
                        <img src="https://catchstudy-images.s3.ap-northeast-2.amazonaws.com/profile/default.png"></img>
                    </div>
                    <text className="StudyList-Item-Profile-name">{props.item.user_id}</text>
                </div>

                {/* 스터디 즐겨찾기 버튼(하트) 추가 */}
                {
                    props.item.isfavorite
                    ? <img src="img/heart_fill.svg"></img>
                    : <img src="img/heart_unfill.svg"></img>
                }
            </div>

        </div>
    )
}

export default StudyList;