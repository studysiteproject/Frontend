import { useNavigate } from 'react-router-dom';
import '../scss/base/button-style.scss'

{/* 생성버튼 */}
function CreateStudyButton() {

    const navigate = useNavigate();

    return (   
        <button className="Button-Md" onClick={()=>{navigate('/study/add')}}>
            <img src="/img/icon/plus.svg"></img>
            스터디 생성하기
        </button>       
    );
  
}

export default CreateStudyButton;