import '../scss/base/button-style.scss'

{/* 생성버튼 */}
function CreateStudyButton() {

    return (   
        <button className="Button-Md" onClick={()=>{alert("스터디 생성 버튼 테스트")}}>
            <img src="/img/icon/plus.svg"></img>
            <text className="create-button-text">스터디 생성하기</text>
        </button>       
    );
  
}

export default CreateStudyButton;