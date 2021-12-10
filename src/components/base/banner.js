import '../../scss/base/banner.scss';

function Banner(){
    return(
        <div className="Banner">

            {/* 배너에 들어가는 텍스트 */}
            <ul className="Banner-Text">
                <li className="Banner-Text-title">내가 원하는 주제의 스터디는 없을까?</li>
                <li className="Banner-Text-caption">나와 같은 목표를 가진 사람들과 함께 스터디를 시작해보세요!</li>
            </ul>

            {/* 사진이 큰편이어서 배너 높이의 80%로 설정 */}
            <img style={{height:'80%'}} src="/img/study_student.png"></img>

        </div>
    );
}

export default Banner;