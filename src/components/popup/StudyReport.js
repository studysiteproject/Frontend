import { useParams } from "react-router-dom";

function StudyReport(props){

    const { study_id } = useParams();

    return(
        <div>
            {`${study_id}번 스터디 신고`}
            <button 
                className="Button-Sm"
                onClick={()=>{
                    props.setisReportView({"isactive": false})
                }}
            >
            닫기
            </button>
        </div>
    )
}

export default StudyReport;