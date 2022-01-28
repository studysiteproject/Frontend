import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ReportStudyAPI } from "../../redux-modules/module/StudyManage";
import { ReportUserAPI } from "../../redux-modules/module/UserManage";

export function StudyReport(props){

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

            {/* 신고글 작성 부분 */}
            <textarea
                className="Info-View-input"
                style={{minHeight:'300px', marginBottom:'30px', overflow:'auto', resize: 'none'}}
                placeholder="해당 스터디의 신고 사유를 적어주세요."
                onChange={(e)=>{
                    setdescription(e.target.value);
                }}
            />

            {/* 버튼 부분 */}
            <div className="row-fill-container evenly-align">
                <button 
                    className="Button-Sm"
                    onClick={()=>{
                        dispatch(ReportStudyAPI(props.study_id, description));
                        props.setisReportView({"isactive": false})
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
                        props.setisReportView({"isactive": false})
                    }}
                >
                닫기
                </button>
            </div>
        </div>
    )
}

export function UserReport(props){

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

            {/* 신고글 작성 부분 */}
            <textarea
                className="Info-View-input"
                style={{minHeight:'300px', marginBottom:'30px', overflow:'auto', resize: 'none'}}
                placeholder="해당 팀원의 신고 사유를 적어주세요."
                onChange={(e)=>{
                    setdescription(e.target.value);
                }}
            />

            {/* 버튼 부분 */}
            <div className="row-fill-container evenly-align">
                <button 
                    className="Button-Sm"
                    onClick={()=>{
                        dispatch(ReportUserAPI(props.study_id, props.user_id, description));
                        props.setisReportView({"isactive": false})
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
                        props.setisReportView({"isactive": false})
                    }}
                >
                닫기
                </button>
            </div>
        </div>
    )
}