import '../../scss/popup/UserInStudy.scss';
import { ActiveConfirmPopup, ActivePopup, UnActivePopup } from "../../redux-modules/module/InfoManage";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BasicInfo } from '../../data/profile';
import { DeleteUserAPI, EditUserPermissionAPI } from '../../redux-modules/module/StudyManage';
import { useEffect, useState } from 'react';

function UserInStudy(props){
    
    const dispatch = useDispatch();

    const [UsersInStudy, setUsersInStudy] = useState([]);

    function SetUserInStudy(study_id){
        axios.get(`${process.env.REACT_APP_SPRING_API_URL}/study/member/${study_id}`, { withCredentials: true, credentials: "include" })
        .then(res => {
            setUsersInStudy(res.data);
            return res
        })
        .catch(error => {
            dispatch(ActivePopup("error", "해당 스터디의 팀원 & 유저 정보를 얻어오는데 실패하였습니다."));
            dispatch(UnActivePopup(2));
            props.setisUsersView({"isactive": false, "study_id": ''})
            return error;
        })
    }

    useEffect(()=>{
        SetUserInStudy(props.study_id);
    }, [])

    return (
        <div className="users-info-frame">

            {/* 스터디에 참여중인 유저들의 정보를 표시 */}
            <div className='title-item-column'>
                <div className='title'>참여중</div>
                <div className='row-fill-container' style={{maxHeight:'250px', overflow:'auto'}}>
                    {
                        UsersInStudy.map((item)=>{
                            if(item.permission === true){
                                return(
                                    <div className='users-info-item start-align row-fill-container'>

                                        {/* 프로필 이미지 */}
                                        <div style={{width:'50px', height:'50px'}}>
                                            <div className='profile-image'>
                                                <img src={`${BasicInfo.PROFILE_BASE_URL}/${item.user_info.id}/${item.user_info.img_url}`}/>
                                            </div>
                                        </div>

                                        {/* 이름 + 아이콘 */}
                                        <div className='between-align row-fill-container' style={{marginLeft:'20px'}}>
                                            
                                            {/* 사용자 이름 */}
                                            <text 
                                                className='Font-Md Name'
                                                onClick={()=>{props.setisResumeView({"isactive": true, "study_id": props.study_id, 'user_id':item.user_info.id})}}
                                            >{item.user_info.user_name}</text>

                                            {/* 추방 아이콘 부분 */}
                                            {
                                                !props.onlyview
                                                ?   <div>
                                                        <img 
                                                            className='md'
                                                            src={`${BasicInfo.ICON_BASE_URL}/user_minus.svg`}
                                                            style={{marginRight:'10px'}}
                                                            onClick={()=>{
                                                                props.setok(()=>()=>{
                                                                    dispatch(EditUserPermissionAPI(props.study_id, item.user_info.id));
                                                                    dispatch(UnActivePopup());
                                                                    setTimeout(()=>{SetUserInStudy(props.study_id)}, 500);
                                                                });
                                                                props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                dispatch(ActiveConfirmPopup("info", "해당 유저를 신청자 목록으로 이동하시겠습니까?"));
                                                            }}
                                                        />
                                                        <img 
                                                            className='md'
                                                            src={`${BasicInfo.ICON_BASE_URL}/user_close.svg`}
                                                            onClick={()=>{
                                                                props.setok(()=>()=>{
                                                                    dispatch(DeleteUserAPI(props.study_id, item.user_info.id));
                                                                    dispatch(UnActivePopup());
                                                                    setTimeout(()=>{SetUserInStudy(props.study_id)}, 500);
                                                                });
                                                                props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                dispatch(ActiveConfirmPopup("info", "해당 유저를 추방하시겠습니까?"));
                                                            }}
                                                        />
                                                    </div>
                                                :   null
                                            }

                                        </div>

                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <hr/>
            
            {/* 스터디에 신청한 유저들의 정보를 표시 */}
            <div className='title-item-column' style={{maxHeight:'250px', overflow:'auto'}}>
                <div className='title'>참여대기</div>
                <div className='row-fill-container' style={{maxHeight:'250px', overflow:'auto'}}>
                    {
                        UsersInStudy.map((item)=>{
                            if(item.permission === false){
                                return(
                                    <div className='users-info-item start-align row-fill-container'>
                                        
                                        {/* 프로필 이미지 */}
                                        <div style={{width:'50px', height:'50px'}}>
                                            <div className='profile-image'>
                                                <img src={`${BasicInfo.PROFILE_BASE_URL}/${item.user_info.id}/${item.user_info.img_url}`}/>
                                            </div>
                                        </div>

                                        {/* 이름 + 아이콘 */}
                                        <div className='between-align row-fill-container' style={{marginLeft:'20px'}}>

                                            {/* 유저 이름 */}
                                            <text 
                                                className='Font-Md Name'
                                                onClick={()=>{props.setisResumeView({"isactive": true, "study_id": props.study_id, 'user_id':item.user_info.id})}}
                                            >{item.user_info.user_name}</text>
                                            
                                            {/* 승인 / 거부 아이콘 부분 */}
                                            {
                                                !props.onlyview
                                                ?   <div>
                                                        <img 
                                                            className='md' 
                                                            src={`${BasicInfo.ICON_BASE_URL}/user_plus.svg`} 
                                                            style={{marginRight:'10px'}}
                                                            onClick={()=>{
                                                                props.setok(()=>()=>{
                                                                    dispatch(EditUserPermissionAPI(props.study_id, item.user_info.id));
                                                                    dispatch(UnActivePopup());
                                                                    setTimeout(()=>{SetUserInStudy(props.study_id)}, 500);
                                                                });
                                                                props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                dispatch(ActiveConfirmPopup("info", "해당 유저의 참여를 승인하시겠습니까?"));
                                                            }}
                                                        />
                                                        <img 
                                                            className='md' 
                                                            src={`${BasicInfo.ICON_BASE_URL}/off_outline_close.svg`}
                                                            onClick={()=>{
                                                                props.setok(()=>()=>{
                                                                    dispatch(DeleteUserAPI(props.study_id, item.user_info.id));
                                                                    dispatch(UnActivePopup());
                                                                    setTimeout(()=>{SetUserInStudy(props.study_id)}, 500);
                                                                });
                                                                props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                dispatch(ActiveConfirmPopup("info", "해당 유저의 참여를 거부하시겠습니까?"));
                                                            }}
                                                        />
                                                    </div>
                                                :   null
                                            }

                                        </div>

                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <hr/>
            
            {/* 닫기 버튼 */}
            <div className='center-align' style={{width:'100%'}}>
                <button className='Button-Md' onClick={()=>{props.setisUsersView({"isactive": false, "study_id": ''})}}>닫기</button>
            </div>

        </div>
    )

}

export default UserInStudy;