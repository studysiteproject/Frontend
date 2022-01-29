import '../scss/Comments.scss';

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { DeleteCommentAPI, GetCommentsAPI, UpdateCommentAPI, UpdateCommentVisibleAPI } from "../redux-modules/module/CommentManage";
import { getCookieValue } from "../util";
import { BasicInfo } from '../data/profile';
import { ActiveConfirmPopup, UnActivePopup } from '../redux-modules/module/InfoManage';
import { PopupConfirm } from './util/Popup';

function Comments(props){

    // 유저의 index
    const user_index = getCookieValue("index");
    
    // 댓글 수정 관련 정보
    const [isEdit, setisEdit] = useState({'isactive': false, 'comment_id': ''});
    const [EditCommentMsg, setEditCommentMsg] = useState('');

    // 대댓글 추가 관련 정보
    const [ReplyCommentAdd, setReplyCommentAdd] = useState({'isactive': false, 'parent_comment_id': ''});
    
    // 모든 댓글 정보
    const [CommentData, setCommentData] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetCommentsAPI(props.study_id, setCommentData));
    },[])

    return(
        <div className='title-item-column row-fill-container'>
            <text className='title' style={{margin:'0'}}>댓글</text>
            <div className="start-column-align row-fill-container Comment-Frame">
                {
                    // 댓글 그룹 반복
                    CommentData.map((group)=>{
                        return(
                            <>
                                {
                                    // 하나의 댓글 그룹(댓글 & 해당 댓글에 달린 답글)
                                    group.map((item)=>{
                                        return(
                                            <>
                                                {/* 일반 댓글과 답글의 배치 구분 */}
                                                <div 
                                                    className={
                                                        item.comment_class
                                                        ?   "row-fill-container end-align"
                                                        :   "row-fill-container"
                                                    }
                                                >
                                                    {/* 일반 댓글과 답글의 스타일 구분 */}
                                                    <div className={
                                                        item.comment_class
                                                        ?   "ReplyComment-item"
                                                        :   "Comment-item"
                                                    }>

                                                        {/* 댓글 작성 유저 정보, 작성시간, 아이콘 */}
                                                        <div id='User-Info' className='between-align' style={{marginBottom:'5px'}}>
                                                            
                                                            {/* 댓글을 작성한 유저 정보와 작성 시간 */}
                                                            <div className='start-align'>
                                                                {/* 프로필 이미지 */}
                                                                <div style={{width:'30px', height:'30px', marginRight:'10px'}}>
                                                                    <div className='profile-image'>
                                                                        {
                                                                            item.comment_user_info.img_url == 'default.png'
                                                                            ?   <img src={`${BasicInfo.PROFILE_DEFAULT_URL}`}/>
                                                                            :   <img src={`${BasicInfo.PROFILE_BASE_URL}/${item.comment_user_info.user_id}/${item.comment_user_info.img_url}`}/>
                                                                        }                  
                                                                    </div>
                                                                </div>

                                                                {/* 유저 이름 */}
                                                                <text 
                                                                    className='Font-Md hover-text'
                                                                    onClick={()=>{
                                                                        props.setisProfileView({"isactive": true, 'user_id': item.comment_user_info.user_id})
                                                                    }}
                                                                    style={{marginRight:'10px'}}
                                                                >
                                                                    {item.comment_user_info.user_name}
                                                                </text>

                                                                {/* 생성시간 */}
                                                                <text 
                                                                    className='Font-Sm info'
                                                                >
                                                                    {item.create_date.replace('T', ' ')}
                                                                </text>
                                                            </div>
                                                            
                                                            {/* 편집 / 삭제 / 가시여부 변경 아이콘 */}
                                                            <div>
                                                                {/* 삭제된 댓글에서는 편집 / 삭제 불가 */}
                                                                {
                                                                    item.comment_state == 'delete'

                                                                    // 편집, 삭제, 가시여부 변경 아이콘
                                                                    ? null
                                                                    :   <div class="column-fill-container center-align" style={{marginLeft:'5px'}}>
                                                                            <div>
                                                                                {
                                                                                    user_index == item.comment_user_info.user_id
                                                                                    ?   <>
                                                                                            {/* 편집 아이콘 */}
                                                                                            <img
                                                                                                className='mini'
                                                                                                src={`${BasicInfo.ICON_BASE_URL}/edit.svg`}
                                                                                                onClick={()=>{
                                                                                                    setisEdit({'isactive': true, 'comment_id': item.id});
                                                                                                    setEditCommentMsg(item.comment);
                                                                                                }}
                                                                                                style={{marginRight:'5px'}}
                                                                                            />
                                                                                            {/* 삭제 아이콘 */}
                                                                                            <img
                                                                                                className='mini'
                                                                                                src={`${BasicInfo.ICON_BASE_URL}/trash.svg`}
                                                                                                onClick={()=>{
                                                                                                    props.setok(()=>()=>{
                                                                                                        dispatch(DeleteCommentAPI(props.study_id, item.id));
                                                                                                        dispatch(UnActivePopup());
                                                                                                    });
                                                                                                    props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                                                    dispatch(ActiveConfirmPopup("info", "이 댓글을 정말 삭제하시겠습니까?"));                                                                                    
                                                                                                }}
                                                                                                style={{marginRight:'5px'}}
                                                                                            />
                                                                                        </>
                                                                                    : null
                                                                                }

                                                                                {/* 가시여부 변경 아이콘 */}
                                                                                {
                                                                                    // 스터디 생성자일 경우만 댓글 가시여부 변경 가능
                                                                                    props.iswriter

                                                                                    // 현재 이 댓글의 가시 여부에 따라 아이콘 변경
                                                                                    ?   item.comment_visible
                                                                                        ?   <img
                                                                                                className='mini'
                                                                                                src={`${BasicInfo.ICON_BASE_URL}/hidden.svg`}
                                                                                                onClick={()=>{
                                                                                                    props.setok(()=>()=>{
                                                                                                        dispatch(UpdateCommentVisibleAPI(props.study_id, item.id, false));
                                                                                                        dispatch(UnActivePopup());
                                                                                                    });
                                                                                                    props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                                                    dispatch(ActiveConfirmPopup("info", "이 댓글을 비공개하시겠습니까?"));                                                                                    
                                                                                                }}
                                                                                                style={{marginRight:'5px'}}
                                                                                            />
                                                                                        :   <img
                                                                                                className='mini'
                                                                                                src={`${BasicInfo.ICON_BASE_URL}/show.svg`}
                                                                                                onClick={()=>{
                                                                                                    props.setok(()=>()=>{
                                                                                                        dispatch(UpdateCommentVisibleAPI(props.study_id, item.id, true));
                                                                                                        dispatch(UnActivePopup());
                                                                                                    });
                                                                                                    props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                                                    dispatch(ActiveConfirmPopup("info", "이 댓글을 공개하시겠습니까?"));                                                                                    
                                                                                                }}
                                                                                                style={{marginRight:'5px'}}
                                                                                            />                                                                                        
                                                                                    : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>

                                                        </div>
                                                        
                                                        {/* 댓글 내용 */}
                                                        <div className="start-align">
                                                            {
                                                                // 댓글 수정 옵션 활성화
                                                                isEdit.isactive && isEdit.comment_id == item.id
                                                                
                                                                // 댓글 수정부분과 버튼을 보여준다
                                                                ?   <div className='row-fill-container start-column-align'>
                                                                        
                                                                        {/* 변경될 댓글 입력란 */}
                                                                        <textarea
                                                                            className='row-fill-container'
                                                                            value={EditCommentMsg}
                                                                            onChange={(e)=>{
                                                                                setEditCommentMsg(e.target.value)
                                                                            }}
                                                                            style={{minHeight:'100px', overflow:'auto', resize:'none', marginBottom:'5px'}}
                                                                        />
                                                                        
                                                                        {/* 댓글 변경 버튼*/}
                                                                        <button 
                                                                            className='Button-Sm'
                                                                            onClick={()=>{
                                                                                props.setok(()=>()=>{
                                                                                    dispatch(UpdateCommentAPI(props.study_id, item.id, EditCommentMsg));
                                                                                    dispatch(UnActivePopup());

                                                                                    // 수정 옵션 초기화
                                                                                    setisEdit({'isactive': false, 'comment_id': ''});
                                                                                    setEditCommentMsg('');
                                                                                    
                                                                                    // 댓글목록 다시 받아오기
                                                                                    setTimeout(()=>{dispatch(GetCommentsAPI(props.study_id, setCommentData))},500);
                                                                                });
                                                                                props.setno(()=>()=>{dispatch(UnActivePopup())});
                                                                                dispatch(ActiveConfirmPopup("info", "이 댓글을 변경하시겠습니까?"));                                                                                    
                                                                            }}
                                                                        >
                                                                        댓글 변경
                                                                        </button>

                                                                    </div>

                                                                // 수정 옵션을 활성화 하지 않은 경우 글만 보여준다.
                                                                // 일반적인(state -> active) 댓글이 아닌경우 글씨 스타일을 변경한다.
                                                                :   <text
                                                                        className={
                                                                            item.comment_state == 'active'
                                                                            ? ""
                                                                            : "Semi"
                                                                        }
                                                                    >
                                                                    {item.comment}
                                                                    </text>
                                                            }
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    })
                }

                {/* 댓글 추가 부분 */}
                <div className='Comment-item' style={{padding:'10px'}}>
                    <textarea
                        className='row-fill-container'
                        value={EditCommentMsg}
                        onChange={(e)=>{
                            setEditCommentMsg(e.target.value)
                        }}
                        style={{minHeight:'100px', overflow:'auto', resize:'none', marginBottom:'5px'}}
                    />

                    {/* 댓글 추가 버튼*/}
                    <button 
                        className='Button-Sm'
                        onClick={()=>{
                            props.setok(()=>()=>{
                                dispatch(UpdateCommentAPI(props.study_id, user_index, EditCommentMsg));
                                dispatch(UnActivePopup());

                                // 수정 옵션 초기화
                                setisEdit({'isactive': false, 'comment_id': ''});
                                setEditCommentMsg('');
                                
                                // 댓글목록 다시 받아오기
                                setTimeout(()=>{dispatch(GetCommentsAPI(props.study_id, setCommentData))},500);
                            });
                            props.setno(()=>()=>{dispatch(UnActivePopup())});
                            dispatch(ActiveConfirmPopup("info", "이 댓글을 추가하시겠습니까?"));                                                                                    
                        }}
                    >
                    댓글 추가
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comments