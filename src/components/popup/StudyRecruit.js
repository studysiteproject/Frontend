import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RecruitStudyAPI } from "../../redux-modules/module/StudyManage";

function StudyRecruit(props){

    const [description, setdescription] = useState('');
    const [ableSubmit, setableSubmit] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        if (description.length > 0){
            setableSubmit(true);
        }
        else{
            setableSubmit(false);
        }
    },[description])

    return(
        <div className="start-column-align" style={{padding:'5%'}}>

            {/* 신청글 작성 부분 */}
            <textarea
                className="Info-View-input"
                style={{minHeight:'300px', marginBottom:'30px', overflow:'auto', resize: 'none'}}
                placeholder="자신이 스터디에서 무엇을 목표로 하고 어떤 활동을 하고 싶은지 소개할 글을 적어주세요."
                onChange={(e)=>{
                    setdescription(e.target.value);
                }}
            />

            {/* 버튼 부분 */}
            <div className="row-fill-container evenly-align">
                <button 
                    className="Button-Sm"
                    onClick={()=>{
                        dispatch(RecruitStudyAPI(props.study_id, description));
                        props.setisRecruitView({"isactive": false})
                    }}
                    disabled={
                        ableSubmit
                        ?   false
                        :   true
                    }
                >
                제출하기
                </button>
                <button 
                    className="Button-Sm"
                    onClick={()=>{
                        props.setisRecruitView({"isactive": false})
                    }}
                >
                닫기
                </button>
            </div>
        </div>
    )
}

export default StudyRecruit;