import { useParams } from "react-router-dom";

function StudyRecruit(props){

    const { study_id } = useParams();

    return(
        <div>
            {`${study_id}번 스터디 신청`}
            <button 
                className="Button-Sm"
                onClick={()=>{
                    props.setisRecruitView({"isactive": false})
                }}
            >
            닫기
            </button>
        </div>
    )
}

export default StudyRecruit;